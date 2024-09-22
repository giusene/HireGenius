import style from "./Hero.module.scss";
import { heroLabels } from "@/constants/indexLabels";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import heroImg from "@/../public/hero/hero.png";

import Image from "next/image";
import { useRouter } from "next/router";

const Hero = () => {
	const router = useRouter();

	const handleButton = () => {
		router.push("/#features");
	};

	return (
		<>
			<section className={style.hero}>
				<div className={style.heroContainer}>
					<div className={style.heroContent}>
						<h1>
							Ti aiuta ad
							<span className={style.wrappedText1}> eccellere</span>
							<br />
							per affrontare <span className={style.wrappedText2}> test e colloqui </span> <br />
							come un professionista
						</h1>
						<p>{heroLabels.subtitle}</p>

						<CtaButton onClick={handleButton} className='ctaA' label='Scopri di più' />
					</div>

					<Image className={style.heroImg} src={heroImg} alt='Hero' width={444} height={585} priority={true} />
				</div>
			</section>
		</>
	);
};

export default Hero;
