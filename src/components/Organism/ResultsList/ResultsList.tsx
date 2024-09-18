import { useAuth } from "@/context/AuthContext";
import { saveInterviewSession } from "@/utils/saveInterviewSession";
import { useEffect, useState } from "react";
import { InterviewDetails, QuizResponse } from "@/pages/topic-process/index";
import style from "./ResultsList.module.scss";
import ResultCard from "@/components/Atoms/ResultCard/ResultCard";
import Image from "next/image";
import Link from "next/link";

export interface EvaluationResult {
  globalEvaluation: GlobalEvaluation;
  evaluatedResponses: EvaluatedResponse[];
}

export interface EvaluatedResponse {
  q: string;
  a: string;
  correctAnswer: string;
  answerStatus: "correct" | "average" | "incorrect";
  answerFeedback: string;
}

interface GlobalEvaluation {
  outOf: number;
  points: number;
  feedback: string;
}

interface ResultsListProps {
  quizResponses: QuizResponse[];
  interviewDetails: InterviewDetails;
}

const ResultsList = (props: ResultsListProps) => {
  const { quizResponses, interviewDetails } = props;
  const { user } = useAuth(); // Otteniamo l'utente autenticato dal contesto

  const [evaluationResult, setEvaluationResult] =
    useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prompt = `Immagina di essere l'esaminatore ${interviewDetails.interviewer.name}. ${interviewDetails.interviewer.longBio}.
  Valuta le seguenti risposte fornite durante un colloquio tecnico per una posizione di ${interviewDetails.topic} di livello ${interviewDetails.level}. Per ogni risposta, fornisci:
1. Uno status: correct | average | incorrect.
2. Una valutazione con breve spiegazione.
3. La risposta corretta.

Alla fine, fornisci una sintetica valutazione globale con un punteggio finale su 100 e una breve frase che riassuma le prestazioni generali del candidato (ad esempio: "Hai superato il test", "Hai dimostrato buone competenze", "Devi migliorare").`;

  const evaluateAnswers = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = { prompt, quizResponses };
      console.log("Payload inviato:", payload);

      const quizResponsesEvaluation = await fetch(
        "/api/evaluate-answer-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (quizResponsesEvaluation.status === 429) {
        throw new Error("Too Many Requests - Rate limit exceeded");
      }

      if (!quizResponsesEvaluation.ok) {
        throw new Error("Errore nella richiesta di valutazione.");
      }

      const evaluationResult: EvaluationResult =
        await quizResponsesEvaluation.json();
      console.log("Risultato della valutazione:", evaluationResult);
      setEvaluationResult(evaluationResult);
      if (user) {
        await saveInterviewSession(
          user.uid,
          interviewDetails,
          evaluationResult
        );
        console.log("Sessione salvata con successo!");
      }
    } catch (e) {
      console.error("Errore durante la valutazione:", e);
    } finally {
      setLoading(false);
      console.log("Fine evaluateAnswers");
    }
  };

  useEffect(() => {
    evaluateAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={style.main}>
      {/* <button onClick={evaluateAnswers}>risultati</button> */}
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Caricamento in corso...</p>}

      {interviewDetails && (
        <>
          <header className={style.header}>
            <h2 className={style.sectionTitle}>{interviewDetails.topic}</h2>
          </header>

          <div className={style.avatarContainer}>
            <div className={style.avatarBox}>
              <Image
                src={interviewDetails.interviewer.avatarSrc}
                alt="Interviewer Avatar"
                width={160}
                height={160}
                priority
              />
            </div>
          </div>
        </>
      )}
      {evaluationResult && (
        <>
          <div className={style.feedbackSection}>
            <h3>
              {evaluationResult.globalEvaluation.points}/
              {evaluationResult.globalEvaluation.outOf}
            </h3>
            <p>{evaluationResult.globalEvaluation.feedback}</p>
          </div>
          <ul className={style.resultsList}>
            {evaluationResult.evaluatedResponses.map((response, index) => (
              <li key={index}>
                <ResultCard response={response} index={index} />
              </li>
            ))}
          </ul>
        </>
      )}
      <Link href={"/landing-page"} className={`${style.linkBtn}`}>
        Torna alla home
      </Link>
    </main>
  );
};

export default ResultsList;
