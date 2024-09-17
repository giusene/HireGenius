// components/TopicBox.tsx
import Image from "next/image";
import Link from "next/link";
import styles from "./TopicBox.module.scss";
import topicImage from "@/../public/new-topic.png";

const TopicBox = () => {
  return (
    <Link href="/topic-process">
      <div className={styles.box}>
        <div className={styles.hero}>
          <Image
            src={topicImage}
            alt="Topic image"
            width={400}
            height={200}
            priority={true}
          />
        </div>
        <h3>Nuovo argomento</h3>
        <p className={styles.gdprText}>
          Destreggiati in un nuovo argomento, che sia un interrogazione o un
          semplice quiz.
        </p>
      </div>
    </Link>
  );
};

export default TopicBox;
