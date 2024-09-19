import withAuth from "@/middleware/withAuth";

//import StatisticsBox from '../../components/Molecules/StatisticsBox/StatisticsBox';
import TestCard from "../../components/Molecules/TestCard/TestCard";
import styles from "./landing-page.module.scss";

import topicImage from "@/../public/new-topic.png";
import interviewImage from "@/../public/new-interview.png";

const LandingPage = () => {
	return (
		<main className={styles.main}>
			{/* <div className={styles.statisticsSection}>
        <StatisticsBox />
      </div> */}

			<header className={styles.header}>
				<h2 className={styles.sectionTitle}>Mettiti alla prova!</h2>
			</header>
			<TestCard href='/topic-process' title='Nuovo argomento' description='Destreggiati in un nuovo argomento, che sia un interrogazione o un semplice quiz.' cardImage={topicImage} />
			<TestCard href='/interview-process' title='Nuovo colloquio' description='Testa la tua preparazione simulando un colloquio tecnico di lavoro.' cardImage={interviewImage} />
		</main>
	);
};

export default withAuth(LandingPage);
