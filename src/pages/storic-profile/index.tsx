import { useState, useEffect } from "react";
import style from "@/pages/storic-profile/storic-profile.module.scss";
import Image, { StaticImageData } from "next/image";
import Giulia from "../../../public/avatar1.png";
import Alessandro from "../../../public/avatar2.png";
import Marco from "../../../public/avatar3.png";
import Luca from "../../../public/avatar4.png";
import Ivan from "../../../public/avatar2.png";
import Elena from "../../../public/avatar1.png";
import Rocket from "../../../public/icons/rocket.png";
import Cup from "../../../public/icons/trophy.png";
import Silver from "../../../public/icons/silver-medal.png";
import Bronze from "../../../public/icons/bronze-medal.png";
import Lose from "../../../public/icons/no.png";

interface QuizCardProps {
    date: string;
    topic: string;
    score: number;
    interviewer: string;
    onClick: () => void;
    isSelected: boolean;
    }
    
    const QuizCard: React.FC<QuizCardProps> = ({ date, topic, score, interviewer, onClick, isSelected }) => {
    let iconSrc = null;
    let avatarSrc = null;
    // {avatarSrc && (
    //     <div className={style.avatarContainer}>
    //         <Image
    //             src={avatarSrc}
    //             alt={`${interviewer} avatar`}
    //             className={style.avatarImage}
    //             width={50}
    //             height={50}
    //         />
    //     </div>
    // )}

    const avatarMap: Record<string, StaticImageData> = {
        Giulia: Giulia,
        Marco: Marco,
        Alessandro: Alessandro,
        Elena: Elena,
        Ivan: Ivan,
        Luca: Luca,
        };
    
        if (avatarMap[interviewer]) {
            avatarSrc = avatarMap[interviewer];
        }

        const iconMap: Record<string, StaticImageData> = {
            cup: Cup,
            silver: Silver,
            bronze: Bronze,
            lose: Lose,
        };

    if (score >= 85) {
        iconSrc = iconMap.cup; 
    } else if (score >= 65) {
        iconSrc = iconMap.silver; 
    }  else if (score >= 50) {
        iconSrc = iconMap.bronze; 
    }  
    else {
        iconSrc = iconMap.lose;
    }

    return (
        <div className={`${style.quizCard} ${isSelected ? style.selectedCard : ""}`} onClick={onClick}>
        {avatarSrc && <Image src={avatarSrc} alt={`${interviewer} avatar`} width={50} height={50} />}
        <div className={style.content}>
        <p><strong>Data:</strong> {date}</p>
        <p><strong>Argomento:</strong> {topic}</p>
        <p className={style.rating}>
        <strong>Voto:</strong> {score}/100
        {iconSrc && <Image src={iconSrc} className={style.icon} alt="Trophy Icon" width={24} height={24} />}
        </p>
        </div>
    </div>
    );
    };

interface User {
username: string;
email: string;
}

interface QuizHistoryItem {
date: string;
topic: string;
score: number;
interviewer: string;
message?: string;
}

// Simulazione della chiamata API per i dati dell'utente
const fetchUserFromAPI = async (): Promise<User> => {
return new Promise((resolve) =>
    setTimeout(() => resolve({ username: "MarioRossi", email: "mario.rossi@example.com" }), 1000)
);
};

// Simulazione chiamata API per i dati del colloquio
const fetchQuizHistory = async (): Promise<QuizHistoryItem[]> => {
return new Promise((resolve) =>
    setTimeout(() => resolve([
    {
        date: "2024-09-10",
        topic: "Front-End Developer",
        score: Math.floor(Math.random() * 101),
        interviewer: "Giulia",
        message: Math.floor(Math.random() * 101) >= 60 
        ? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance." 
        : "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!"
    },
    {
        date: "2024-08-22",
        topic: "Back-End Developer",
        score: Math.floor(Math.random() * 101),
        interviewer: "Marco",
        message: Math.floor(Math.random() * 101) >= 60 
        ? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance." 
        : "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!"
    },
    {
        date: "2024-07-15",
        topic: "Graphic Designer",
        score: Math.floor(Math.random() * 101),
        interviewer: "Alessandro",
        message: Math.floor(Math.random() * 101) >= 60 
        ? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance." 
        : "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!"
    },
    {
        date: "2024-07-15",
        topic: "Graphic Designer",
        score: Math.floor(Math.random() * 101),
        interviewer: "Luca",
        message: Math.floor(Math.random() * 101) >= 60 
        ? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance." 
        : "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!"
    },
    {
        date: "2024-07-15",
        topic: "Graphic Designer",
        score: Math.floor(Math.random() * 101),
        interviewer: "Ivan",
        message: Math.floor(Math.random() * 101) >= 60 
        ? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance." 
        : "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!"
    },
    {
        date: "2024-07-15",
        topic: "Graphic Designer",
        score: Math.floor(Math.random() * 101),
        interviewer: "Elena",
        message: Math.floor(Math.random() * 101) >= 60 
        ? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance." 
        : "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!"
    },
    ]), 1000)
);
};

const UserProfile: React.FC = () => {
const [user, setUser] = useState<User | null>(null); 
const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);
const [isLoading, setIsLoading] = useState(true); 
const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  // Carichiamo i dati dell'utente e dei quiz simulando chiamate API
useEffect(() => {
    const fetchData = async () => {
    const userData = await fetchUserFromAPI(); // Chiamata simulata per i dati dell'utente
    const quizData = await fetchQuizHistory(); // Chiamata simulata per i dati dei quiz
    setUser(userData);
    setQuizHistory(quizData);
    setIsLoading(false);
    };
    fetchData();
}, []);

const handleCardClick = (index: number) => {
    setSelectedCardIndex(selectedCardIndex === index ? null : index); // Toggle la selezione
};

if (isLoading) {
    return (
    <div className={style.loadingScreen}>
        <div className={style.spaceship}> <Image src={Rocket} alt="Loading" width={80} height={80} /></div>
    </div>
    );
}

return (
    <div className={style.storicProfile}>
    <h1>Profilo Utente</h1>
    <div className={style.userInfo}>
        <p>
        <strong>Username:</strong> {user?.username}
        </p>
        <p>
        <strong>Email:</strong> {user?.email}
        </p>
    </div>
    <div className={style.card}>
        <h2>Storico delle Tue Sessioni</h2>
        {quizHistory.map((quiz, index) => (
        <QuizCard
            key={index}
            date={quiz.date}
            topic={quiz.topic}
            score={quiz.score}
            interviewer={quiz.interviewer}
            onClick={() => handleCardClick(index)}
            isSelected={selectedCardIndex === index}
        />
        ))}
    </div>
    {selectedCardIndex !== null && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <p>{quizHistory[selectedCardIndex]?.message}</p>
                        <button onClick={() => setSelectedCardIndex(null)}>Chiudi</button>
    </div>
                </div>
            )}
            </div>
);
};

export default UserProfile;
