import style from "./choose-interviewer.module.scss";
import { FormEvent, useEffect, useState } from "react";

import Avatar1 from "@/../public/avatar1.png";
import Avatar2 from "@/../public/avatar2.png";
import Avatar3 from "@/../public/avatar3.png";
import Avatar4 from "@/../public/avatar4.png";
import Image from "next/image";
import InterviewerBadge from "@/components/Atoms/InterviewerBadge/InterviewerBadge";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";

const profiles = [
	{
		avatarSrc: Avatar1,
		name: "Giulia",
		value: "giulia",
		shortBio: "Solare ed empatica. Ti farà sentire a tuo agio.",
		longBio:
			"Solare ed empatica, mette gli altri a proprio agio e mantiene un livello semplice e diretto di domande, come: -Puoi parlarmi un po’ di te?- o -Perché ti piacerebbe lavorare qui?-. Si interessa alle motivazioni personali e alle qualità individuali.",
		level: "semplice",
		className: "simple",
	},
	{
		avatarSrc: Avatar2,
		name: "Alessandro",
		value: "alessandro",
		shortBio: "Analitico e diretto. Indagherà come affronti le sfide.",
		longBio:
			"Analitico e diretto, con uno stile di comunicazione chiaro e conciso. Le sue domande, come: -Puoi descrivermi una situazione in cui hai affrontato una difficoltà sul lavoro e come l’hai risolta?- riflettono il desiderio di comprendere come gli altri si confrontano con sfide simili e quale approccio adottano per ottenere risultati concreti.",
		level: "semplice",
		className: "simple",
	},
	{
		avatarSrc: Avatar3,
		name: "Marco",
		value: "marco",
		shortBio: "Determinato ed esigente. Ti metterà alla prova.",
		longBio:
			"Determinato ed esigente. Domande come: -Qual è stato il tuo più grande fallimento e cosa hai imparato da esso?- o -Perché dovremmo scegliere te rispetto agli altri candidati?- mettono alla prova l'interlocutore. Affronta anche temi come la gestione dei conflitti. Domande, come -Come gestisci un conflitto con un collega o con un superiore?-, mostrano la sua attenzione alla risoluzione di problemi efficace.",
		level: "equo",
		className: "moderate",
	},
	{
		avatarSrc: Avatar4,
		name: "Luca",
		value: "luca",
		shortBio: "Proverà a mettere in luce i tuoi punti di forza e le tue fragilità.",
		longBio:
			"Ama mettere alla prova i candidati con domande trabocchetto, come: -Se fossi il mio capo e dovessi valutare questa tua intervista, quale aspetto ritieni sia stato il tuo punto debole?- per testare la capacità di mantenere la calma sotto pressione. Usa queste tecniche per valutare non solo la competenza. È un intervistatore che mira a mettere in luce non solo i punti di forza, ma anche le possibili fragilità.",
		level: "avanzato",
		className: "advanced",
	},
];

const ChooseInterviewer = () => {
	const [interviewer, setInterviewer] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log(interviewer);
	};

	return (
		<main className={style.main}>
			<header className={style.header}>
				<h2 className={style.sectionTitle}>Nuovo argomento</h2>
			</header>

			<form onSubmit={handleSubmit} className={style.interviewerForm}>
				<div className={style.avatarGrid}>
					{profiles.map((profile) => (
						<label key={profile.value} className={`${interviewer === profile.value ? `${style.label} ${style.selected}` : style.label}`} htmlFor={profile.value}>
							<div>
								<div className={style.avatar}>
									<Image className={style.avatarImg} src={profile.avatarSrc} alt={`Avatar ${profile.name}`} width={1000} height={1000} />
								</div>
								<h3 className={style.avatarName}>{profile.name}</h3>
								<p className={style.avatarBio}>{profile.shortBio}</p>
							</div>
							<InterviewerBadge label={profile.level} className={profile.className} />

							<input type='radio' name='interviewer' id={profile.value} value={profile.value} onChange={(e) => setInterviewer(e.target.value)} required={false} className={style.radio} />
						</label>
					))}
				</div>

				<CtaButton label='Cominciamo!' className='ctaA' type='submit' />
			</form>
		</main>
	);
};

export default ChooseInterviewer;
