// components/TopicBox.tsx
import Image from "next/image";
import Link from "next/link";
import styles from "./TestCard.module.scss";
import { TestCardProps } from "@/interfaces/interfaces";

const TestCard = (props: TestCardProps) => {
	const { cardImage, title, description, href } = props;

	return (
		<Link href={href} className={styles.testCard}>
			<div className={styles.hero}>
				<Image src={cardImage} alt='Topic image' width={282} height={171} priority={true} />
			</div>
			<h3>{title}</h3>
			<p className={styles.gdprText}>{description}</p>
		</Link>
	);
};

export default TestCard;
