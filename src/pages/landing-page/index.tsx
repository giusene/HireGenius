// pages/index.tsx

import StatisticsBox from '../../components/Molecules/StatisticsBox/StatisticsBox';
import TopicBox from '../../components/Molecules/TopicBox/TopicBox';
import InterviewBox from '../../components/Molecules/InterviewBox/InterviewBox';
import styles from './landing-page.module.scss';

const LandingPage = () => {
  return (
    <div className={styles.container}>
       

       <div className={styles.statisticsSection}>
        <StatisticsBox />
      </div>

      <div className={styles.competenceSection}>
        <h2>Testa le tue competenze</h2>
        <TopicBox  />
        <InterviewBox />
      </div>
    </div>
  );
};

export default LandingPage;