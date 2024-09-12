// COMPONENTS
import Select from "@/components/Atoms/Select/Select";
import Label from "@/components/Atoms/Label/Label";

// STYLE
import style from "./SelectBox.module.scss";

export interface OptionsInterface {
	label: string;
	value: string;
}

interface SelectBoxProps {
	name: string;
	label: string;
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	required?: boolean;
	options: Array<OptionsInterface>;
}

const SelectBox = (props: SelectBoxProps) => {
	const { name, label, value, onChange, required, options } = props;

	return (
		<>
			<div className={style.selectBox}>
				<Label label={label} name={name} />
				<Select name={name} value={value} onChange={onChange} required={required} options={options} />
			</div>
		</>
	);
};

export default SelectBox;
