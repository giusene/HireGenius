import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Prompt = () => {
	const [error, setError] = useState(false);
	const [data, setData] = useState([]);
	const { user } = useAuth();

	const handleGenerate = async () => {
		setError(false);
		// const prompt = `Ponimi 5 domande tecniche come se mi stessi candidando per la posizione di Junior Front End Developer.`;

		try {
			const response = await fetch("/api/generate-question", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt: "Ponimi 5 domande tecniche come se mi stessi candidando per la posizione di Junior Front End Developer." }),
			});
			const data = await response.json();
			console.log("Story generated successfully", JSON.parse(data));
		} catch (e) {
			console.error("Error generating story", e);
			setError(true);
		}
	};

	return (
		<>
			<div>
				<button onClick={handleGenerate}>prompt</button>
			</div>
		</>
	);
};

export default Prompt;
