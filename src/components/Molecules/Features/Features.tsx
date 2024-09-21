import InterviewerBadge from "@/components/Atoms/InterviewerBadge/InterviewerBadge";
import style from "./Features.module.scss";
import Image from "next/image";
import quiz from "@/../public/icons/new-topic.png";
import interview from "@/../public/icons/new-interview.png";
import hero from "@/../public/hero/hero.png";
import { featureLabels } from "@/constants/indexLabels";

const Features = () => {
	return (
		<section id='features' className={style.features}>
			<div className={style.featuresGrid}>
				<div className={style.featureGridContent}>
					<div className={style.featureImg}>
						<div className={style.image}>
							<Image className='featureImg' src={quiz} alt='Quiz' width={400} height={200} priority={true} />
						</div>
					</div>

					<div className={style.featureText}>
						<div className={style.texts}>
							<InterviewerBadge label={featureLabels.quizPersonalized} className='personalizedQuiz' />
							<p>{featureLabels.quizBadge}</p>
						</div>
					</div>
				</div>

				<div className={style.featureGridContent}>
					<div className={style.featureText}>
						<div className={style.texts}>
							<InterviewerBadge label={featureLabels.simulatedInterviews} className='simulatedInterviews' />
							<p>{featureLabels.simulatedBadge}</p>
						</div>
					</div>
					<div className={style.featureImg}>
						<div className={style.image}>
							<Image className='featureImg' src={interview} alt='Quiz' width={400} height={200} priority={true} />
						</div>
					</div>
				</div>

				<div className={style.featureGridContent}>
					<div className={style.featureImg}>
						<div className={style.image}>
							<Image className='featureImg' src={hero} alt='AI' width={400} height={200} priority={true} />
						</div>
					</div>

					<div className={style.featureText}>
						<div className={style.texts}>
							<InterviewerBadge label={featureLabels.aiFeedback} className='aiPoweredFeedback' />
							<p>{featureLabels.aiBadge}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Features;

// // Le nostre features:
// Affronta test e colloqui con sicurezza grazie a un sistema completo che ti offre esperienze di apprendimento personalizzate, simulate e arricchite da suggerimenti intelligenti. Sviluppa le tue abilità in modo mirato e efficace!

// Quiz Personalizzati
//  Sviluppa le tue competenze con quiz su misura, progettati per adattarsi ai tuoi interessi e al tuo livello di preparazione.

// Interviste Simulate
//  Esercitati con colloqui realistici e ricevi feedback immediati per migliorare la tua performance e aumentare la tua sicurezza.

// Suggerimenti Potenziati dall'AI
// Ottieni feedback dettagliati e suggerimenti pratici grazie all'intelligenza artificiale, per affinare ulteriormente le tue abilità.
