import { useState } from "react";
import style from "./questionCard.module.scss";
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
  onComplete: (responses: { q: string; a: string }[]) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  role,
  totalQuestions,
  questions,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ q: string; a: string }[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = () => {
    if (currentResponse.trim() === "") {
      setErrorMessage("Per favore inserisci una risposta.");
      return;
    }

    setResponses((prevResponses) => [
      ...prevResponses,
      { q: questions[currentQuestionIndex].questionText, a: currentResponse },
    ]);

    setCurrentResponse("");
    setErrorMessage("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assicurati di includere l'ultima risposta
      onComplete([
        ...responses,
        { q: questions[currentQuestionIndex].questionText, a: currentResponse },
      ]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentResponse(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // Calcola la percentuale di completamento in base al numero di risposte
  const progressPercentage = (responses.length / totalQuestions) * 100;

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
          currentStep={progressPercentage}
          totalSteps={100} // Passa il valore massimo di completamento (100%)
        />
      </div>

      {errorMessage && <mark className={style.invalid}>{errorMessage}</mark>}

      <TextAreaBox
        name="response"
        label={`${currentQuestionIndex + 1}. ${
          questions[currentQuestionIndex].questionText
        }`}
        placeholder="Scrivi la tua risposta qui..."
        value={currentResponse}
        onChange={handleInputChange}
        required={true}
      />

      <div className={style.buttons}>
        <ActionButton onClick={handleNext} label="Next" className="round" />
      </div>
    </div>
  );
};

export default QuestionCard;
