import React from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
	currentStep: number;
	totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
	const progressPercentage = (currentStep / totalSteps) * 100;

	return (
		<div className={styles.progressBar}>
			<div className={styles.progress} style={{ width: `${progressPercentage}%` }}></div>
		</div>
	);
};

export default ProgressBar;
