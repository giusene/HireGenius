import { SelectBoxProps } from "@/components/Molecules/SelectBox/SelectBox";

// STYLE
import style from "./Select.module.scss";

const Select = (props: SelectBoxProps) => {
	const { name, value, onChange, required, options } = props;

	return (
		<select className={style.select} name={name} value={value} onChange={onChange} required={required}>
			<option value=''>Seleziona la tua seniority</option>
			{options.map((option) => {
				return (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				);
			})}
		</select>
	);
};

export default Select;
