import style from "./TextArea.module.scss";

export interface TextAreaProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  placeholder = "",
  value,
  onChange,
  required = false,
}) => {
  return (
    <textarea
      minLength={2}
      className={style.textarea}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    ></textarea>
  );
};

export default TextArea;
