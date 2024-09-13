import React, { useState } from 'react';
import { newInterviewFormLabels, interviewFormOptions } from '@/constants/labels';
import Input from '@/components/Atoms/Input/Input';
import Label from '@/components/Atoms/Label/Label';

interface InterviewFormProps {
  // Qui puoi aggiungere eventuali props che vuoi passare al componente
}

const NewInterview: React.FC<InterviewFormProps> = () => {
const [role, setRole] = useState('');
const [seniority, setSeniority] = useState('');
const [numberOfQuestions, setNumberOfQuestions] = useState('');
const [duration, setDuration] = useState('');

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui gestisci l'invio del form, ad esempio inviando i dati a un backend
    console.log('Dati del colloquio:', { role, seniority, numberOfQuestions, duration });
};

return (
    <div className="new-interview">
    <h2>{newInterviewFormLabels.newInterviewTitle}</h2>
    <form onSubmit={handleSubmit}>
        <div>
        <Label name='role' label={newInterviewFormLabels.roleLabel}/>
    <Input type={'text'} name={'role'} value={role} onChange={(e) => setRole(e.target.value)}/>
        </div>
        <div>
        <Label name='seniority' label={newInterviewFormLabels.seniorityLabel}/>
        <select id="seniority" value={seniority} onChange={(e) => setSeniority(e.target.value)}>
            {interviewFormOptions.seniority.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
        <Label name='numberOfQuestions' label={newInterviewFormLabels.numberOfQuestionsLabel}/>
        <select id="numberOfQuestions" value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)}>
            {interviewFormOptions.numberOfQuestions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
        <Label name='duration' label={newInterviewFormLabels.testDurationLabel}/>
        <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
            {interviewFormOptions.testDuration.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{newInterviewFormLabels.buttonsNext}</button>
    </form>
    </div>
);
};

export default NewInterview;