// components/Organism/NewTopic/NewTopic.tsx
import React, { useState } from "react";
import { interviewFormLabels, interviewFormOptions } from "@/constants/menuData";
import style from "./NewInterview.module.scss";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";

import Image from "next/image";
import interviewHero from "@/../public/icons/new-interview2.png";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import { TopicFormProps } from "@/interfaces/interfaces";

const NewInterview: React.FC<TopicFormProps> = ({ onSubmit }) => {
	const [interview, setInterview] = useState("");
	const [seniority, setSeniority] = useState("");
	const [numQuestions, setNumQuestions] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ topic: interview, level: seniority, numQuestions });
		onSubmit({ topic: interview, level: seniority, numQuestions });
	};

	return (
		<main className={style.main}>
			<div className={style.container}>
				<header className={style.header}>
					<h2 className={style.sectionTitle}>{interviewFormLabels.title}</h2>

					<div className={style.hero}>
						<Image src={interviewHero} alt='Interview image' width={634} height={364} priority={true} />
					</div>
				</header>

				<div>
					<form onSubmit={handleSubmit}>
						<InputBox type='text' name='interview' label={interviewFormLabels.interviewLabel} value={interview} onChange={(e) => setInterview(e.target.value)} />

						<SelectBox
							name='seniority'
							label={interviewFormLabels.seniority}
							value={seniority}
							onChange={(e) => setSeniority(e.target.value)}
							required={false}
							options={interviewFormOptions.optionsSeniority}
						/>

						<SelectBox
							label={interviewFormLabels.numberOfQuestionsLabel}
							name='numQuestions'
							value={numQuestions}
							onChange={(e) => setNumQuestions(e.target.value)}
							required={false}
							options={interviewFormOptions.optionsQuestion}
						/>

						<CtaButton type='submit' label={interviewFormLabels.button} className='ctaB' disabled={interview == ""} />
					</form>
				</div>
			</div>
		</main>
	);
};

export default NewInterview;
