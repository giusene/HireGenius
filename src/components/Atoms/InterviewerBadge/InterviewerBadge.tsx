import { InterviewerBadgeProps } from "@/interfaces/interfaces";
import style from "./InterviewerBadge.module.scss";

const InterviewerBadge = (props: InterviewerBadgeProps) => {
	const { label, className } = props;

	return <div className={`${style.badge} ${style[className]}`}>{label}</div>;
};

export default InterviewerBadge;
