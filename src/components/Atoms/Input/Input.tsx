import style from "./Input.module.scss";

interface InputProps {
	type: string;
	name: string;
	placeholder?: string;
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

const Input = (props: InputProps) => {
	const { type = "text", name, placeholder = "", onChange, value, required = false } = props;

	return (
		<>
			<input className={style.input} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} />
		</>
	);
};

export default Input;
