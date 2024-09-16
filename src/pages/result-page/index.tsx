import React, { useEffect, useState } from 'react';
import style from "./result-page.module.scss";
import CtaButton from '@/components/Atoms/Buttons/CtaButton';
import Avatar1 from "@/../public/avatar1.png";
import Image from "next/image";

interface ResultProps {
role: string;
feedbackMessage: string;
responses: { q: string; a: string; status: 'correct' | 'incorrect' | 'average' }[];
}

// Mock delle domande
const mockQuestions = [
{
    q: "Che differenza c'è tra `var`, `let` e `const` in JavaScript?",
},
{
    q: "Descrivi come funziona il Box Model in CSS e come può essere modificato.",
},
{
    q: "Spiega come funziona il bubbling degli eventi in JavaScript e come può essere gestito.",
},
{
    q: "Cosa sono i componenti in React e come vengono utilizzati per costruire interfacce utente?",
},
{
    q: "Descrivi come implementeresti una chiamata API in un'applicazione React utilizzando `fetch` o una libreria simile (es. Axios). Spiega come gestiresti la risposta e gli eventuali errori.",
},
];

// Simula risposte e status casuale
const simulateResponses = (questions: { q: string }[]) => {
const statuses = ['correct', 'incorrect', 'average'] as const;

return questions.map((question) => ({
    q: question.q,
    a: `Risposta simulata alla domanda: ${question.q}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
}));
};

const Answer: React.FC<ResultProps> = ({ role, feedbackMessage, responses }) => {
  // Funzione per determinare il colore dell'indicatore di valutazione
const getStatusIcon = (status: 'correct' | 'incorrect' | 'average') => {
    switch (status) {
    case 'correct':
    return <span style={{ color: 'green' }}>✔️</span>; // Icona per corretto (verde)
    case 'incorrect':
    return <span style={{ color: 'red' }}>❌</span>; // Icona per errato (rosso)
    case 'average':
    return <span style={{ color: 'orange' }}>⚠️</span>; // Icona per incompleto (giallo)
    default:
    return null;
    }
};

return (
    <div className={style.resultPage}>
    <div className={style.header}>
    <h2 className={style.sectionTitle}>{role}</h2>
    </div>
    <div className={style.containerImg}>
    <Image className={style.avatarImg} alt='Avatar1' src={Avatar1} width={1000} height={1000} priority/>
    </div>
    <div>
    <h3>Grande!</h3>
    <p className={style.feedbackMessage}>{feedbackMessage}</p>
    </div>
    {/* Lista delle domande con lo stato della risposta */}
    {mockQuestions.map((q, index) => {
 // Verifica se c'è una risposta per questa domanda
        const response = responses[index];

        return (
            <div key={index}>
            <div>
            <h4>Domanda {index + 1}</h4>
            </div>
            <p> {q.q}</p>
            {response ? (
                <p> {response.a} {response && getStatusIcon(response.status)}</p>
            ) : (
                <p>Nessuna risposta fornita</p>
            )}
            </div>
        );
        })}
    <CtaButton type='button' label='Torna alla Home' className='ctaB'/>
    </div>
);
};

// Pagina che simula le risposte
const ResultPage: React.FC = () => {
const [responses, setResponses] = useState<
{ q: string; a: string; status: 'correct' | 'incorrect' | 'average' }[]
>([]);

useEffect(() => {
    // Simula risposte dopo che il componente è montato
    const simulatedResponses = simulateResponses(mockQuestions);
    setResponses(simulatedResponses);
}, []);

return (
    <Answer
    role="Junior Front-End Developer"
    feedbackMessage="Questo è un feedback generico sulla tua performance."
    responses={responses}
    />
);
};

export default ResultPage;

