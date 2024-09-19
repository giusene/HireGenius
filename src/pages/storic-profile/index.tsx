import { useState, useEffect } from "react";
import withAuth from "@/middleware/withAuth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

import style from "@/pages/storic-profile/storic-profile.module.scss";
import Image from "next/image";

import QuizCard from "@/components/Atoms/QuizCard/QuizCard";
import userAvatar from "@/../public/icons/avatar-user.png";

import Loading from "@/components/Atoms/Loading/Loading";

interface InterviewSession {
  sessionId: string;
  sessionDate: string;
  interviewDetails: {
    interviewer: {
      name: string;
    };
    topic: string;
  };
  evaluationResult: {
    globalEvaluation: {
      points: number;
      outOf: number;
      feedback: string;
    };
    evaluatedResponses: EvaluatedResponse[];
  };
}

interface EvaluatedResponse {
  q: string;
  a: string;
  answerFeedback: string;
  correctAnswer: string;
  answerStatus: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const [interviewSessions, setInterviewSessions] = useState<
    InterviewSession[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.interviewSessions) {
            const sortedInterviewSessions = userData.interviewSessions.sort(
              (a: InterviewSession, b: InterviewSession) =>
                new Date(b.sessionDate).getTime() -
                new Date(a.sessionDate).getTime()
            );
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
    const updatedSessions = interviewSessions.filter(
      (session) => session.sessionId !== sessionId
    );
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
        <header className={style.header}>
          <h2 className={style.sectionTitle}>Profilo</h2>
        </header>

        <div className={style.userInfo}>
          <Image src={userAvatar} alt="Profile avatar" width={90} height={90} />
          <div>
            <h3>
              Username: <span>{user.displayName}</span>
            </h3>
            <h3>
              Email: <span>{user.email}</span>
            </h3>
          </div>
        </div>

        <hr />
        <h2>Le tue statistiche</h2>

        <ul className={style.cardsList}>
          {interviewSessions.map((interview, index) => (
            <li key={index}>
              <QuizCard
                date={interview.sessionDate}
                topic={interview.interviewDetails.topic}
                score={interview.evaluationResult.globalEvaluation.points}
                interviewer={interview.interviewDetails.interviewer.name}
                message={interview.evaluationResult.globalEvaluation.feedback}
                sessionId={interview.sessionId}
                onDelete={handleDeleteSession}
              />
            </li>
          ))}
        </ul>
      </main>
    );
};

export default withAuth(UserProfile);
