// components/Organism/NewTopic/NewTopic.tsx
import React, { useState } from "react";
import { customFormLabels, customFormOptions } from "@/constants/menuData";
import style from "./NewTopic.module.scss";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";

import Image from "next/image";
import topicHero from "@/../public/icons/new-topic2.png";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import { TopicFormProps } from "@/interfaces/interfaces";

const NewTopic: React.FC<TopicFormProps> = ({ onSubmit }) => {
	const [topic, setTopic] = useState("");
	const [level, setLevel] = useState("");
	const [numQuestions, setNumQuestions] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ topic, level, numQuestions });
		onSubmit({ topic, level, numQuestions });
	};

	return (
		<main className={style.main}>
			<div className={style.container}>
				<header className={style.header}>
					<h2 className={style.sectionTitle}>{customFormLabels.title}</h2>

					<div className={style.hero}>
						<Image src={topicHero} alt='Topic image' width={634} height={364} priority={true} />
					</div>
				</header>

				<div>
					<form onSubmit={handleSubmit}>
						<InputBox type='text' name='topic' label={customFormLabels.topicLabel} value={topic} onChange={(e) => setTopic(e.target.value)} />

						<SelectBox name='level' label={customFormLabels.level} value={level} onChange={(e) => setLevel(e.target.value)} required={false} options={customFormOptions.optionsLevel} />

						<SelectBox
							label={customFormLabels.numberOfQuestionsLabel}
							name='numQuestions'
							value={numQuestions}
							onChange={(e) => setNumQuestions(e.target.value)}
							required={false}
							options={customFormOptions.optionsQuestion}
						/>

						<CtaButton type='submit' label={customFormLabels.button} className='ctaB' disabled={topic === ""} />
					</form>
				</div>
			</div>
		</main>
	);
};

export default NewTopic;
