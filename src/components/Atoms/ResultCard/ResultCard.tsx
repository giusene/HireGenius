import { EvaluatedResponse } from "@/components/Organism/ResultsList/ResultsList";
import style from "./ResultCard.module.scss";

interface ResultCardProps {
	index: number;
	response: EvaluatedResponse;
}

const ResultCard = (props: ResultCardProps) => {
	const { response, index } = props;

	return (
		<div className={style.resultCard}>
			<div className={style.resultCardHeader}>
				<h4>Domanda {index + 1}</h4>
				<span></span>
			</div>
			<p>{response.answerStatus}</p>
			<p>{response.q}</p>
			<p>{response.a}</p>
			<p>{response.answerFeedback}</p>
			<p>{response.correctAnswer}</p>
		</div>
	);
};

export default ResultCard;
