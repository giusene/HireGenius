// COMPONENTS
import Input from "@/components/Atoms/Input/Input";
import Label from "@/components/Atoms/Label/Label";

// STYLE
import style from "./InputBox.module.scss";
import { InputBoxProps } from "@/interfaces/interfaces";

const InputBox = (props: InputBoxProps) => {
	const { type, name, label, value, onChange, required } = props;

	return (
		<>
			<div className={style.inputBox}>
				<Label label={label} name={name} />
				<Input type={type} name={name} label={label} value={value} onChange={onChange} required={required} />
			</div>
		</>
	);
};

export default InputBox;
