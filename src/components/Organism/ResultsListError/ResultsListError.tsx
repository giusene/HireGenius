import style from "./ResultsListError.module.scss";
import Image from "next/image";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import { ResultsListErrorProps } from "@/interfaces/interfaces";

const ResultsListError = (props: ResultsListErrorProps) => {
	const { interviewDetails, evaluateAnswers } = props;

	return (
		<main className={style.main}>
			{interviewDetails && (
				<>
					<header className={style.header}>
						<h2 className={style.sectionTitle}>{interviewDetails.topic}</h2>
					</header>

					<div className={style.avatarContainer}>
						<div className={style.avatarBox}>
							<Image src={interviewDetails.interviewer.avatarSrc} alt='Interviewer Avatar' width={160} height={160} priority />
						</div>
					</div>
				</>
			)}
			<p>{`Ups... un attimo di distrazione e ${interviewDetails.interviewer.name} è in pausa caffè...!`}</p>
			<CtaButton label='Riproviamo!' className='ctaB' onClick={evaluateAnswers} />
		</main>
	);
};

export default ResultsListError;
