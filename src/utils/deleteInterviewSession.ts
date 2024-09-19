import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

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

export const deleteInterviewSession = async (
  userId: string,
  sessionId: string
) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const interviewSessions: InterviewSession[] =
        userData.interviewSessions || [];

      // Filtra le sessioni per rimuovere quella specifica
      const updatedSessions = interviewSessions.filter(
        (session) => session.sessionId !== sessionId
      );

      await updateDoc(userDocRef, {
        interviewSessions: updatedSessions,
      });

      console.log("Sessione eliminata con successo!");
    } else {
      console.log("Documento utente non trovato.");
    }
  } catch (error) {
    console.error("Errore durante l'eliminazione della sessione:", error);
    throw new Error(`Errore durante l'eliminazione della sessione: ${error}`);
  }
};
