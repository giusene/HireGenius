import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

interface QuizResponse {
	q: string;
	a: string;
}

interface BodyI {
	prompt: string;
	quizResponses: QuizResponse[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const { prompt, quizResponses } = req.body as BodyI;

			// Log the received request data
			console.log("Received data:", { prompt, quizResponses });

			if (!quizResponses || !Array.isArray(quizResponses) || !prompt) {
				return res.status(400).json("Invalid request data.");
			}

			if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
				const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);

				const model = genAI.getGenerativeModel({
					model: "gemini-1.5-pro",
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
											q: { type: SchemaType.STRING }, // Domanda
											a: { type: SchemaType.STRING }, // Risposta del candidato
											correctAnswer: { type: SchemaType.STRING }, // Risposta corretta generata dall'IA
											answerStatus: {
												type: SchemaType.STRING,
												enum: ["correct", "incorrect", "average"],
											}, // Stato della valutazione
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
				console.log("Formatted prompt:", formattedPrompt); // Log the formatted prompt

				const quizResponsesEvaluation = await model.generateContent(formattedPrompt);

				// Log the result from the model
				console.log("Model result:", quizResponsesEvaluation.response.text());

				// Parse and return the result
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
