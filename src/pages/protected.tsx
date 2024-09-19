//Esempio per usare la funzione deleteInterviewSession

import React, { useEffect, useState } from "react";
import withAuth from "../middleware/withAuth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { deleteInterviewSession } from "@/utils/deleteInterviewSession";

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

const ProtectedPage = () => {
  const { user } = useAuth();
  const [interviewSessions, setInterviewSessions] = useState<
    InterviewSession[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.interviewSessions) {
              setInterviewSessions(
                userData.interviewSessions as InterviewSession[]
              );
            } else {
              console.log("Nessuna sessione di intervista trovata.");
            }
          }
        } catch (error) {
          console.error("Errore durante il recupero dei dati:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (sessionId: string) => {
    if (user) {
      try {
        await deleteInterviewSession(user.uid, sessionId);
        setInterviewSessions(
          interviewSessions.filter((session) => session.sessionId !== sessionId)
        );
      } catch (error) {
        console.error("Errore durante l'eliminazione della sessione:", error);
      }
    }
  };

  return (
    <div>
      <h1>Pagina Protetta</h1>
      <p>Solo gli utenti autenticati possono vedere questo contenuto.</p>

      <h2>Sessioni di Intervista:</h2>
      {interviewSessions.length > 0 ? (
        interviewSessions.map((session, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3>Sessione ID: {session.sessionId}</h3>
            <p>Data: {new Date(session.sessionDate).toLocaleString()}</p>
            <h4>Dettagli Intervista</h4>
            <p>Intervistatore: {session.interviewDetails.interviewer.name}</p>
            <p>Topic: {session.interviewDetails.topic}</p>
            <h4>Risultato Valutazione</h4>
            <p>
              Punti: {session.evaluationResult.globalEvaluation.points} su{" "}
              {session.evaluationResult.globalEvaluation.outOf}
            </p>
            <p>
              Feedback: {session.evaluationResult.globalEvaluation.feedback}
            </p>

            <button onClick={() => handleDelete(session.sessionId)}>
              Rimuovi
            </button>
          </div>
        ))
      ) : (
        <p>Nessuna sessione disponibile.</p>
      )}

      <Link href="/logout">
        <button>Logout</button>
      </Link>
    </div>
  );
};

export default withAuth(ProtectedPage);
