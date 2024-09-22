import Head from "next/head";
import { headLabels } from "@/constants/indexLabels";
import Hero from "@/components/Molecules/Hero/Hero";
import Features from "@/components/Molecules/Features/Features";
import Interviewers from "@/components/Molecules/Interviewers/Interviewers";
import ChiSiamo from "@/components/Molecules/ChiSiamo/ChiSiamo";

export default function Home() {
	return (
		<>
			<Head>
				<title>{headLabels.title}</title>
				<meta name='description' content='Skillup - Enhance your skills with personalized quizzes and interviews.' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<Hero />
				<Features />
				<Interviewers />
				<ChiSiamo />
			</main>
		</>
	);
}
