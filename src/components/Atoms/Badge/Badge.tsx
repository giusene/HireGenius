import Image from "next/image";
import styles from "./Badge.module.scss";

type BadgeProps = {
	avatarSrc: string;
	name: string;
	description: string;
	difficulty: "semplice" | "intermedio" | "difficile";
	onClick: () => void;
};

const Badge: React.FC<BadgeProps> = ({ avatarSrc, name, description, difficulty, onClick }) => {
	return (
		<div className={`${styles.card} ${styles[difficulty]}`} onClick={onClick}>
			<Image src={avatarSrc} alt={name} className={styles.avatar} />
			<div className={styles.info}>
				<h2>{name}</h2>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default Badge;
