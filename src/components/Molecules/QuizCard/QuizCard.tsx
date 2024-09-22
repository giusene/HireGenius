import Cup from "@/../public/icons/trophy.png";
import Silver from "@/../public/icons/silver-medal.png";
import Bronze from "@/../public/icons/bronze-medal.png";
import Lose from "@/../public/icons/lose.png";
import DeleteIcon from "@/../public/icons/delete.svg";
import Image, { StaticImageData } from "next/image";
import style from "./QuizCard.module.scss";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import { Dispatch, SetStateAction, useState } from "react";
import { deleteInterviewSession } from "@/utils/deleteInterviewSession";
import { useAuth } from "@/context/AuthContext";
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
  onDelete: (sessionId: string) => void;
  setSelectedInterviewSession: Dispatch<SetStateAction<InterviewSession | null>>;
}

const QuizCard: React.FC<QuizCardProps> = ({ interviewSession, onDelete, setSelectedInterviewSession }) => {
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
    locale: it, // Imposta il locale italiano
  })
    .replace("circa", "")
    .trim();

  // Cancellazione
  const handleDelete = () => {
    setShowPopup(true);
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
    <>
      <div onClick={() => setShowFeedback(!showPopup ? !showFeedback : false)} className={`${style.quizCardContainer} ${showFeedback && style.selectedCard} `}>
        <div className={style.quizCard}>
          <div className={style.quizCardImgContainer}>
            <Image src={iconSrc} className={style.icon} alt="Icon" width={80} height={80} />
            <div className={style.scoreContainer}>
              <span>{interviewSession.evaluationResult.globalEvaluation.points}%</span>
            </div>
          </div>
          <div className={style.content}>
            <div>
              <h4 className={`${style.titleCard} ${showFeedback ? style.fullText : ""}`}>{interviewSession.interviewDetails.topic}</h4>
              <span>{dateFromNow}</span>
            </div>
            <div className={style.interviewerContainer}>
              <span>{interviewSession.interviewDetails.interviewer.name}</span>
              <div className={style.avatarInterviewer}>
                <Image src={interviewSession.interviewDetails.interviewer.avatarSrc} alt={interviewSession.interviewDetails.interviewer.name}></Image>
              </div>
            </div>
          </div>
        </div>
        {showFeedback && (
          <>
            <p>{interviewSession.evaluationResult.globalEvaluation.feedback}</p>
            <div className={style.buttonsContainer}>
              <CtaButton label="Dettagli" className="ctaC" onClick={() => setSelectedInterviewSession(interviewSession)} />
              <div className={style.deleteButton} onClick={handleDelete}>
                <Image src={DeleteIcon} alt={"Delete"}></Image>
              </div>
            </div>
          </>
        )}
      </div>
      <ConfirmDeletePopup message="Sicuro di voler eliminare la sessione?" isOpen={showPopup} onConfirm={confirmDelete} onCancel={cancelDelete} />
    </>
  );
};

export default QuizCard;
