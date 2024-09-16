// pages/TopicProcess.tsx
import React, { useState } from "react";
import NewTopic from "@/components/Organism/NewTopic/NewTopic";
import ChooseInterviewer from "@/components/Organism/ChooseInterviewer/ChooseInterviewer";
import QuestionCard from "@/components/Organism/QuestionCard/QuestionCard";
import { profiles } from "@/components/Organism/ChooseInterviewer/ChooseInterviewer";

const mockQuestions = [
  {
    questionText:
      "Che differenza c'è tra `var`, `let` e `const` in JavaScript?",
  },
  {
    questionText:
      "Descrivi come funziona il Box Model in CSS e come può essere modificato.",
  },
  {
    questionText:
      "Spiega come funziona il bubbling degli eventi in JavaScript e come può essere gestito.",
  },
  {
    questionText:
      "Cosa sono i componenti in React e come vengono utilizzati per costruire interfacce utente?",
  },
  {
    questionText:
      "Descrivi come implementeresti una chiamata API in un'applicazione React utilizzando `fetch` o una libreria simile (es. Axios). Spiega come gestiresti la risposta e gli eventuali errori.",
  },
];

const TopicProcess: React.FC = () => {
  const [interviewDetails, setInterviewDetails] = useState<{
    topic: string;
    level: string;
    numQuestions: string;
    duration: string;
  } | null>(null);

  const [interviewer, setInterviewer] = useState<(typeof profiles)[0] | null>(
    null
  );
  const [step, setStep] = useState<
    "newInterview" | "chooseInterviewer" | "questionCard"
  >("newInterview");

  const handleInterviewDetailsSubmit = (details: {
    topic: string;
    level: string;
    numQuestions: string;
    duration: string;
  }) => {
    setInterviewDetails(details);
    setStep("chooseInterviewer");
  };

  const handleInterviewerSelect = (
    selectedInterviewer: (typeof profiles)[0]
  ) => {
    setInterviewer(selectedInterviewer);
    setStep("questionCard");
  };

  const handleQuestionsComplete = (responses: { q: string; a: string }[]) => {
    if (interviewDetails && interviewer) {
      const payload = {
        ...interviewDetails,
        interviewer: {
          name: interviewer.name,
          value: interviewer.value,
          longBio: interviewer.longBio, // Include longBio in the payload
        },
        responses,
      };

      console.log(payload);
    }
  };

  return (
    <div>
      {step === "newInterview" && (
        <NewTopic onSubmit={handleInterviewDetailsSubmit} />
      )}
      {step === "chooseInterviewer" && interviewDetails && (
        <ChooseInterviewer onInterviewerSelect={handleInterviewerSelect} />
      )}
      {step === "questionCard" && interviewer && interviewDetails && (
        <QuestionCard
          role={interviewDetails.topic} // Passa il topic qui
          totalQuestions={mockQuestions.length} // Usa la lunghezza dell'array
          questions={mockQuestions}
          onComplete={handleQuestionsComplete}
        />
      )}
    </div>
  );
};

export default TopicProcess;
