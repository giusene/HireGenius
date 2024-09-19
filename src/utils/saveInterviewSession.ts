import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { EvaluationResult, InterviewDetails } from "@/interfaces/interfaces";

interface InterviewSession {
	sessionId: string;
	sessionDate: string;
	interviewDetails: InterviewDetails;
	evaluationResult: EvaluationResult;
}

export const saveInterviewSession = async (userId: string, interviewDetails: InterviewDetails, evaluationResult: EvaluationResult): Promise<void> => {
	const sessionId = uuidv4();
	const sessionDate = new Date().toISOString();

	const newSession: InterviewSession = {
		sessionId,
		sessionDate,
		interviewDetails,
		evaluationResult,
	};

	try {
		const userDocRef = doc(db, "users", userId);
		const userDoc = await getDoc(userDocRef);

		if (!userDoc.exists()) {
			throw new Error("Utente non trovato");
		}

		const userData = userDoc.data();

		// Imposta le sessioni come un array vuoto se non esiste il campo
		let updatedInterviewSessions: InterviewSession[] = [];

		if (userData?.interviewSessions && Array.isArray(userData.interviewSessions)) {
			updatedInterviewSessions = [...userData.interviewSessions];
		}

		updatedInterviewSessions.push(newSession);

		await updateDoc(userDocRef, {
			interviewSessions: updatedInterviewSessions,
		});

		console.log("Sessione salvata con successo!");
		console.log("Nuova sessione salvata:", newSession);
	} catch (error) {
		console.error("Errore durante il salvataggio della sessione:", error);
		throw new Error(`Errore durante il salvataggio della sessione: ${error}`);
	}
};
