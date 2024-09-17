// pages/index.tsx

//import StatisticsBox from '../../components/Molecules/StatisticsBox/StatisticsBox';
import TopicBox from "../../components/Molecules/TopicBox/TopicBox";
import InterviewBox from "../../components/Molecules/InterviewBox/InterviewBox";
import styles from "./landing-page.module.scss";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.statisticsSection}>
        <StatisticsBox />
      </div> */}

      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Mettiti alla prova!</h2>
      </div>
      <TopicBox />
      <InterviewBox />
    </div>
  );
};

export default LandingPage;
