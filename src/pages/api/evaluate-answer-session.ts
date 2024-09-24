import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { QuizResponse } from "@/interfaces/interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Handler chiamato", req.body); // Log richieste

  if (req.method === "POST") {
    try {
      const { prompt, quizResponses } = req.body as { prompt: string; quizResponses: QuizResponse[] };

      if (!quizResponses || !Array.isArray(quizResponses) || !prompt) {
        return res.status(400).json("Invalid request data.");
      }

      if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);

        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: SchemaType.OBJECT,
              properties: {
                evaluatedResponses: {
                  type: SchemaType.ARRAY,
                  items: {
                    type: SchemaType.OBJECT,
                    properties: {
                      q: { type: SchemaType.STRING },
                      a: { type: SchemaType.STRING },
                      correctAnswer: { type: SchemaType.STRING },
                      answerStatus: {
                        type: SchemaType.STRING,
                        enum: ["correct", "incorrect", "average"],
                      },
                      answerFeedback: { type: SchemaType.STRING },
                    },
                    required: ["q", "a", "correctAnswer", "answerStatus", "answerFeedback"],
                  },
                },
                globalEvaluation: {
                  type: SchemaType.OBJECT,
                  properties: {
                    feedback: { type: SchemaType.STRING },
                    points: { type: SchemaType.INTEGER },
                    outOf: { type: SchemaType.INTEGER },
                  },
                  required: ["feedback", "points", "outOf"],
                },
              },
              required: ["evaluatedResponses", "globalEvaluation"],
            },
          },
        });

        const formattedPrompt = `${prompt} ${JSON.stringify(quizResponses)}`;
        console.log("Formatted prompt:", formattedPrompt);

        const quizResponsesEvaluation = await model.generateContent(formattedPrompt);
        console.log("Model result:", quizResponsesEvaluation.response.text());

        try {
          const evaluation = JSON.parse(quizResponsesEvaluation.response.text());
          res.status(200).json(evaluation);
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
