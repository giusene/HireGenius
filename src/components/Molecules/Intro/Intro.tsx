import { introLabels } from "@/constants/labels";
import style from "./Intro.module.scss";



const Intro = () => {
    return (
        <section className={style.hero}>
            <div className={style.introContent}>
            <p>{introLabels.description}</p>
            </div>
        </section>
    )
}

export default Intro;