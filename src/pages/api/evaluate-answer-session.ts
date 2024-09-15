import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

interface Answer {
  q: string;
  a: string;
}

interface BodyI {
  prompt: string;
  answers: Answer[];
}

interface EvaluationResult {
  q: string;
  a: string;
  correctAnswer: string;
  status: "correct" | "average" | "incorrect";
  evaluation: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { prompt, answers } = req.body as BodyI;

      // Log the received request data
      console.log("Received data:", { prompt, answers });

      if (!answers || !Array.isArray(answers) || !prompt) {
        return res.status(400).json("Invalid request data.");
      }

      if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
        const genAI = new GoogleGenerativeAI(
          process.env.NEXT_PUBLIC_GEMINI_KEY
        );

        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro",
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: SchemaType.OBJECT,
              properties: {
                answers: {
                  type: SchemaType.ARRAY,
                  items: {
                    type: SchemaType.OBJECT,
                    properties: {
                      q: { type: SchemaType.STRING }, // Domanda
                      a: { type: SchemaType.STRING }, // Risposta del candidato
                      correctAnswer: { type: SchemaType.STRING }, // Risposta corretta generata dall'IA
                      status: {
                        type: SchemaType.STRING,
                        enum: ["correct", "incorrect", "average"],
                      }, // Stato della valutazione
                      evaluation: { type: SchemaType.STRING },
                    },
                    required: [
                      "q",
                      "a",
                      "correctAnswer",
                      "status",
                      "evaluation",
                    ],
                  },
                },
                globalEvaluation: {
                  type: SchemaType.OBJECT,
                  properties: {
                    result: { type: SchemaType.STRING },
                    points: { type: SchemaType.INTEGER },
                    outOf: { type: SchemaType.INTEGER },
                  },
                  required: ["result", "points", "outOf"],
                },
              },
              required: ["answers", "globalEvaluation"],
            },
          },
        });

        const formattedPrompt = `${prompt} ${JSON.stringify(answers)}`;
        console.log("Formatted prompt:", formattedPrompt); // Log the formatted prompt

        const result = await model.generateContent(formattedPrompt);

        // Log the result from the model
        console.log("Model result:", result.response.text());

        // Parse and return the result
        try {
          const response = JSON.parse(result.response.text());
          res.status(200).json(response);
        } catch (e) {
          console.error("Error parsing model response:", e);
          res.status(500).json("Error parsing model response.");
        }
      } else {
        res.status(400).json("API KEY missing.");
      }
    } catch (e) {
      console.error("Error evaluating answers:", e);
      res.status(500).json("Error evaluating answers.");
    }
  } else {
    res.status(405).json("Method not allowed. Only POST requests are allowed.");
  }
}
