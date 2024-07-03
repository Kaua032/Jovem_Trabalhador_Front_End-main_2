import { SelectUFStyle } from "./SelectUFStyled";

export default function SelectUF({ width, id, onChange }) {
  return (
    <SelectUFStyle width={width}>
      <p>UF:</p>
      <select onChange={onChange} name="" id={id}>
        <option value="">Selecione</option>
        <option value="ac">Acre - AC</option>
        <option value="al">Alagoas - AL</option>
        <option value="ap">Amapá - AP</option>
        <option value="am">Amazonas - AM</option>
        <option value="ba">Bahia - BA</option>
        <option value="ce">Ceará - CE</option>
        <option value="df">Destrito Federal - DF</option>
        <option value="es">Espírito Santo - ES</option>
        <option value="go">Goiás - GO</option>
        <option value="ma">Maranhão - MA</option>
        <option value="mt">Mato Grosso - MT</option>
        <option value="ms">Mato Grosso do Sul - MS</option>
        <option value="mg">Minas Gerais - MG</option>
        <option value="pa">Pará - PA</option>
        <option value="pb">Paraíba - PB</option>
        <option value="pr">Paraná - PR</option>
        <option value="pe">Pernambuco - PE</option>
        <option value="pi">Piauí - PI</option>
        <option value="rj">Rio de Janeiro - RJ</option>
        <option value="rn">Rio Grande do Norte - RN</option>
        <option value="rs">Rio Grande do Sul - RS</option>
        <option value="ro">Rondônia - RO</option>
        <option value="rr">Roraima - RR</option>
        <option value="sc">Santa Catarina - SC</option>
        <option value="sp">São Paulo - SP</option>
        <option value="se">Sergipe - SE</option>
        <option value="to">Tocantins - TO</option>
      </select>
    </SelectUFStyle>
  );
}
