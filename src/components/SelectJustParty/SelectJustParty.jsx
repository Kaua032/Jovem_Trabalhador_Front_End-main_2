import { SelectJustPartyStyle } from "./SelectJustPartyStyled";

export default function SelectJustParty({ width, id }) {
  return (
    <SelectJustPartyStyle width={width}>
      <p>Turma:</p>
      <select name="" id={id}>
        <option value="">Selecione</option>
        <option value="3º ano">3º ano</option>
        <option value="2º ano">2º ano</option>
        <option value="1º ano">1º ano</option>
      </select>
    </SelectJustPartyStyle>
  );
}
