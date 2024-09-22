import style from "./ChiSiamo.module.scss";
import Image from "next/image";
import Avatar1 from "@/../public/chi-siamo/bruna.png";
import Avatar2 from "@/../public/chi-siamo/giovanni.png";
import Avatar3 from "@/../public/chi-siamo/chiara.png";
import Avatar4 from "@/../public/chi-siamo/ivan.jpg";
import Avatar5 from "@/../public/chi-siamo/silvia.png";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import Link from "next/link";

const teamMembers = [
	{
		name: "Bruna Alamia",
		role: "Frontend Developer • UX/UI Designer",
		description:
			"Sono un'erbivora e il mio hobby numero 1 è rispettare il pianeta. Imparo velocemente e penso troppo a tempo pieno. Amo curare i dettagli, ma ho anche imparato a lasciare andare le idee. Sono ansiosa di imparare dall’esperienza e dalle persone. Sempre pronta per nuove sfide!",
		avatar: Avatar1,
		linkedin: "https://www.linkedin.com/in/brunaalamia/",
		github: "https://github.com/majinbrum/",
	},

	{
		name: "Chiara Corvitto",
		role: "Front-End Developer",
		description:
			"Dopo un cambio di rotta, mi sono tuffata nel mondo del Front-End Development grazie al Coding Bootcamp di Edgemony. Amo creare esperienze digitali uniche, dove creatività e interattività si incontrano per intrattenere e soddisfare gli utenti. Sempre alla ricerca di nuove sfide!",
		avatar: Avatar3,
		linkedin: "https://www.linkedin.com/in/chiara-corvitto-6bb9252b5/",
		github: "https://github.com/Birdofillome",
	},

	{
		name: "Silvia Melia",
		role: "Software Developer",
		description:
			"Laureata in Filosofia, ho scelto di esplorare il coding e lo sviluppo front-end. Unisco questi mondi grazie alla mia curiosità e voglia di scoprire nuove forme di espressione. Appassionata di politica e dei temi legati ai diritti e alla parità di genere, trovo ispirazione nella natura e tra i miei amati ulivi.",
		avatar: Avatar5,
		linkedin: "https://www.linkedin.com/in/silvia-melia-a58375bb/",
		github: "https://github.com/meliasil",
	},

	{
		name: "Giovanni Raniolo",
		role: "Front-end Developer",
		description:
			"Da produttore musicale e innovatore blockchain, ho portato la mia creatività nel web development. Ho esplorato nuove forme di espressione digitale, creando soluzioni su misura per esperienze interattive e coinvolgenti. Il mio obiettivo è unire arte e tecnologia per spingere i confini del possibile.",
		avatar: Avatar2,
		linkedin: "https://www.linkedin.com/in/gianniraniolo/",
		github: "https://github.com/GiovanniRaniolo",
	},

	{
		name: "Ivan Saltaformaggio",
		role: "Front End Developer",
		description:
			"Trovo la mia realizzazione nella programmazione. Creo esperienze digitali che coinvolgono gli utenti. Fuori dal lavoro, mi dedico alla pittura, ai giochi di ruolo dal vivo (Larp), alle rievocazioni storiche e ai videogames. Sempre alla ricerca di nuove sfide e opportunità di crescita.",
		avatar: Avatar4,
		linkedin: "https://www.linkedin.com/in/ivan-giuseppe-saltaformaggio-03b0a7260/",
		github: "https://github.com/Nikeandros",
	},
];

const linkedinIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={style.icon}>
		<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z'></path>
		<rect x='2' y='9' width='4' height='12'></rect>
		<circle cx='4' cy='4' r='2'></circle>
	</svg>
);

const githubIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={style.icon}>
		<path d='M12 1C5.37 1 0 6.37 0 13c0 5.09 3.29 9.4 7.86 10.94.57.1.78-.24.78-.55 0-.27-.01-1.14-.01-2.07-3.21.59-3.89-1.55-3.89-1.55-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.21 1.77 1.21 1.03 1.76 2.71 1.25 3.37.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.68 0-1.25.44-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.94 10.94 0 0 1 5.73 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.07 0 4.41-2.71 5.38-5.29 5.66.42.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.66.79.55A10.98 10.98 0 0 0 24 13c0-6.63-5.37-12-12-12z'></path>
	</svg>
);

const ChiSiamo = () => {
	return (
		<section id='chi-siamo' className={style.team}>
			<div className={style.teamContainer}>
				<div className={style.teamHeader}>
					<h2>
						Il nostro
						<span className={style.bold}> team</span>
					</h2>
				</div>

				<div className={style.teamRow}>
					{teamMembers.map((member, index) => (
						<div key={index} className={style.memberCard}>
							<div className={style.memberImg}>
								<Image src={member.avatar} alt='Team member picture' width={137} height={137} priority={true} />
							</div>
							<div className={style.memberContent}>
								<h3>{member.name}</h3>
								<p>{member.description}</p>
							</div>
							<div className={style.memberLinks}>
								<a target='_blank' rel='noopener noreferrer' href={member.github}>
									{githubIcon} Github
								</a>
								<a target='_blank' rel='noopener noreferrer' href={member.linkedin}>
									{linkedinIcon} Linkedin
								</a>
							</div>
						</div>
					))}
				</div>
				<Link href={"/login"}>
					<CtaButton className='ctaC' label='Cominciamo!' />
				</Link>
			</div>
		</section>
	);
};

export default ChiSiamo;
