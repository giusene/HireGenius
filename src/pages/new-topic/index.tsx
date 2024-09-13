import React, { useState } from 'react';
import { customFormLabels, customFormOptions } from '@/constants/labels';
import Input from '@/components/Atoms/Input/Input';
import Label from '@/components/Atoms/Label/Label';

interface TopicFormProps {
  // Qui puoi aggiungere eventuali props che vuoi passare al componente
}

const NewInterview: React.FC<TopicFormProps> = () => {
const [topic, setTopic] = useState('');
const [level, setLevel] = useState('');
const [numQuestions, setNumQuestions] = useState('');
const [duration, setDuration] = useState('');

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui gestisci l'invio del form, ad esempio inviando i dati a un backend
    console.log({ topic, level, numQuestions, duration });
};

return (
    <div>
    <h2>{customFormLabels.title}</h2>
    <form onSubmit={handleSubmit}>
        <div>
    <Label name='topic' label={customFormLabels.topicLabel}/>
    <Input type={'text'} name={'topic'} value={topic} onChange={(e) => setTopic(e.target.value)}/>
        </div>
        <div>
        <Label name='level' label={customFormLabels.level}/>
        <select id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
            {customFormOptions.optionsLevel.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
            ))}
        </select>
        </div>
        <div>
        <Label name='numQuestions' label={customFormLabels.numberOfQuestionsLabel}/>
        <select id="numQuestions" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)}>
            {customFormOptions.optionsQuestion.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
            ))}
        </select>
        </div>
        <div>
        <Label name='duration' label={customFormLabels.testDurationLabel}/>
        <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
            {customFormOptions.optionsDuration.map((option) => (
                <option key={option} value={option}>
                {option}
            </option>
            ))}
        </select>
        </div>
        <button type="submit">{customFormLabels.button}</button>
    </form>
    </div>
);
};

export default NewInterview;