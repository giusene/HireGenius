import { FormEvent, useState } from "react";
import style from "./questionCard.module.scss";
import ProgressBar from "@/components/Atoms/ProgressBar/ProgressBar";
import TextAreaBox from "@/components/Molecules/TextAreaBox/TextAreaBox";
import ActionButton from "@/components/Atoms/Buttons/ActionButton";

import NextIcon from "@/../public/icons/arrow-right.png";
import PrevIcon from "@/../public/icons/arrow-left.png";
import { QuestionCardProps } from "@/interfaces/interfaces";

const QuestionCard: React.FC<QuestionCardProps> = ({ role, totalQuestions, questions, onComplete }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [responses, setResponses] = useState<{ q: string; a: string }[]>([]);
	const [currentResponse, setCurrentResponse] = useState("");

	const handleNext = (e: FormEvent) => {
		e.preventDefault();

		if (currentResponse.trim() === "") {
			return; // Evita di procedere se la risposta è vuota
		}

		// Aggiorna le risposte con la risposta corrente
		const newResponses = [...responses.slice(0, currentQuestionIndex), { q: questions[currentQuestionIndex].questionText, a: currentResponse }];
		setResponses(newResponses);
		setCurrentResponse(""); // Resetta il campo di risposta

		if (currentQuestionIndex < questions.length - 1) {
			// Se ci sono ancora domande, passa alla prossima
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			// Se siamo all'ultima domanda, completa il quiz
			onComplete(newResponses);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			// Imposta la risposta precedente se esiste
			const previousResponse = responses[currentQuestionIndex - 1]?.a || "";
			setCurrentResponse(previousResponse);
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCurrentResponse(e.target.value);
	};

	// Calcola la percentuale di completamento in base al numero di risposte
	const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;

	return (
		<main className={style.main}>
			<div className={style.container}>
				<header className={style.header}>
					<h2 className={style.sectionTitle}>{role}</h2>

					<div className={style.progress}>
						<h3>
							{currentQuestionIndex + 1}/{totalQuestions}
						</h3>
						<ProgressBar currentStep={progressPercentage} totalSteps={100} />
					</div>
				</header>

				<div>
					<form onSubmit={handleNext}>
						<TextAreaBox
							name='response'
							label={`${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].questionText}`}
							placeholder='Scrivi la tua risposta qui...'
							value={currentResponse}
							onChange={handleInputChange}
							required={true}
						/>

						<div className={style.buttons}>
							{currentQuestionIndex > 0 && <ActionButton icon={PrevIcon} onClick={handlePrevious} className='round' type='button' />}
							<ActionButton icon={NextIcon} className='round' type='submit' />{" "}
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default QuestionCard;
