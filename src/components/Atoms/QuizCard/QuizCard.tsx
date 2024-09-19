import Cup from "@/../public/icons/trophy.png";
import Silver from "@/../public/icons/silver-medal.png";
import Bronze from "@/../public/icons/bronze-medal.png";
import Lose from "@/../public/icons/lose.png";
import Image, { StaticImageData } from "next/image";
import style from "./QuizCard.module.scss";

import arrowSelect from "@/../public/icons/arrow-select.png";
import arrowUp from "@/../public/icons/arrow-up.png";

import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import ActionButton from "../Buttons/ActionButton";

interface QuizCardProps {
	date: string;
	topic: string;
	score: number;
	interviewer: string;
	message: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ date, topic, score, interviewer, message }) => {
	const [showDetails, setShowDetails] = useState(false);

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
	const dateFromNow = formatDistanceToNow(new Date(newDate), { addSuffix: true });

	return (
		<div className={style.quizCardContainer}>
			<div className={style.quizCard}>
				<Image src={iconSrc} className={style.icon} alt='Icon' width={80} height={80} />
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

				<ActionButton className='round' icon={showDetails ? arrowUp : arrowSelect} onClick={() => setShowDetails(!showDetails)} />
			</div>
			{showDetails && <p>{message}</p>}
		</div>
	);
};

export default QuizCard;
