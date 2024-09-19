import { TextAreaProps } from "@/interfaces/interfaces";
import style from "./TextArea.module.scss";

const TextArea: React.FC<TextAreaProps> = ({ name, placeholder = "", value, onChange, required = false }) => {
	return <textarea minLength={2} className={style.textarea} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required}></textarea>;
};

export default TextArea;
