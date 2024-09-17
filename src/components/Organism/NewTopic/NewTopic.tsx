// components/Organism/NewTopic/NewTopic.tsx
import React, { useState } from "react";
import { customFormLabels, customFormOptions } from "@/constants/menuData";
import style from "./new-topic.module.scss";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";

import Image from "next/image";
import topicHero from "@/../public/icons/new-topic2.png";
import InputBox from "@/components/Molecules/InputBox/InputBox";

interface TopicFormProps {
	onSubmit: (details: { topic: string; level: string; numQuestions: string }) => void;
}

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
			<header className={style.header}>
				<h2 className={style.sectionTitle}>{customFormLabels.title}</h2>
			</header>
			<div className={style.hero}>
				<Image src={topicHero} alt='Topic image' fill={true} priority={true} />
			</div>
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

				<CtaButton type='submit' label={customFormLabels.button} className='ctaB' />
			</form>
		</main>
	);
};

export default NewTopic;
