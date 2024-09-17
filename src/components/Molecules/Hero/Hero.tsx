import style from "./Hero.module.scss";
import { heroLabels } from "@/pages/project-page/labels/labels";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import heroImg from "@/../public/hero.png";
import Image from "next/image";


 const handleButton = () => {
  console.log("cliccato")
 }


const Hero = () => {
  return (
    <>
    <section className={style.hero}>

    <Image
          className="heroImg"
          src={heroImg}
          alt="Hero"
          width={400}
          height={200}
          priority={true}
        />

      <div className={style.heroContent}>
        <div className={style.heroTitles}>
        <h1>{heroLabels.title}</h1>
        <p>{heroLabels.subtitle}</p>
        </div>
        <CtaButton
        onClick={handleButton}
        className={style.ctaButton}
        label="Comincia adesso!"
        />
      </div>
    </section>
    </>
  );
};

export default Hero;
