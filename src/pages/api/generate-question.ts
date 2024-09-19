import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const { prompt } = req.body as { prompt: string };

			if (!prompt) {
				return res.status(400).json("Missing body.");
			}

			if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
				const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);

				const model = genAI.getGenerativeModel({
					model: "gemini-1.5-pro",
					generationConfig: {
						responseMimeType: "application/json",
						responseSchema: {
							type: SchemaType.ARRAY,
							items: {
								type: SchemaType.OBJECT,
								properties: {
									questionText: {
										type: SchemaType.STRING,
									},
								},
							},
						},
					},
				});

				const result = await model.generateContent(prompt);
				res.status(200).json(result.response.text());
			} else {
				res.status(400).json("API KEY missing.");
			}
		} catch (e) {
			res.status(400).json("Error generating questions.");
		}
	} else {
		res.status(405).json("Method not allowed. Only POST requests are allowed.");
	}
}
