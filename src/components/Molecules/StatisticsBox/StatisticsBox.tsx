import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./StatisticsBox.module.scss";
import rocketImage from "@/../public/rocket.png";

const StatisticsBox = () => {
  const [correct, setCorrect] = useState<number>(0);
  const [improvable, setImprovable] = useState<number>(0);
  const [error, setError] = useState<number>(0);

  useEffect(() => {
    const quizResults = getQuizResults();
    if (quizResults) {
      setCorrect(quizResults.correct || 0);
      setImprovable(quizResults.improvable || 0);
      setError(quizResults.error || 0);
    }
  }, []);

  return (
    <Link href="/">
      <div className={styles.box}>
        <div className={styles.heroBox}>
          <div className={styles.hero}>
            <Image
              src={rocketImage}
              alt="Topic image"
              width={150}
              height={150}
              priority={true}
            />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.statistics}>
              <h3>Le tue statistiche</h3>

              <div className={styles.progress}>
                <span>Corrette</span>
                <div className={styles["progress-bar"]}>
                  <div
                    className={`${styles["progress-bar-inner"]} ${styles["progress-bar-correct"]}`}
                    style={{ width: `${correct > 0 ? correct : 1}%` }}
                  ></div>
                </div>
              </div>

              <div className={styles.progress}>
                <span>Migliorabili</span>
                <div className={styles["progress-bar"]}>
                  <div
                    className={`${styles["progress-bar-inner"]} ${styles["progress-bar-improvable"]}`}
                    style={{ width: `${improvable > 0 ? improvable : 1}%` }}
                  ></div>
                </div>
              </div>

              <div className={styles.progress}>
                <span>Errori</span>
                <div className={styles["progress-bar"]}>
                  <div
                    className={`${styles["progress-bar-inner"]} ${styles["progress-bar-errors"]}`}
                    style={{ width: `${error > 0 ? error : 1}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div> </div>

          <h3>La tua ultima simulazione</h3>
          <p className={styles.gdprText}>
            Qui vedrai lo storico con i risultati dei quiz già effettuati.
          </p>
        </div>
      
    </Link>
  );
};

function getQuizResults() {
  const storedResults = localStorage.getItem("quizResults");
  if (storedResults) {
    return JSON.parse(storedResults);
  } else {
    return {
      correct: 0,
      improvable: 0,
      error: 0,
    };
  }
}

export default StatisticsBox;
