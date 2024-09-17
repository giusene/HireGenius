import { useState, useEffect } from "react";
import { headLabels, heroLabels, introLabels, teamLabels } from "@/pages/project-page/labels/labels.js";
import Head from "next/head";
import Image from "next/image";
import style from "./project-page.module.scss";
import heroImg from "@/../public/hero.png";
import Avatar1 from "@/../public/avatar1.png";
import Avatar2 from "@/../public/avatar2.png";
import InterviewerBadge from "@/components/Atoms/InterviewerBadge/InterviewerBadge";

const teamMembers = [
	{
		name: "Bruna Alamia",
		role: "La paladina dell'Error Handling",
		description:
			"Bruna è il punto di riferimento per chiunque abbia bisogno di aiuto, sempre pronta a tuffarsi nei task degli altri e risolvere problemi apparentemente insormontabili. Ha un radar per gli errori nel codice: se c'è anche un solo punto e virgola fuori posto, Bruna lo trova in un batter d'occhio. La sua disponibilità e il suo supporto morale sono imprescindibili per il team.",
		avatar: Avatar1,
	},
	{
		name: "Giovanni Raniolo",
		role: "Il Saggio Conquistatore dell'IA",
		description:
			'Giovanni è il supervisore del gruppo, la saggezza fatta persona. Ha un rapporto controverso con la parte AI del progetto, un amore-odio che lo ha portato a passare giornate intere a discutere con algoritmi e modelli, ma alla fine ha sempre la meglio. È il maestro Yoda del progetto: "AI difficoltosa, ma con Giovanni, nessuna paura."',
		avatar: Avatar2,
	},
	{
		name: "Chiara Corvitto",
		role: "La Diligente Meticolosa",
		description:
			"Ogni compito che le viene assegnato è una missione personale da portare a termine con la massima cura. La sua meticolosità è proverbiale e non esiste task che non possa completare prima della deadline, con codice documentato e testato. Chiara è il sogno di ogni project manager.",
		avatar: Avatar1,
	},
	{
		name: "Ivan Saltaformaggio",
		role: "Il Solitario Zen",
		description:
			"Ivan è la calma in persona. Lavora da solo, lontano dal caos e dalle interruzioni, seguendo il suo ritmo zen. Si affida alle sue intuizioni e non si fa mai prendere dal panico. Potresti non sentirlo per ore, ma quando esce dal suo angolino produttivo, ha già risolto metà dei problemi del progetto senza che nessuno se ne accorgesse. Non gli importa delle scadenze imminenti o delle crisi del team: Ivan risolve tutto con la sua tranquilla efficienza.",
		avatar: Avatar2,
	},
	{
		name: "Silvia Melia",
		role: "La Guardiana dei Terminali",
		description:
			"Silvia ha una particolarità che la distingue: non sopporta vedere terminali aperti. Se vede una sessione inutilizzata, la chiude prima che qualcuno possa accorgersene. È una sorta di custode dell’ordine digitale, con un disturbo ossessivo-compulsivo verso i terminali abbandonati. È anche una grande ammiratrice delle abilità di problem-solving dei suoi colleghi. Quando qualcuno risolve un bug complesso, puoi star certo che lei è lì, in un angolo, a osservare, prendendo appunti mentali per migliorare sé stessa.",
		avatar: Avatar1,
	},
	{
		name: "Giuseppe Senettone",
		role: "Il Team Leader Motivante",
		description:
			'Giuseppe è il condottiero del team, colui che, tra un "dobbiamo quagliare" e un "sono soddisfatto", è riuscito a tenere il gruppo unito e motivato anche nei momenti più difficili. La sua forza sta nel comprendere le dinamiche individuali del team e nel riuscire a tirare fuori il meglio da ognuno, con un mix di empatia e determinazione. Grazie alla sua guida, il team è riuscito a "quagliare" davvero, raggiungendo il traguardo finale con successo.',
		avatar: Avatar2,
	},
];

const Project = () => {
	const [blurred, setBlurred] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setBlurred(true);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<Head>
				<title>{headLabels.title}</title>
				<meta name='description' content='Interviewer: Simula test e colloqui per prepararti al meglio' />
			</Head>

			<section className={style.heroSection}>
				<Image className={`${blurred ? style.blurred : ""}`} src={heroImg} fill alt='Hero background' priority={true} />
				<div className={`${style.textOverlay} ${blurred ? style.visible : ""}`}>
					<h1 className={style.title}>{heroLabels.title}</h1>
					<p className={style.motto}>{heroLabels.subtitle}</p>
				</div>
			</section>

			<section className={style.heroIntro}>
				<h1 className={style.heroIntroTitle}>{introLabels.title}</h1>
				<p>{introLabels.description}</p>
			</section>

			<section className={style.teamSection}>
				<h2 className={style.teamTitle}>{teamLabels.title}</h2>
				<div className={style.teamGrid}>
					{teamMembers.map((member, index) => (
						<div key={index} className={style.card}>
							<Image className={style.avatar} src={member.avatar} alt={member.name} width={100} height={100} priority={false} />
							<InterviewerBadge label={member.name} className='teamMembersName' />
							<p className={style.memberRole}>{member.role}</p>
							<p className={style.memberDescription}>{member.description}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default Project;
