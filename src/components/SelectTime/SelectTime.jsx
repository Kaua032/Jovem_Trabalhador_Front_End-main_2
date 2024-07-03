import { SelectTimeStyled } from "./SelectTimeStyled";

export default function SelectTime({ width, id }) {
  return (
    <SelectTimeStyled width={width}>
      <p>Horário:</p>
      <select name="" id={id}>
        <option value="">Selecione</option>
        <option value="matutino">Matutino</option>
        <option value="vespertino">Vespertino</option>
      </select>
    </SelectTimeStyled>
  );
}
