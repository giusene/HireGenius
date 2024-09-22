import { useState, useEffect } from "react";
import withAuth from "@/middleware/withAuth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

import style from "@/pages/storic-profile/storic-profile.module.scss";
import Image from "next/image";

import QuizCard from "@/components/Molecules/QuizCard/QuizCard";
import userAvatar from "@/../public/icons/avatar-user.png";

import Loading from "@/components/Atoms/Loading/Loading";
import { InterviewSession } from "@/interfaces/interfaces";
import ResultsList from "@/components/Organism/ResultsList/ResultsList";
import Link from "next/link";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";

const UserProfile = () => {
	const { user } = useAuth();
	const [interviewSessions, setInterviewSessions] = useState<InterviewSession[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedInterviewSession, setSelectedInterviewSession] = useState<InterviewSession | null>(null);

	const fetchData = async () => {
		setIsLoading(true);
		if (user) {
			try {
				const userDocRef = doc(db, "users", user.uid);
				const userDoc = await getDoc(userDocRef);

				if (userDoc.exists()) {
					const userData = userDoc.data();
					if (userData.interviewSessions) {
						const sortedInterviewSessions = userData.interviewSessions.sort((a: InterviewSession, b: InterviewSession) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime());
						setInterviewSessions(sortedInterviewSessions);
					} else {
						console.log("Nessuna sessione di intervista trovata.");
					}
				}
			} catch (error) {
				console.error("Errore durante il recupero dei dati:", error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleDeleteSession = (sessionId: string) => {
		// Filtra la sessione eliminata
		const updatedSessions = interviewSessions.filter((session) => session.sessionId !== sessionId);
		setInterviewSessions(updatedSessions);
	};

	useEffect(() => {
		if (user) {
			fetchData();
		}
	}, [user]);

	if (isLoading) {
		return <Loading />;
	}

	if (user)
		return (
			<main className={style.main}>
				<div className={style.container}>
					{!selectedInterviewSession ? (
						<>
							{/* <header className={style.header}>
								<h2 className={style.sectionTitle}>Profilo</h2>
							</header> */}

							<header className={style.header}>
								<div className={style.userInfo}>
									<div>
										<h4>
											<span>{user.displayName}</span>
										</h4>
										<h4>
											<span>{user.email}</span>
										</h4>
									</div>
									<Image src={userAvatar} alt='Profile avatar' width={50} height={50} />
								</div>
								<h2>Le tue statistiche</h2>
							</header>

							<ul className={style.cardsList}>
								{interviewSessions.map((interviewSession, index) => (
									<li key={index}>
										<QuizCard interviewSession={interviewSession} onDelete={handleDeleteSession} setSelectedInterviewSession={setSelectedInterviewSession} />
									</li>
								))}
							</ul>
						</>
					) : (
						<>
							<ResultsList evaluationResult={selectedInterviewSession.evaluationResult} interviewDetails={selectedInterviewSession.interviewDetails} />
						</>
					)}
				</div>
				{selectedInterviewSession ? (
					<Link href={"/storic-profile"} className={style.linkBtn}>
						<CtaButton label='Torna al profilo' className='ctaC' onClick={() => setSelectedInterviewSession(null)} />
					</Link>
				) : null}
			</main>
		);
};

export default withAuth(UserProfile);
