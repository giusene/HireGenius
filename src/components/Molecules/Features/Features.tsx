import style from "./Features.module.scss";
import Image from "next/image";
import quiz from "@/../public/hero/quiz.png";
import interview from "@/../public/hero/interviews.png";
import feedback from "@/../public/hero/feedback.png";
import { featureLabels } from "@/constants/indexLabels";
// import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import hr from "@/../public/hero/decorative-hr.png";

const Features = () => {
	return (
		<section id='features' className={style.features}>
			<div className={style.featuresContainer}>
				<div className={style.featuresHeader}>
					<h2>
						Le nostre
						<span className={style.bold}> features</span>
					</h2>
					<p>{featureLabels.description}</p>
				</div>

				<div className={style.featuresRow}>
					<div className={style.featureCard1}>
						<Image src={quiz} alt='Quiz' width={137} height={137} priority={true} />
						<div className={style.featureContent}>
							<h3>{featureLabels.quizPersonalized}</h3>
							<p>{featureLabels.quizBadge}</p>
						</div>
					</div>
					<div className={style.featureCard2}>
						<Image src={interview} alt='Interview' width={137} height={137} priority={true} />
						<div className={style.featureContent}>
							<h3>{featureLabels.simulatedInterviews}</h3>
							<p>{featureLabels.simulatedBadge}</p>
						</div>
					</div>
					<div className={style.featureCard3}>
						<Image src={feedback} alt='Quiz' width={137} height={137} priority={true} />
						<div className={style.featureContent}>
							<h3>{featureLabels.aiFeedback}</h3>
							<p>{featureLabels.aiBadge}</p>
						</div>
					</div>
				</div>

				{/* <CtaButton className='ctaC' label={featureLabels.start} /> */}
			</div>
			<div className={style.hr}>
				<Image src={hr} alt='Decorative horizontal rule' width={995} height={28} priority={true} />
			</div>
		</section>
	);
};

export default Features;
