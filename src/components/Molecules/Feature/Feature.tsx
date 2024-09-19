import InterviewerBadge from "@/components/Atoms/InterviewerBadge/InterviewerBadge";
import style from "./Feature.module.scss";
import Image from "next/image";
import quiz from "@/../public/icons/new-topic.png"
import interview from "@/../public/icons/new-interview.png";
import ai from "@/../public/hero.png"
import {featureLabels} from "@/constants/indexLabels";

const Features = () => {
  return (
    <section id="features" className={style.features}>
      <div className={style.featuresGrid}>
        <div className={style.featureGridContent}>
      <div className={style.featureImg}>
        <div className={style.image}>
      <Image
          className="featureImg"
          src={quiz}
          alt="Quiz"
          width={400}
          height={200}
          priority={true}
        />
        </div>
        </div>
        
        <div className={style.featureText}>
        <div className={style.texts}>
      <InterviewerBadge
                label={featureLabels.quizPersonalized}
                className="personalizedQuiz"
              />
          <p>{featureLabels.quizBadge}</p>
        </div>
        </div>
        </div>
          
        
  
        <div className={style.featureGridContent}>
        <div className={style.featureText}>
        <div className={style.texts}>
        <InterviewerBadge
                label={featureLabels.simulatedInterviews}
                className="simulatedInterviews"
              />
          <p>{featureLabels.simulatedBadge}</p>
        </div>
        </div>
        <div className={style.featureImg}>
        <div className={style.image}>
        <Image
          className="featureImg"
          src={interview}
          alt="Quiz"
          width={400}
          height={200}
          priority={true}
        />
        </div>
        </div>
        </div>


        <div className={style.featureGridContent}>
      <div className={style.featureImg}>
        <div className={style.image}>
      <Image
          className="featureImg"
          src={ai}
          alt="AI"
          width={400}
          height={200}
          priority={true}
        />
        </div>
        </div>
        
        <div className={style.featureText}>
        <div className={style.texts}>
      <InterviewerBadge
                label={featureLabels.aiFeedback}
                className="aiPoweredFeedback"
              />
          <p>{featureLabels.aiBadge}</p>
        </div>
        </div>
        </div>
        </div>
    </section>
  );
};

export default Features;