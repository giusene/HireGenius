import { introLabels } from "@/constants/indexLabels";
import style from "./Intro.module.scss";
import InterviewerBadge from "@/components/Atoms/InterviewerBadge/InterviewerBadge";



const Intro = () => {
    return (
        <section className={style.hero}>
            <div className={style.introContent}>
                <h1>{introLabels.title}</h1>
                <p>{introLabels.description}</p>
            </div>
        </section>
    )
}

export default Intro;