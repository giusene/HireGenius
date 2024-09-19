//da piazzare in pages/topic-process.tsx
import withAuth from "@/middleware/withAuth";
import React, { useState } from "react";
import ChooseInterviewer from "@/components/Organism/ChooseInterviewer/ChooseInterviewer";
import QuestionCard from "@/components/Organism/QuestionCard/QuestionCard";
import ResultsList from "@/components/Organism/ResultsList/ResultsList";

import Loading from "@/components/Atoms/Loading/Loading";
import { GeneratedQuestion, InterviewDetails, Interviewer, InterviewOptions, QuizResponse } from "@/interfaces/interfaces";
import InterviewRequirements from "@/components/Organism/InterviewRequirements/InterviewRequirements";
import NewInterview from "@/components/Organism/NewInterview/NewInterview";

type Step = "newInterview" | "interviewRequirements" | "chooseInterviewer" | "questionCard" | "resultsList";

const InterviewProcess = () => {
	const [interviewOptions, setInterviewOptions] = useState<InterviewOptions | null>(null);
	const [interviewRequirements, setInterviewRequirements] = useState("");
	const [interviewDetails, setInterviewDetails] = useState<InterviewDetails | null>(null);
	const [step, setStep] = useState<Step>("newInterview");
	const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
	const [quizResponses, setQuizResponses] = useState<QuizResponse[] | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	const handleInterviewOptionsSubmit = (interviewOptions: InterviewOptions) => {
		setIsLoading(true);
		setInterviewOptions(interviewOptions);
		setStep("interviewRequirements");
		setIsLoading(false);
	};

	const handleInterviewRequirementsSubmit = (interviewRequirements: string) => {
		setIsLoading(true);
		setInterviewRequirements(interviewRequirements);
		setStep("chooseInterviewer");
		setIsLoading(false);
	};

	const handleInterviewerSelect = async (selectedInterviewer: Interviewer) => {
		setIsLoading(true);

		if (!interviewOptions) {
			return;
		}

		const newInterviewDetails = {
			...interviewOptions,
			interviewRequirements,
			interviewer: selectedInterviewer,
		};
		setInterviewDetails(newInterviewDetails); // Imposta lo stato dell'intervista

		const prompt = `
		  Immagina di essere l'esaminatore ${newInterviewDetails.interviewer.name}. ${newInterviewDetails.interviewer.longBio}.
		  Devi condurre un colloquio tecnico ${newInterviewDetails.level}. I requisiti del colloquio sono i seguenti: ${newInterviewDetails.interviewRequirements}.
		  Ponimi ${newInterviewDetails.numQuestions} domande tecniche sul tema "${newInterviewDetails.topic}", di difficoltà crescente.
		`;

		// Debug del prompt
		console.log("Prompt sent to API:", prompt);
		try {
			const response = await fetch("/api/generate-question", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt }),
			});

			if (!response.ok) {
				throw new Error("Errore nella richiesta al server.");
			}

			const result = await response.json();
			const parsedData = JSON.parse(result);
			setGeneratedQuestions(parsedData);

			setStep("questionCard");
			setIsLoading(false);

			console.log("Questions generated successfully", parsedData);
		} catch (e) {
			setIsLoading(false);

			console.error("Error generating questions", e);
		}
	};

	const handleQuestionsComplete = (quizResponses: QuizResponse[]) => {
		setIsLoading(true);
		if (quizResponses) {
			setQuizResponses(quizResponses);
		}
		setIsLoading(false);

		console.log(quizResponses);
		setStep("resultsList");
	};

	{
		if (isLoading) return <Loading />;
	}

	return (
		<>
			{step === "newInterview" && <NewInterview onSubmit={handleInterviewOptionsSubmit} />}
			{step === "interviewRequirements" && <InterviewRequirements onSubmit={handleInterviewRequirementsSubmit} />}
			{step === "chooseInterviewer" && interviewOptions && <ChooseInterviewer onInterviewerSelect={handleInterviewerSelect} />}
			{step === "questionCard" && interviewDetails && (
				<QuestionCard role={interviewDetails.topic} totalQuestions={generatedQuestions.length} questions={generatedQuestions} onComplete={handleQuestionsComplete} />
			)}
			{quizResponses && interviewDetails && step === "resultsList" && <ResultsList quizResponses={quizResponses} interviewDetails={interviewDetails} />}
		</>
	);
};

export default withAuth(InterviewProcess);
