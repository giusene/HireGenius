// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI, GenerateContentCandidate, SchemaType } from "@google/generative-ai";

interface BodyI {
	prompt: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const { prompt } = req.body as BodyI;

			if (!prompt) {
				return res.status(400).json("Missing body.");
			}

			if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
				const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);

				// Using `responseMimeType` with `responseSchema` requires a Gemini 1.5 Pro model
				const model = genAI.getGenerativeModel({
					model: "gemini-1.5-pro",
					// Set the `responseMimeType` to output JSON
					// Pass the schema object to the `responseSchema` field
					generationConfig: {
						responseMimeType: "application/json",
						responseSchema: {
							type: SchemaType.ARRAY,
							items: {
								type: SchemaType.OBJECT,
								properties: {
									question: {
										type: SchemaType.STRING,
									},
									id: {
										type: SchemaType.NUMBER,
									},
								},
							},
						},
					},
				});

				const result = await model.generateContent(prompt);

				res.status(200).json(result.response.text());

				// console.log(result.response.text());

				// const output = (result.response.candidates as GenerateContentCandidate[])[0].content.parts[0].text;

				// if (result) {
				// 	res.status(200).json(result.response.text());
				// }
			} else {
				res.status(400).json("API KEY missing.");
			}
		} catch (e) {
			res.status(400).json("Error generating story.");
		}
	} else {
		res.status(405).json("Method not allowed. Only POST requests are allowed.");
	}
}
