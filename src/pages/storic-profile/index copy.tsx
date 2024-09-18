import { useState, useEffect } from "react";
import style from "@/pages/storic-profile/storic-profile.module.scss";
import Image from "next/image";
import Rocket from "@/../public/icons/rocket.png";
import QuizCard from "@/components/Atoms/QuizCard/QuizCard";
import userAvatar from "@/../public/icons/avatar-user.png";

interface User {
	username: string;
	email: string;
}

interface QuizHistoryItem {
	date: string;
	topic: string;
	score: number;
	interviewer: string;
	message: string;
}

// Simulazione della chiamata API per i dati dell'utente
const fetchUserFromAPI = async (): Promise<User> => {
	return new Promise((resolve) => setTimeout(() => resolve({ username: "MarioRossi", email: "mario.rossi@example.com" }), 1000));
};

// Simulazione chiamata API per i dati del colloquio
const fetchQuizHistory = async (): Promise<QuizHistoryItem[]> => {
	return new Promise((resolve) =>
		setTimeout(
			() =>
				resolve([
					{
						date: "2024-09-10",
						topic: "Front-End Developer",
						score: Math.floor(Math.random() * 101),
						interviewer: "Giulia",
						message:
							Math.floor(Math.random() * 101) >= 60
								? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance."
								: "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!",
					},
					{
						date: "2024-08-22",
						topic: "Back-End Developer",
						score: Math.floor(Math.random() * 101),
						interviewer: "Marco",
						message:
							Math.floor(Math.random() * 101) >= 60
								? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance."
								: "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!",
					},
					{
						date: "2024-07-15",
						topic: "Graphic Designer",
						score: Math.floor(Math.random() * 101),
						interviewer: "Alessandro",
						message:
							Math.floor(Math.random() * 101) >= 60
								? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance."
								: "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!",
					},
					{
						date: "2024-07-15",
						topic: "Graphic Designer",
						score: Math.floor(Math.random() * 101),
						interviewer: "Luca",
						message:
							Math.floor(Math.random() * 101) >= 60
								? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance."
								: "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!",
					},
					{
						date: "2024-07-15",
						topic: "Graphic Designer",
						score: Math.floor(Math.random() * 101),
						interviewer: "Ivan",
						message:
							Math.floor(Math.random() * 101) >= 60
								? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance."
								: "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!",
					},
					{
						date: "2024-07-15",
						topic: "Graphic Designer",
						score: Math.floor(Math.random() * 101),
						interviewer: "Elena",
						message:
							Math.floor(Math.random() * 101) >= 60
								? "Hai dimostrato buone conoscenze di JavaScript, React e CSS. C'è margine di miglioramento nella precisione e completezza di alcune risposte, ma nel complesso hai fornito un'ottima performance."
								: "Non hai dimostrato buone conoscenze su argomenti come JavaScript, React e CSS. Ti invito a ripassare gli argomenti e a riprovare il colloquio!",
					},
				]),
			1000
		)
	);
};

const UserProfile: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	// const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

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

	// const handleCardClick = (index: number) => {
	// 	setSelectedCardIndex(selectedCardIndex === index ? null : index); // Toggle la selezione
	// };

	if (isLoading) {
		return (
			<div className={style.loadingScreen}>
				<div className={style.spaceship}>
					<Image src={Rocket} alt='Loading' width={80} height={80} priority={true} />
				</div>
			</div>
		);
	}

	if (user)
		return (
			<main className={style.main}>
				<header className={style.header}>
					<h2 className={style.sectionTitle}>Profilo</h2>
				</header>

				<div className={style.userInfo}>
					<Image src={userAvatar} alt='Profile avatar' width={90} height={90} />
					<div>
						<h3>
							Username: <span>{user.username}</span>
						</h3>
						<h3>
							Email: <span>{user.email}</span>
						</h3>
					</div>
				</div>

				<hr />
				<h2>Le tue statistiche</h2>

				<ul className={style.cardsList}>
					{quizHistory.map((quiz, index) => (
						<li key={index}>
							{/* <QuizCard date={quiz.date} topic={quiz.topic} score={quiz.score} interviewer={quiz.interviewer} onClick={() => handleCardClick(index)} isSelected={selectedCardIndex === index} /> */}
							<QuizCard date={quiz.date} topic={quiz.topic} score={quiz.score} interviewer={quiz.interviewer} message={quiz.message} />
						</li>
					))}
				</ul>
				{/* {selectedCardIndex !== null && (
					<div className={style.modal}>
						<div className={style.modalContent}>
							<p>{quizHistory[selectedCardIndex]?.message}</p>
							<button onClick={() => setSelectedCardIndex(null)}>Chiudi</button>
						</div>
					</div>
				)} */}
			</main>
		);
};

export default UserProfile;
