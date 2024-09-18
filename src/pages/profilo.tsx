// src/pages/protected.tsx

import React, { useEffect, useState } from "react";
import withAuth from "../middleware/withAuth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext"; // Assicurati di avere il contesto AuthContext
import Link from "next/link";

const ProtectedPage = () => {
  const { user } = useAuth(); // Ottieni l'utente dal contesto
  const [interviewSessions, setInterviewSessions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Riferimento al documento dell'utente autenticato
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.interviewSessions) {
              setInterviewSessions(userData.interviewSessions);
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

  return (
    <div>
      <h1>Pagina Protetta</h1>
      <p>Solo gli utenti autenticati possono vedere questo contenuto.</p>

      <h2>Sessioni di Intervista:</h2>
      {interviewSessions.length > 0 ? (
        interviewSessions.map((session, index) => (
          <div key={index}>
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

            <h4>Risposte Valutate:</h4>
            {session.evaluationResult.evaluatedResponses.map(
              (
                response: {
                  q:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined;
                  a:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined;
                  answerFeedback:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined;
                  correctAnswer:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined;
                  answerStatus:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<React.AwaitedReactNode>
                    | null
                    | undefined;
                },
                i: React.Key | null | undefined
              ) => (
                <div key={i}>
                  <p>Domanda: {response.q}</p>
                  <p>Risposta: {response.a}</p>
                  <p>Feedback: {response.answerFeedback}</p>
                  <p>Risposta Corretta: {response.correctAnswer}</p>
                  <p>Stato Risposta: {response.answerStatus}</p>
                </div>
              )
            )}
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
