import { useEffect } from "react";
import { useState } from "react";
import { GetAllCitiesFrom } from "../../services/cities";
import { SelectStyle } from "./SelectCityStyled";

export default function SelectCity({ width, id, uf }) {
  const [cities, setCities] = useState([]);
  const [allCities, setAllCities] = useState();
  const unidadesFederativas = [
    "ac",
    "al",
    "ap",
    "am",
    "ba",
    "ce",
    "df",
    "es",
    "go",
    "ma",
    "mt",
    "ms",
    "mg",
    "pa",
    "pb",
    "pr",
    "pe",
    "pi",
    "rj",
    "rn",
    "rs",
    "ro",
    "rr",
    "sc",
    "sp",
    "se",
    "to",
  ];

  async function GetAllCities() {
    if (!localStorage.getItem("cities")) {
      let AllBRCities = {};
      for (let i = 0; i < unidadesFederativas.length; i++) {
        const uf = unidadesFederativas[i];
        const response = await GetAllCitiesFrom(uf);
        AllBRCities[uf] = response.data;
      }
      localStorage.setItem("cities", JSON.stringify(AllBRCities));
      setAllCities(localStorage.getItem("cities"));
    } else {
      const storedCities = JSON.parse(localStorage.getItem("cities"));
      setAllCities(storedCities);
    }
  }

  useEffect(() => {
    if (uf && allCities) {
      setCities(allCities[uf]);
    }
  }, [uf, allCities]);

  useEffect(() => {
    GetAllCities();
  }, []);
  return (
    <SelectStyle width={width}>
      <p>Cidade:</p>
      <select name="" id={id}>
        <option value="">Selecione</option>
        {cities.map((city) => (
          <option
            key={city.id}
            value={`${city.nome}`}
          >
            {`${city.nome}-${city.microrregiao.mesorregiao.UF.sigla}`}
          </option>
        ))}
      </select>
    </SelectStyle>
  );
}
