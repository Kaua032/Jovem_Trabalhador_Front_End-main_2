import { ButtonArea } from "./SubmitButtonStyled";

export default function SubmitButton({ onClick, width, title }) {
  return (
    <ButtonArea onClick={onClick} width={width}>
      {title}
    </ButtonArea>
  );
}
