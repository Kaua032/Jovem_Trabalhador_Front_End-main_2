import { InputArea } from "./InputStyled";

export default function InputComponent({
  register,
  name,
  width,
  title,
  type,
  plaHolder,
  id,
  value,
  onChange,
}) {
  return (
    <InputArea width={width}>
      <p>{title}</p>
      <input
        value={value}
        id={id}
        type={type}
        placeholder={plaHolder}
        {...(register && register(name))}
        onChange={onChange}
      />
    </InputArea>
  );
}
