import style from "./Button.module.scss";

interface ButtonProps {
	label: string;
	className: string;
	onClick?: () => void;
	type?: "submit" | "reset" | "button" | undefined;
	disabled?: boolean;
}

const CtaButton = (props: ButtonProps) => {
	const { label, className, onClick, type, disabled = false } = props;

	return (
		<>
			<button className={`${style.button} ${style.ctaButton} ${className && style[className]}`} onClick={onClick} type={type} disabled={disabled}>
				{label}
			</button>
		</>
	);
};

export default CtaButton;
