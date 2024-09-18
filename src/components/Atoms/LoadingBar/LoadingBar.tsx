import { useEffect, useState } from "react";
import styles from "./LoadingBar.module.scss";

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState(
    "Controllando se hai barato..."
  );

  const getRandomLoadingMessage = () => {
    const messages = [
      "Controllando se hai barato...",
      "Esaminiamo con la lente d'ingrandimento...",
      "Consultando la sfera di cristallo...",
      "Le risposte sono in forno, quasi pronte! ",
      "Chiediamo consiglio agli esperti...",
      "Valutazione in corso... incrocia le dita!",
      "Facciamo finta di essere giudici severi...",
      "Abbiamo quasi finito, giusto un sorso di caffè!",
      "Stiamo sommando i punti... serve una calcolatrice?",
    ];
    const randIdx = Math.floor(Math.random() * messages.length);
    return messages[randIdx];
  };

  useEffect(() => {
    const totalDuration = Math.random() * (40 - 20) + 20;
    const interval = (totalDuration * 1000) / 100;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    const messageInterval = setInterval(() => {
      setLoadingMessage(getRandomLoadingMessage());
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.boxContainer}>
        <div className={styles.loader}></div>
        <div className={styles.loadingMessage}>{loadingMessage}</div>
      </div>
    </div>
  );
};

export default LoadingBar;