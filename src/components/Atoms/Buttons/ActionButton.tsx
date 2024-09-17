// STYLE
import Image, { StaticImageData } from "next/image";
import style from "./Button.module.scss";

interface ActionButtonProps {
	onClick?: () => void;
	className?: string;
	label?: string;
	icon?: StaticImageData;
}

const ActionButton = (props: ActionButtonProps) => {
	const { onClick, className, label, icon } = props;
	return (
		<>
			<button onClick={onClick} className={`${style.button} ${style.actionButton} ${className && style[className]}`}>
				{label && label}
				{icon && <Image src={icon} alt='Button icon' width={14} height={14} />}
			</button>
		</>
	);
};

export default ActionButton;
