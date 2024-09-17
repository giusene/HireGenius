// components/InterviewBox.tsx
import Image from "next/image";
import Link from "next/link";
import styles from "./InterviewBox.module.scss";
import interviewImage from "@/../public/new-interview.png";

const InterviewBox = () => {
  return (
    <Link href="/">
      <div className={styles.box}>
        <div className={styles.hero}>
          <Image
            src={interviewImage}
            alt="Topic image"
            width={400}
            height={200}
            priority={true}
          />
        </div>
        <h3>Nuovo colloquio</h3>
        <p className={styles.gdprText}>
          Testa la tua preparazione simulando un colloquio tecnico di lavoro.
        </p>
      </div>
    </Link>
  );
};

export default InterviewBox;
