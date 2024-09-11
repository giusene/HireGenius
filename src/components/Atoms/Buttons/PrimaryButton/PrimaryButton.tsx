import style from "./PrimaryButton.module.scss";

interface ButtonProps {
	label: string;
	className: string;
	onClick?: () => void;
	type?: "submit" | "reset" | "button" | undefined;
}

const PrimaryButton = (props: ButtonProps) => {
	const { label, className, onClick, type } = props;

	return (
		<>
			<button className={`${style.primaryButton} ${style[className]}`} onClick={onClick} type={type}>
				{label}
			</button>
		</>
	);
};

export default PrimaryButton;
