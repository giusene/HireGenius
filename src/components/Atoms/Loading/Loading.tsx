import style from "./Loading.module.scss";
import { useEffect, useState, useRef } from "react";
import { LoadingProps } from "@/interfaces/interfaces";

const Loading = (props: LoadingProps) => {
	const { lazyLoading = false } = props;

	const messages = [
		`    Fai un respiro profondo... Stiamo arrivando!`,
		`    Un momento di calma per l'ispirazione...`,
		`    Qualche secondo per riflettere...`,
		`    Pronti a partire... resta sintonizzato!`,
		`    Siamo in arrivo... non andartene!`,
		`    Un breve attimo... siamo quasi pronti!`,
		`    Un po' di pazienza... stiamo per iniziare!`,
		`    Ci siamo quasi... tutto si sta sistemando!`,
		`    Una pausa per mettere a fuoco... arriviamo!`,
		`    Aspettiamo il momento giusto... non andartene!`,
		`    Attimo di quiete... l'attesa rende tutto speciale!`,
	];

	const [loadingMessage, setLoadingMessage] = useState("");
	const [lastMessageIndex, setLastMessageIndex] = useState(-1);
	const typingInterval = useRef<NodeJS.Timeout | null>(null);

	const getRandomLoadingMessage = () => {
		const availableMessages = messages.filter((_, index) => index !== lastMessageIndex);

		if (availableMessages.length === 0) return ""; // Gestisci il caso in cui non ci siano messaggi disponibili

		const randIdx = Math.floor(Math.random() * availableMessages.length);
		const selectedMessage = availableMessages[randIdx];
		setLastMessageIndex(messages.indexOf(selectedMessage));

		return selectedMessage;
	};

	useEffect(() => {
		if (lazyLoading) {
			const typeMessage = (message: string) => {
				if (!message) return;

				let letterIndex = 0;
				setLoadingMessage(""); // Resetta il messaggio all'inizio

				typingInterval.current = setInterval(() => {
					if (letterIndex < message.length) {
						setLoadingMessage((prev) => prev + message[letterIndex]);
						letterIndex++;
					} else {
						clearInterval(typingInterval.current!);
						setTimeout(() => {
							const nextMessage = getRandomLoadingMessage();
							if (nextMessage) {
								typeMessage(nextMessage); // Inizia a scrivere il nuovo messaggio
							}
						}, 2000); // Pausa prima di cambiare messaggio
					}
				}, 100); // Velocità di scrittura
			};

			const initialMessage = getRandomLoadingMessage();
			if (initialMessage) {
				typeMessage(initialMessage);
			}

			return () => {
				if (typingInterval.current) {
					clearInterval(typingInterval.current);
				}
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
			<p>
				{lazyLoading && loadingMessage.replace(/undefined/g, "")} {/* Rimuove 'undefined' */}
			</p>
		</div>
	);
};

export default Loading;
