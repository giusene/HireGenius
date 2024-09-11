import style from "./Label.module.scss";

interface LabelProps {
	label: string;
	name: string;
}

const Label = (props: LabelProps) => {
	const { label, name } = props;

	return (
		<label className={style.label} htmlFor={name}>
			{label}
		</label>
	);
};

export default Label;
