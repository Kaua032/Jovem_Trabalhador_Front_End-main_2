import { useEffect, useState } from "react";
import { getAllColleges } from "../../services/collegeService";
import { SelectArea } from "./SelectCollegeStyled";
import Cookies from "js-cookie";

export function SelectCollege({ width, id, title }) {
  const [collegesRemote, setCollegesRemote] = useState([]);
  const [collegesLocal, setCollegesLocal] = useState([]);

  async function getRemoteColleges() {
    if (Cookies.get("token")) {
      const response = await getAllColleges();

      const currentColleges = response.data.colleges;
      localStorage.setItem(
        "collegesCopyRemote",
        JSON.stringify(currentColleges)
      );
    }

    setCollegesRemote(JSON.parse(localStorage.getItem("collegesCopyRemote")));

    setCollegesLocal(JSON.parse(localStorage.getItem("colleges")));

    return;
  }

  useEffect(() => {
    getRemoteColleges();
  }, []);
  return (
    <SelectArea width={width}>
      <p>{title}</p>
      <select name="" id={id}>
        <option value="">Selecione</option>
        {collegesRemote ? (
          collegesRemote.map((college) => (
            <option
              key={`${college.name}-${college.city}-remote`}
            >{`${college.name} | ${college.city}-${college.uf}`}</option>
          ))
        ) : (
          <></>
        )}
        {collegesLocal ? (
          collegesLocal.map((college) => (
            <option
              key={`${college.name}-${college.city}-local`}
            >{`${college.name} | ${college.city}-${college.uf}`}</option>
          ))
        ) : (
          <></>
        )}
      </select>
    </SelectArea>
  );
}
