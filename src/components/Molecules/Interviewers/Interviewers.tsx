import style from "./Interviewers.module.scss";
import Image from "next/image";
import { interviewersLabels } from "@/constants/indexLabels";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import { profiles } from "@/constants/interviewersProfiles";

const Interviewers = () => {
	return (
		<section id='interviewers' className={style.interviewers}>
			<div className={style.interviewersContainer}>
				<div className={style.interviewersHeader}>
					<h2>
						I nostri
						<span className={style.bold}> recruiter</span>
					</h2>
					<p>{interviewersLabels.description}</p>
				</div>

				<div className={style.interviewersRow}>
					{profiles.map((interviewer) => {
						return (
							<div className={style.interviewerCard}>
								<div className={style.avatarContainer}>
									<div className={style.avatarBox}>
										<Image src={interviewer.avatarSrc} alt='Interviewer Avatar' width={160} height={160} priority />
									</div>
								</div>
								<div className={style.interviewerContent}>
									<h3>{interviewer.name}</h3>
									<p>{interviewer.shortBio}</p>
								</div>
							</div>
						);
					})}
				</div>

				<CtaButton className='ctaC' label={interviewersLabels.start} />
			</div>
		</section>
	);
};

export default Interviewers;