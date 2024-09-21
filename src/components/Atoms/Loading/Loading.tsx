import style from "./Loading.module.scss";
import { useEffect, useState } from "react";
import { LoadingProps } from "@/interfaces/interfaces";

const Loading = (props: LoadingProps) => {
  const { lazyLoading = false } = props;

  const messages = [
    "Fai un respiro profondo... Stiamo arrivando!",
    "Un momento di calma per l'ispirazione...",
    "Qualche secondo per riflettere...",
    "Pronti a partire... resta sintonizzato!",
    "Siamo in arrivo... non andartene!",
    "Un breve attimo... siamo quasi pronti!",
    "Un po' di pazienza... stiamo per iniziare!",
    "Ci siamo quasi... tutto si sta sistemando!",
    "Una pausa per mettere a fuoco... arriviamo!",
    "Aspettiamo il momento giusto... non andartene!",
    "Attimo di quiete... l'attesa rende tutto speciale!",
  ];

  const [loadingMessage, setLoadingMessage] = useState("");
  const [lastMessageIndex, setLastMessageIndex] = useState(-1);

  const getRandomLoadingMessage = () => {
    // Filtra i messaggi per escludere l'ultimo mostrato
    const availableMessages = messages.filter(
      (_, index) => index !== lastMessageIndex
    );
    const randIdx = Math.floor(Math.random() * availableMessages.length);
    setLastMessageIndex(messages.indexOf(availableMessages[randIdx]));
    return availableMessages[randIdx];
  };

  useEffect(() => {
    if (lazyLoading) {
      const messageInterval = setInterval(() => {
        setLoadingMessage(getRandomLoadingMessage());
      }, 3000);

      return () => {
        clearInterval(messageInterval);
      };
    }
  }, [lazyLoading]);

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
      <p>{lazyLoading && loadingMessage}</p>
    </div>
  );
};

export default Loading;
