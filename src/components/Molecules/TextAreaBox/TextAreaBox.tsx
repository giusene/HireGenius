import Label from "@/components/Atoms/Label/Label";
import TextArea from "@/components/Atoms/TextArea/TextArea";
import style from "./TextAreaBox.module.scss";
import { TextAreaBoxProps } from "@/interfaces/interfaces";

const TextAreaBox: React.FC<TextAreaBoxProps> = ({ name, label, placeholder = "", value, onChange, required = false }) => {
	return (
		<div className={style.textAreaBox}>
			<Label label={label} name={name} />
			<TextArea name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} />
		</div>
	);
};

export default TextAreaBox;
