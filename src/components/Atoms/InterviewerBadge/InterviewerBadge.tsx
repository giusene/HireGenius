import style from "./InterviewerBadge.module.scss";

interface InterviewerBadgeProps {
	label: string;
	className: string;
}

const InterviewerBadge = (props: InterviewerBadgeProps) => {
	const { label, className } = props;

	return <div className={`${style.badge} ${style[className]}`}>{label}</div>;
};

export default InterviewerBadge;
