//da piazzare in pages/topic-process.tsx
import React, { useState } from "react";
import NewTopic from "@/components/Organism/NewTopic/NewTopic";
import ChooseInterviewer from "@/components/Organism/ChooseInterviewer/ChooseInterviewer";
import QuestionCard from "@/components/Organism/QuestionCard/QuestionCard";
import ResultsList from "@/components/Organism/ResultsList/ResultsList";
import { StaticImageData } from "next/image";

export interface QuizResponse {
  q: string;
  a: string;
}

interface InterviewOptions {
  topic: string;
  level: string;
  numQuestions: string;
}

export interface InterviewDetails {
  topic: string;
  level: string;
  numQuestions: string;
  interviewer: Interviewer;
}

interface Interviewer {
  avatarSrc: StaticImageData;
  name: string;
  value: string;
  shortBio: string;
  longBio: string;
  level: string;
  className: string;
}

interface GeneratedQuestion {
  questionText: string;
}

type Step =
  | "newInterview"
  | "chooseInterviewer"
  | "questionCard"
  | "resultsList";

const TopicProcess: React.FC = () => {
  const [interviewOptions, setInterviewOptions] =
    useState<InterviewOptions | null>(null);
  // const [interviewer, setInterviewer] = useState<Interviewer>(profiles[0]);
  const [interviewDetails, setInterviewDetails] =
    useState<InterviewDetails | null>(null);
  const [step, setStep] = useState<Step>("newInterview");
  const [generatedQuestions, setGeneratedQuestions] = useState<
    GeneratedQuestion[]
  >([]);
  const [quizResponses, setQuizResponses] = useState<QuizResponse[] | null>(
    null
  );

  const handleInterviewDetailsSubmit = (interviewOptions: InterviewOptions) => {
    setInterviewOptions(interviewOptions);
    setStep("chooseInterviewer");
  };

  const handleInterviewerSelect = async (selectedInterviewer: Interviewer) => {
    if (!interviewOptions) {
      return;
    }

    const newInterviewDetails = {
      ...interviewOptions,
      interviewer: selectedInterviewer,
    };
    setInterviewDetails(newInterviewDetails); // Imposta lo stato dell'intervista

    const maxRetries = 3; // Numero massimo di tentativi
    let attempt = 0;
    let success = false;

    const prompt = `
		  Immagina di essere l'esaminatore ${newInterviewDetails.interviewer.name}. ${newInterviewDetails.interviewer.longBio}.
		  Devi condurre un colloquio tecnico ${newInterviewDetails.level}.
		  Ponimi ${newInterviewDetails.numQuestions} domande tecniche sul tema "${newInterviewDetails.topic}", di difficoltà crescente.
		`;

    // Debug del prompt
    console.log("Prompt sent to API:", prompt);

    while (attempt < maxRetries && !success) {
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
        success = true;
        setStep("questionCard");
        console.log("Questions generated successfully", parsedData);
      } catch (e) {
        console.error("Error generating questions", e);
        attempt++;
      }
    }
  };

  const handleQuestionsComplete = (quizResponses: QuizResponse[]) => {
    if (quizResponses) {
      setQuizResponses(quizResponses);
    }
    console.log(quizResponses);
    setStep("resultsList");
  };

  return (
    <>
      {step === "newInterview" && (
        <NewTopic onSubmit={handleInterviewDetailsSubmit} />
      )}
      {step === "chooseInterviewer" && interviewOptions && (
        <ChooseInterviewer onInterviewerSelect={handleInterviewerSelect} />
      )}
      {step === "questionCard" && interviewDetails && (
        <QuestionCard
          role={interviewDetails.topic}
          totalQuestions={generatedQuestions.length}
          questions={generatedQuestions}
          onComplete={handleQuestionsComplete}
        />
      )}
      {quizResponses && interviewDetails && step === "resultsList" && (
        <ResultsList
          quizResponses={quizResponses}
          interviewDetails={interviewDetails}
        />
      )}
    </>
  );
};

export default TopicProcess;
