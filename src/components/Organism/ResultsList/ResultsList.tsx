// import Image from "next/image";
import { InterviewDetails, QuizResponse } from "@/pages/topic-process/index";
import style from "./ResultsList.module.scss";
import ResultCard from "@/components/Atoms/ResultCard/ResultCard";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import { useEffect, useState } from "react";
import Image from "next/image";

// interface testOverview {
// 	evaluation: EvaluationResult;
// 	interviewDetails: InterviewDetails;
// }

export interface EvaluationResult {
	globalEvaluation: GlobalEvaluation; // Valutazione globale (opzionale)
	evaluatedResponses: EvaluatedResponse[]; // Valutazioni per singola risposta
}

export interface EvaluatedResponse {
	q: string; // Domanda valutata
	a: string; // Risposta fornita dall'utente
	correctAnswer: string; // Risposta corretta
	answerStatus: "correct" | "average" | "incorrect"; // Stato della risposta
	answerFeedback: string; // Commento sulla valutazione
}

interface GlobalEvaluation {
	outOf: number; // Totale delle risposte
	points: number; // Punteggio ottenuto
	feedback: string; // Commento globale sulla prestazione
}

interface ResultsListProps {
	quizResponses: QuizResponse[];
	interviewDetails: InterviewDetails;
}

const ResultsList = (props: ResultsListProps) => {
	const { quizResponses, interviewDetails } = props;

	const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const prompt = `Valuta le seguenti risposte fornite durante un colloquio tecnico per una posizione di ${interviewDetails.topic}. Per ogni risposta, fornisci:
1. Uno status: correct | average | incorrect.
2. Una valutazione con breve spiegazione.
3. La risposta corretta.

Alla fine, fornisci una sintetica valutazione globale con un punteggio finale su 100 e una breve frase che riassuma le prestazioni generali del candidato (ad esempio: "Hai superato il test", "Hai dimostrato buone competenze", "Devi migliorare").`;

	const evaluateAnswers = async () => {
		setLoading(true);
		setError(null);

		const maxRetries = 5; // Numero massimo di tentativi
		let attempt = 0;
		let success = false;

		while (attempt < maxRetries && !success) {
			try {
				const payload = { prompt, quizResponses: quizResponses };
				console.log("Payload inviato:", payload); // Log del payload inviato

				const quizResponsesEvaluation = await fetch("/api/evaluate-answer-session", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				});

				if (quizResponsesEvaluation.status === 429) {
					throw new Error("Too Many Requests - Rate limit exceeded");
				}

				if (!quizResponsesEvaluation.ok) {
					throw new Error("Errore nella richiesta di valutazione.");
				}

				const evaluationResult: EvaluationResult = await quizResponsesEvaluation.json();
				console.log("Risultato della valutazione:", evaluationResult); // Log del risultato della valutazione
				setEvaluationResult(evaluationResult);
				success = true;
			} catch (e) {
				console.error("Errore durante la valutazione:", e);
				attempt++;
				if (attempt < maxRetries) {
					const delay = Math.pow(2, attempt) * 1000; // Escalazione esponenziale
					await new Promise((resolve) => setTimeout(resolve, delay));
				} else {
					setError(e instanceof Error ? e.message : "Errore sconosciuto durante la valutazione.");
				}
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		evaluateAnswers();
	}, []);

	return (
		<main className={style.main}>
			{error && <p className='error-message'>{error}</p>}
			{loading && <p className='loading-message'>Caricamento in corso...</p>}

			{interviewDetails && (
				<>
					<header className={style.header}>
						<h2 className={style.sectionTitle}>{interviewDetails.topic}</h2>
					</header>

					<div className={style.avatarContainer}>
						<div className={style.avatarBox}>
							<Image src={interviewDetails.interviewer.avatarSrc} alt='Interviewer Avatar' width={160} height={160} priority />
						</div>
					</div>
				</>
			)}
			{evaluationResult && (
				<>
					<div className={style.feedbackSection}>
						<h3>
							{evaluationResult.globalEvaluation.points}/{evaluationResult.globalEvaluation.outOf}
						</h3>
						<p>{evaluationResult.globalEvaluation.feedback}</p>
					</div>
					<ul className={style.resultsList}>
						{evaluationResult.evaluatedResponses.map((response, index) => {
							return (
								<li key={index}>
									<ResultCard response={response} index={index} />
								</li>
							);
						})}
					</ul>
				</>
			)}
			<CtaButton label='Torna alla home' className='ctaC' />
		</main>
	);
};

export default ResultsList;
