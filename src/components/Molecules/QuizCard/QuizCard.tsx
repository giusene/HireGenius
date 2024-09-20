import Cup from "@/../public/icons/trophy.png";
import Silver from "@/../public/icons/silver-medal.png";
import Bronze from "@/../public/icons/bronze-medal.png";
import Lose from "@/../public/icons/lose.png";
import DeleteIcon from "@/../public/icons/delete.svg";
import Image, { StaticImageData } from "next/image";
import style from "./QuizCard.module.scss";
import arrowSelect from "@/../public/icons/arrow-select.png";
import arrowUp from "@/../public/icons/arrow-up.png";
import { formatDistanceToNow } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import ActionButton from "../../Atoms/Buttons/ActionButton";
import { deleteInterviewSession } from "@/utils/deleteInterviewSession";
import { useAuth } from "@/context/AuthContext"; // Assumendo che ci sia un contesto di autenticazione
import { EvaluationResult, InterviewDetails } from "@/interfaces/interfaces";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import ConfirmDeletePopup from "../../Atoms/ConfirmDeletePopup/ConfirmDeletePopup";

interface InterviewSession {
  sessionId: string;
  sessionDate: string;
  interviewDetails: InterviewDetails;
  evaluationResult: EvaluationResult;
}

interface QuizCardProps {
  interviewSession: InterviewSession;
  onDelete: (sessionId: string) => void; // Aggiungi la callback come prop
  setSelectedInterviewSession: Dispatch<
    SetStateAction<InterviewSession | null>
  >;
}

const QuizCard: React.FC<QuizCardProps> = ({
  interviewSession,
  onDelete,
  setSelectedInterviewSession,
}) => {
  const { user } = useAuth(); // Recupera l'utente autenticato dal contesto
  const [showFeedback, setShowFeedback] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  let iconSrc = null;

  const iconMap: Record<string, StaticImageData> = {
    cup: Cup,
    silver: Silver,
    bronze: Bronze,
    lose: Lose,
  };

  if (interviewSession.evaluationResult.globalEvaluation.points >= 85) {
    iconSrc = iconMap.cup;
  } else if (interviewSession.evaluationResult.globalEvaluation.points >= 65) {
    iconSrc = iconMap.silver;
  } else if (interviewSession.evaluationResult.globalEvaluation.points >= 50) {
    iconSrc = iconMap.bronze;
  } else {
    iconSrc = iconMap.lose;
  }

  const newDate = interviewSession.sessionDate.replaceAll(" ", ",");
  const dateFromNow = formatDistanceToNow(new Date(newDate), {
    addSuffix: true,
  });

  // Cancellazione
  const handleDelete = () => {
    setShowPopup(true); // Mostra il pop-up
  };

  const confirmDelete = async () => {
    if (user) {
      try {
        await deleteInterviewSession(user.uid, interviewSession.sessionId);
        onDelete(interviewSession.sessionId);
      } catch (error) {
        console.error("Errore durante la cancellazione della sessione:", error);
      }
    }
    setShowPopup(false); // Chiudi il pop-up dopo la conferma
  };

  const cancelDelete = () => {
    setShowPopup(false); // Chiudi il pop-up se l'operazione è annullata
  };

  return (
    <div className={style.quizCardContainer}>
      <div className={style.quizCard}>
        <Image
          src={iconSrc}
          className={style.icon}
          alt="Icon"
          width={80}
          height={80}
        />
        <div className={style.content}>
          <span>{dateFromNow}</span>
          <h4>{interviewSession.interviewDetails.topic}</h4>
          <h4>
            Punteggio:{" "}
            <span>
              {interviewSession.evaluationResult.globalEvaluation.points}/100
            </span>
          </h4>
          <h4>
            Intervistatore:{" "}
            <span>{interviewSession.interviewDetails.interviewer.name}</span>
          </h4>
        </div>
        <div className={style.buttons}>
          <ActionButton
            className="round"
            icon={DeleteIcon}
            onClick={handleDelete}
          />
          <ActionButton
            className="round"
            icon={showFeedback ? arrowUp : arrowSelect}
            onClick={() => setShowFeedback(!showFeedback)}
          />
        </div>
      </div>
      {showFeedback && (
        <>
          <p>{interviewSession.evaluationResult.globalEvaluation.feedback}</p>
          <CtaButton
            label="Dettagli"
            className="ctaC"
            onClick={() => setSelectedInterviewSession(interviewSession)}
          />
        </>
      )}
      <ConfirmDeletePopup
        isOpen={showPopup}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default QuizCard;
