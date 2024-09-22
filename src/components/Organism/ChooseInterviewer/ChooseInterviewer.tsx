import style from "./ChooseInterviewer.module.scss";
import { FormEvent, useState } from "react";

import Image from "next/image";
import InterviewerBadge from "@/components/Atoms/InterviewerBadge/InterviewerBadge";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import { ChooseInterviewerProps } from "@/interfaces/interfaces";
import { profiles } from "@/constants/interviewersProfiles";

const ChooseInterviewer: React.FC<ChooseInterviewerProps> = ({ onInterviewerSelect }) => {
	const [selectedInterviewer, setSelectedInterviewer] = useState<(typeof profiles)[0] | null>(null);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (selectedInterviewer) {
			onInterviewerSelect(selectedInterviewer);
		}
	};

	return (
		<main className={style.main}>
			<div className={style.container}>
				<header className={style.header}>
					<h2 className={style.sectionTitle}>Scegli il tuo Recruiter</h2>
				</header>

				<div>
					<form onSubmit={handleSubmit} className={style.interviewerForm}>
						<div className={style.avatarGrid}>
							{profiles.map((profile) => (
								<label key={profile.value} className={`${selectedInterviewer?.value === profile.value ? `${style.label} ${style.selected}` : style.label}`} htmlFor={profile.value}>
									<div>
										<div className={style.avatar}>
											<Image className={style.avatarImg} src={profile.avatarSrc} alt={`Avatar ${profile.name}`} width={1000} height={1000} priority />
										</div>
										<h3 className={style.avatarName}>{profile.name}</h3>
										<p className={style.avatarBio}>{profile.shortBio}</p>
									</div>
									<InterviewerBadge label={profile.level} className={profile.className} />
									<input type='radio' name='interviewer' id={profile.value} value={profile.value} onChange={() => setSelectedInterviewer(profile)} required={false} className={style.radio} />
								</label>
							))}
						</div>

						<CtaButton label='Cominciamo!' className='ctaA' type='submit' disabled={selectedInterviewer == null} />
					</form>
				</div>
			</div>
		</main>
	);
};

export default ChooseInterviewer;
