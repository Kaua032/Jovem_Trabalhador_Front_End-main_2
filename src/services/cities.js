import axios from "axios";

export function GetAllCitiesFrom(uf) {
  const response = axios.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  );
  return response;
}
