// components/TopicBox.tsx
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./TestCard.module.scss";

interface TestCardProps {
	cardImage: StaticImageData;
	title: string;
	description: string;
}

const TestCard = (props: TestCardProps) => {
	const { cardImage, title, description } = props;

	return (
		<Link href='/topic-process'>
			<div className={styles.testCard}>
				<div className={styles.hero}>
					<Image src={cardImage} alt='Topic image' width={282} height={171} priority={true} />
				</div>
				<h3>{title}</h3>
				<p className={styles.gdprText}>{description}</p>
			</div>
		</Link>
	);
};

export default TestCard;
