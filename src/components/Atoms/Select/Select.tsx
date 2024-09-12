import { OptionsInterface } from "@/components/Molecules/SelectBox/SelectBox";

// STYLE
import style from "./Select.module.scss";

interface SelectProps {
	name: string;
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	required?: boolean;
	options: Array<OptionsInterface>;
}

const Select = (props: SelectProps) => {
	const { name, value, onChange, required, options } = props;

	return (
		<select className={style.select} name={name} value={value} onChange={onChange} required={required}>
			<option value=''>Seleziona la tua seniority</option>
			{options.map((option) => {
				return <option value={option.value}>{option.label}</option>;
			})}
		</select>
	);
};

export default Select;
