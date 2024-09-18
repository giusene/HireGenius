import style from "./Hero.module.scss";
import { heroLabels } from "@/constants/indexLabels";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import heroImg from "@/../public/hero.png";
import Image from "next/image";
import { useRouter } from "next/router";
const Hero = () => {
  const router = useRouter();

  const handleButton = () => {
    router.push("/login");
  };

  return (
    <>
      <section className={style.hero}>
        <Image
          className={style.heroImg}
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
            className={style.button}
            label="Comincia adesso!"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
