import { LabelProps } from "@/interfaces/interfaces";
import style from "./Label.module.scss";

const Label = (props: LabelProps) => {
	const { label, name } = props;

	return (
		<label className={style.label} htmlFor={name}>
			{label}
		</label>
	);
};

export default Label;
