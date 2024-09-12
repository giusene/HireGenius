// COMPONENTS
import Input from "@/components/Atoms/Input/Input";
import Label from "@/components/Atoms/Label/Label";


// STYLE
import style from "./InputBox.module.scss";

interface InputBoxProps {
	type: string;
	name: string;
	label: string;
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

const InputBox = (props: InputBoxProps) => {
	const { type, name, label, value, onChange, required } = props;

	return (
		<>
			<div className={style.inputBox}>
				<Label label={label} name={name} />
				<Input type={type} name={name} placeholder={label} value={value} onChange={onChange} required={required} />
			</div>
		</>
	);
};

export default InputBox;
