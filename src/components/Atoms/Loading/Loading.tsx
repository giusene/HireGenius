import style from "./Loading.module.scss";
import Image from "next/image";
import Rocket from "@/../public/icons/rocket.png";
import { useEffect, useState } from "react";
import { LoadingProps } from "@/interfaces/interfaces";

const Loading = (props: LoadingProps) => {
	const { lazyLoading = false } = props;

	const [loadingMessage, setLoadingMessage] = useState("Controllando se hai barato...");

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
		const messageInterval = setInterval(() => {
			setLoadingMessage(getRandomLoadingMessage());
		}, 2000);

		return () => {
			clearInterval(messageInterval);
		};
	}, []);

	return (
		<div className={style.loadingScreen}>
			<div className={style.spaceship}>
				<Image src={Rocket} alt='Loading' width={120} height={120} priority={true} />
			</div>
			<p>{lazyLoading === true && loadingMessage}</p>
		</div>
	);
};

export default Loading;
