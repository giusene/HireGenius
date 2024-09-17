import { EvaluatedResponse } from "@/components/Organism/ResultsList/ResultsList";
import style from "./ResultCard.module.scss";

import Image from "next/image";
import { useState } from "react";
import ActionButton from "../Buttons/ActionButton";

import arrowSelect from "@/../public/icons/arrow-select.png";
import arrowUp from "@/../public/icons/arrow-up.png";

interface ResultCardProps {
	index: number;
	response: EvaluatedResponse;
}

const ResultCard = (props: ResultCardProps) => {
	const { response, index } = props;

	const [showDetails, setShowDetails] = useState(false);
	const statusIcon = `/icons/${response.answerStatus}.png`;

	return (
		<div className={`${style.resultCard} ${style[response.answerStatus]}`}>
			<div className={style.resultCardHeader}>
				<div>
					<h4>Domanda {index + 1}</h4>
					<p>{response.q}</p>
				</div>
				<Image src={statusIcon} alt={`${response.answerStatus} icon`} width={30} height={30} />
			</div>
			{showDetails && (
				<>
					<div>
						<h4>Risposta</h4>
						<p>{response.a}</p>
					</div>
					<div>
						<h4>Feedback sulla tua risposta</h4>
						<p>{response.answerFeedback}</p>
					</div>
					<div>
						<h4>Suggerimento di risposta corretta</h4>
						<p>{response.correctAnswer}</p>
					</div>
				</>
			)}
			<ActionButton className='round' icon={showDetails ? arrowUp : arrowSelect} onClick={() => setShowDetails(!showDetails)} />
		</div>
	);
};

export default ResultCard;
