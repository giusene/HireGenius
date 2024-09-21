// COMPONENTS =================================================================//

// Label
export interface LabelProps {
  label: string;
  name: string;
}

// InputBox
export interface InputBoxProps {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

// SelectBox
export interface OptionsInterface {
  label: string;
  value: string;
}

export interface SelectBoxProps {
  name: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: Array<OptionsInterface>;
}

// TestCard
export interface TestCardProps {
  cardImage: StaticImageData;
  title: string;
  description: string;
  href: string;
}

// TextArea
export interface TextAreaProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

// TextAreaBox
export interface TextAreaBoxProps {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

// Loading
export interface LoadingProps {
  lazyLoading?: boolean;
}

// NewTopic
export interface TopicFormProps {
  onSubmit: (details: { topic: string; level: string; numQuestions: string }) => void;
}

// InterviewersBadge
export interface InterviewerBadgeProps {
  label: string;
  className: string;
}

// ChooseInterviewer
import { profiles } from "@/constants/interviewersProfiles";
export interface ChooseInterviewerProps {
  onInterviewerSelect: (selectedInterviewer: (typeof profiles)[0]) => void;
}

// ProgressBar
export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

// QuestionCard start

interface Question {
  questionText: string;
}

export interface QuestionCardProps {
  role: string;
  totalQuestions: number;
  questions: Question[];
  onComplete: (responses: { q: string; a: string }[]) => void;
}

// QuestionCard end

// ResultCard
export interface ResultCardProps {
  index: number;
  response: EvaluatedResponse;
}

//  ResultsList start

export interface EvaluationResult {
  globalEvaluation: GlobalEvaluation;
  evaluatedResponses: EvaluatedResponse[];
}

interface EvaluatedResponse {
  q: string;
  a: string;
  correctAnswer: string;
  answerStatus: "correct" | "average" | "incorrect";
  answerFeedback: string;
}

interface GlobalEvaluation {
  outOf: number;
  points: number;
  feedback: string;
}

export interface ResultsListProps {
  evaluationResult: EvaluationResult;
  interviewDetails: InterviewDetails;
}
export interface ResultsListErrorProps {
  evaluateAnswers: () => Promise<void>;
  interviewDetails: InterviewDetails;
}

export interface InterviewSession {
  sessionId: string;
  sessionDate: string;
  interviewDetails: InterviewDetails;
  evaluationResult: EvaluationResult;
}

//  ResultsList end

// PAGES =================================================================//

// topic-process start

import { StaticImageData } from "next/image";
export interface QuizResponse {
  q: string;
  a: string;
}

export interface InterviewOptions {
  topic: string;
  level: string;
  numQuestions: string;
}

export interface InterviewDetails {
  topic: string;
  level: string;
  numQuestions: string;
  interviewer: Interviewer;
}

export interface Interviewer {
  avatarSrc: StaticImageData;
  name: string;
  value: string;
  shortBio: string;
  longBio: string;
  level: string;
  className: string;
}

export interface GeneratedQuestion {
  questionText: string;
}

// topic-process end

// interview-process

// API =================================================================//

// UTILS =================================================================//
