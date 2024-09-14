import React, { useState } from "react";
import { customFormLabels, customFormOptions } from "@/constants/menuData";
import Input from "@/components/Atoms/Input/Input";
import Label from "@/components/Atoms/Label/Label";
import style from "@/pages/new-topic/new-topic.module.scss";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";

interface TopicFormProps {
	// Qui puoi aggiungere eventuali props che vuoi passare al componente
}

const NewInterview: React.FC<TopicFormProps> = () => {
	const [topic, setTopic] = useState("");
	const [level, setLevel] = useState("");
	const [numQuestions, setNumQuestions] = useState("");
	const [duration, setDuration] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Qui gestisci l'invio del form, ad esempio inviando i dati a un backend
		console.log({ topic, level, numQuestions, duration });
	};

	return (
		<div className={style.newTopic}>
			<h2>{customFormLabels.title}</h2>
			<div className={style.hero}>
			{/* <Image 
			className={style.topicImg}
			src={immagine}
			alt="topic"
			width={400}
			height={200}
			priority/> */}
			</div>
			<form onSubmit={handleSubmit}>
				<div>
					<Label name='topic' label={customFormLabels.topicLabel} />
					<Input type={"text"} name={"topic"} label={customFormLabels.topicLabel} value={topic} onChange={(e) => setTopic(e.target.value)} />
				</div>
				<div>
					<SelectBox 
					name="level" 
					label={customFormLabels.level} 
					value={level} onChange={(e) => setLevel(e.target.value)} 
					required={false} 
					options={customFormOptions.optionsLevel}
					/>
				</div>
				<div>
					<SelectBox 
					label={customFormLabels.numberOfQuestionsLabel}
					name="numQuestions" 
					value={numQuestions} 
					onChange={(e) => setNumQuestions(e.target.value)} 
					required={false} 
					options={customFormOptions.optionsQuestion}/>
				</div>
				<div>
					<SelectBox 
					name="duration" 
					label={customFormLabels.testDurationLabel}
					value={duration} 
					onChange={(e) => setDuration(e.target.value)} 
					required={false} 
					options={customFormOptions.optionsDuration}/>
				</div>
				<CtaButton type='submit' label={customFormLabels.button} className="ctaB"/>
			</form>
		</div>
	);
};

export default NewInterview;
