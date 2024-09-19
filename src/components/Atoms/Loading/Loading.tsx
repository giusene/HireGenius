import style from "./Loading.module.scss";
import Image from "next/image";
import Rocket from "@/../public/icons/rocket.png";

const Loading = () => {
	return (
		<div className={style.loadingScreen}>
			<div className={style.spaceship}>
				<Image src={Rocket} alt='Loading' width={80} height={80} priority={true} />
			</div>
		</div>
	);
};

export default Loading;
