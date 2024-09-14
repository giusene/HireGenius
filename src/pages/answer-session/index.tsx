import { useState } from "react";
import style from "./answerSession.module.scss";
import ProgressBar from "@/components/Atoms/ProgressBar/ProgressBar";
import TextAreaBox from "@/components/Molecules/TextAreaBox/TextAreaBox";
import ActionButton from "@/components/Atoms/Buttons/ActionButton";

interface Question {
  questionText: string;
}

interface QuestionCardProps {
  role: string;
  totalQuestions: number;
  questions: Question[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  role,
  totalQuestions,
  questions,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ q: string; a: string }[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = () => {
    if (currentResponse.trim() === "") {
      setErrorMessage("*Per favore inserisci una risposta.");
      return;
    }

    setResponses([
      ...responses,
      { q: questions[currentQuestionIndex].questionText, a: currentResponse },
    ]);

    setCurrentResponse("");
    setErrorMessage(""); // Rimuove il messaggio d'errore quando c'è una risposta valida

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("All responses:", responses);
      alert(
        "Hai completato tutte le domande! Controlla la console per vedere tutte le tue risposte."
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentResponse(e.target.value);
    if (errorMessage) {
      setErrorMessage(""); // Rimuove il messaggio d'errore quando l'utente inizia a digitare
    }
  };

  return (
    <div className={style.questionCard}>
      <div className={style.header}>
        <h2 className={style.sectionTitle}>{role}</h2>
      </div>
      <div className={style.progress}>
        <h3>
          {currentQuestionIndex + 1}/{totalQuestions}
        </h3>
        <ProgressBar
          currentStep={currentQuestionIndex}
          totalSteps={totalQuestions}
        />
      </div>

      {/* Messaggio d'errore */}
      {errorMessage && <p className={style.error}>{errorMessage}</p>}

      <TextAreaBox
        name="response"
        label={`${currentQuestionIndex + 1}. ${
          questions[currentQuestionIndex].questionText
        }`}
        placeholder="Scrivi la tua risposta qui..."
        value={currentResponse}
        onChange={handleInputChange} // Usa la nuova funzione per gestire i cambiamenti
        required={true}
      />

      <div className={style.buttons}>
        <ActionButton onClick={handleNext} label="Next" className="round" />
      </div>
    </div>
  );
};

// Dati di mockup
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

const AnswerSession: React.FC = () => {
  return (
    <QuestionCard
      role="Junior Front End Developer"
      totalQuestions={mockQuestions.length}
      questions={mockQuestions}
    />
  );
};

export default AnswerSession;
