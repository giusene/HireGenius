// COMPONENTS
import Select from "@/components/Atoms/Select/Select";
import Label from "@/components/Atoms/Label/Label";

// STYLE
import style from "./SelectBox.module.scss";

import selectIcon from "@/../public/icons/arrow-select.png";
import Image from "next/image";
import { SelectBoxProps } from "@/interfaces/interfaces";

const SelectBox = (props: SelectBoxProps) => {
	const { name, label, value, onChange, required, options } = props;

	return (
		<>
			<div className={style.selectBox}>
				<Label label={label} name={name} />
				<Select name={name} label={label} value={value} onChange={onChange} required={required} options={options} />
				<Image src={selectIcon} alt='Select icon' width={20} height={20} className={style.selectIcon} />
			</div>
		</>
	);
};

export default SelectBox;
