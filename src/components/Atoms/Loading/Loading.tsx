import style from "./Loading.module.scss";

import { useEffect, useState } from "react";
import { LoadingProps } from "@/interfaces/interfaces";

const Loading = (props: LoadingProps) => {
  const { lazyLoading = false } = props;

  const [loadingMessage, setLoadingMessage] = useState(
    "Controllando se hai barato..."
  );

  const getRandomLoadingMessage = () => {
    const messages = [
      "Controllando se hai barato...",
      "Esaminiamo con la lente d'ingrandimento...",
      "Consultando la sfera di cristallo...",
      "Le risposte sono in forno, quasi pronte!",
      "Chiediamo consiglio agli esperti...",
      "Valutazione in corso... incrocia le dita!",
      "Facciamo finta di essere giudici severi...",
      "Abbiamo quasi finito, giusto un caffè!",
      "Stiamo sommando... serve una calcolatrice?",
    ];
    const randIdx = Math.floor(Math.random() * messages.length);
    return messages[randIdx];
  };

  useEffect(() => {
    if (lazyLoading === true) {
      const messageInterval = setInterval(() => {
        setLoadingMessage(getRandomLoadingMessage());
      }, 3000);

      return () => {
        clearInterval(messageInterval);
      };
    }
  }, []);

  return (
    <div className={style.loadingScreen}>
      <div className={style.box}>
        <div className={style.rocketContainer}>
          <div className={style.tip}></div>
          <div className={style.rocket}></div>
          <div className={style.window}></div>
          <div className={style.dots}></div>
          <div className={style.bum}></div>
          <div className={`${style.wing} ${style.wingOne}`}></div>
          <div className={`${style.wing} ${style.wingTwo}`}></div>
          <div className={style.light}></div>
          <div className={style.light2}></div>
          <div className={style.flame}></div>
          <div className={style.flame2}></div>
        </div>
      </div>
      <p>{lazyLoading === true && loadingMessage}</p>
    </div>
  );
};

export default Loading;
