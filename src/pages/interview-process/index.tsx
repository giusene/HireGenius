//da piazzare in pages/topic-process.tsx
import { useAuth } from "@/context/AuthContext";
import { saveInterviewSession } from "@/utils/saveInterviewSession";
import ResultsListError from "@/components/Organism/ResultsListError/ResultsListError";
import withAuth from "@/middleware/withAuth";
import React, { useEffect, useState } from "react";
import ChooseInterviewer from "@/components/Organism/ChooseInterviewer/ChooseInterviewer";
import QuestionCard from "@/components/Organism/QuestionCard/QuestionCard";
import ResultsList from "@/components/Organism/ResultsList/ResultsList";
import Loading from "@/components/Atoms/Loading/Loading";
import { EvaluationResult, GeneratedQuestion, InterviewDetails, Interviewer, InterviewOptions, QuizResponse } from "@/interfaces/interfaces";
import InterviewRequirements from "@/components/Organism/InterviewRequirements/InterviewRequirements";
import NewInterview from "@/components/Organism/NewInterview/NewInterview";
import Link from "next/link";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import style from "./interview-process.module.scss";

type Step = "newInterview" | "interviewRequirements" | "chooseInterviewer" | "questionCard" | "resultsList";

const InterviewProcess = () => {
  const { user } = useAuth(); // Otteniamo l'utente autenticato dal contesto
  const [interviewOptions, setInterviewOptions] = useState<InterviewOptions | null>(null);
  const [interviewRequirements, setInterviewRequirements] = useState("");
  const [interviewDetails, setInterviewDetails] = useState<InterviewDetails | null>(null);
  const [step, setStep] = useState<Step>("newInterview");
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [quizResponses, setQuizResponses] = useState<QuizResponse[] | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInterviewOptionsSubmit = (interviewOptions: InterviewOptions) => {
    setIsLoading(true);
    setInterviewOptions(interviewOptions);
    setStep("interviewRequirements");
    setIsLoading(false);
  };

  const handleInterviewRequirementsSubmit = (interviewRequirements: string) => {
    setIsLoading(true);
    setInterviewRequirements(interviewRequirements);
    setStep("chooseInterviewer");
    setIsLoading(false);
  };

  const handleInterviewerSelect = async (selectedInterviewer: Interviewer) => {
    setIsLoading(true);

    if (!interviewOptions) {
      return;
    }

    const newInterviewDetails = {
      ...interviewOptions,
      interviewRequirements,
      interviewer: selectedInterviewer,
    };
    setInterviewDetails(newInterviewDetails); // Imposta lo stato dell'intervista

    const prompt = `
		  Immagina di essere l'esaminatore ${newInterviewDetails.interviewer.name}. ${newInterviewDetails.interviewer.longBio}.
		  Devi condurre un colloquio tecnico ${newInterviewDetails.level}. I requisiti del colloquio sono i seguenti: ${newInterviewDetails.interviewRequirements}.
		  Ponimi ${newInterviewDetails.numQuestions} domande tecniche sul tema "${newInterviewDetails.topic}", di difficoltà crescente.
		`;

    // Debug del prompt
    console.log("Prompt sent to API:", prompt);
    try {
      const response = await fetch("/api/generate-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Errore nella richiesta al server.");
      }

      const result = await response.json();
      const parsedData = JSON.parse(result);
      setGeneratedQuestions(parsedData);

      setStep("questionCard");
      setIsLoading(false);

      console.log("Questions generated successfully", parsedData);
    } catch (e) {
      setIsLoading(false);

      console.error("Error generating questions", e);
    }
  };

  const evaluateAnswers = async () => {
    setIsLoading(true);
    setError(null);

    if (interviewDetails && quizResponses) {
      const prompt = `Immagina di essere l'esaminatore ${interviewDetails.interviewer.name}. ${interviewDetails.interviewer.longBio}.
			Valuta le seguenti risposte fornite durante un colloquio tecnico per una posizione di ${interviewDetails.topic} di livello ${interviewDetails.level}. Per ogni risposta, fornisci:
			1. Uno status: correct | average | incorrect.
			2. Una valutazione con breve spiegazione.
			3. La risposta corretta estremamente sintetica.
			Alla fine, fornisci una sintetica valutazione globale con un punteggio finale su 100 e una breve frase che riassuma le prestazioni generali del candidato (ad esempio: "Hai superato il test", "Hai dimostrato buone competenze", "Devi migliorare").`;

      try {
        const payload = { prompt, quizResponses };
        console.log("Payload inviato:", payload);

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

        if (quizResponsesEvaluation.status >= 500) {
          setError("Error");
          throw new Error("Internal Server Error - Server error");
        }

        if (!quizResponsesEvaluation.ok) {
          throw new Error("Errore nella richiesta di valutazione.");
        }

        const evaluationResult: EvaluationResult = await quizResponsesEvaluation.json();
        console.log("Risultato della valutazione:", evaluationResult);
        setEvaluationResult(evaluationResult);
        if (user) {
          await saveInterviewSession(user.uid, interviewDetails, evaluationResult);
          console.log("Sessione salvata con successo!");
        }
        setError(null);
        setIsLoading(false);
      } catch (e) {
        setError("errore");
        setIsLoading(false);
        console.error("Errore durante la valutazione:", e);
      } finally {
        console.log("Fine evaluateAnswers");
        // ================================================================
        // Scommenta per testare l'errore
        // setError("Error");
        // ================================================================
      }
    }
  };

  const handleQuestionsComplete = (quizResponsesSent: QuizResponse[]) => {
    setStep("resultsList");
    setIsLoading(true);
    setError(null);
    if (quizResponsesSent) {
      setQuizResponses(quizResponsesSent);
    }
  };

  useEffect(() => {
    if (quizResponses) {
      evaluateAnswers();
    }
  }, [quizResponses]);
  {
    if (isLoading) return <Loading lazyLoading={true} />;
  }

  return (
    <>
      {step === "newInterview" && <NewInterview onSubmit={handleInterviewOptionsSubmit} />}
      {step === "interviewRequirements" && <InterviewRequirements onSubmit={handleInterviewRequirementsSubmit} />}
      {step === "chooseInterviewer" && interviewOptions && <ChooseInterviewer onInterviewerSelect={handleInterviewerSelect} />}
      {step === "questionCard" && interviewDetails && (
        <QuestionCard role={interviewDetails.topic} totalQuestions={generatedQuestions.length} questions={generatedQuestions} onComplete={handleQuestionsComplete} />
      )}
      {error && interviewDetails ? <ResultsListError evaluateAnswers={evaluateAnswers} interviewDetails={interviewDetails} /> : null}
      {step === "resultsList" && evaluationResult && interviewDetails && (
        <main className={style.main}>
          <div className={style.container}>
            <ResultsList evaluationResult={evaluationResult} interviewDetails={interviewDetails} />
          </div>
          <Link href={"/landing-page"} className={style.linkBtn}>
            <CtaButton label="Torna alla home" className="ctaC" />
          </Link>
        </main>
      )}
    </>
  );
};

export default withAuth(InterviewProcess);
