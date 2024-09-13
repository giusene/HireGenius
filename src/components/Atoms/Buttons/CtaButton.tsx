import style from "./Button.module.scss";

interface ButtonProps {
	label: string;
	className: string;
	onClick?: () => void;
	type?: "submit" | "reset" | "button" | undefined;
}

const CtaButton = (props: ButtonProps) => {
	const { label, className, onClick, type } = props;

	return (
		<>
			<button className={`${style.button} ${style.ctaButton} ${className && style[className]}`} onClick={onClick} type={type}>
				{label}
			</button>
		</>
	);
};

export default CtaButton;
