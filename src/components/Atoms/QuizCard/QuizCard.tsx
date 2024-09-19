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
import { useState } from "react";
import ActionButton from "../Buttons/ActionButton";
import { deleteInterviewSession } from "@/utils/deleteInterviewSession";
import { useAuth } from "@/context/AuthContext"; // Assumendo che ci sia un contesto di autenticazione

interface QuizCardProps {
  date: string;
  topic: string;
  score: number;
  interviewer: string;
  message: string;
  sessionId: string; // Aggiungi l'ID della sessione come prop
  onDelete: (sessionId: string) => void; // Aggiungi la callback come prop
}

const QuizCard: React.FC<QuizCardProps> = ({
  date,
  topic,
  score,
  interviewer,
  message,
  sessionId,
  onDelete,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useAuth(); // Recupera l'utente autenticato dal contesto

  let iconSrc = null;

  const iconMap: Record<string, StaticImageData> = {
    cup: Cup,
    silver: Silver,
    bronze: Bronze,
    lose: Lose,
  };

  if (score >= 85) {
    iconSrc = iconMap.cup;
  } else if (score >= 65) {
    iconSrc = iconMap.silver;
  } else if (score >= 50) {
    iconSrc = iconMap.bronze;
  } else {
    iconSrc = iconMap.lose;
  }

  const newDate = date.replaceAll(" ", ",");
  const dateFromNow = formatDistanceToNow(new Date(newDate), {
    addSuffix: true,
  });

  // Cancellazione
  const handleDelete = async () => {
    if (user) {
      try {
        await deleteInterviewSession(user.uid, sessionId);
        onDelete(sessionId); // Chiama la funzione di eliminazione del parent
      } catch (error) {
        console.error("Errore durante la cancellazione della sessione:", error);
      }
    }
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
          <h4>{topic}</h4>
          <h4>
            Punteggio: <span>{score}/100</span>
          </h4>
          <h4>
            Intervistatore: <span>{interviewer}</span>
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
            icon={showDetails ? arrowUp : arrowSelect}
            onClick={() => setShowDetails(!showDetails)}
          />
        </div>
      </div>
      {showDetails && <p>{message}</p>}
    </div>
  );
};

export default QuizCard;
