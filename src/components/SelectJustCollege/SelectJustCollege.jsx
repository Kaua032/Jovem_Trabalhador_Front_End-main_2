import { useEffect, useState } from "react";
import { SelectArea } from "./SelectJustCollegeStyled";
import Cookies from "js-cookie";
import { getAllColleges } from "../../services/collegeService";

export default function SelectJustCollege({ width, id }) {
  const [collegesRemote, setCollegesRemote] = useState([]);

  async function getRemoteColleges() {
    if (Cookies.get("token")) {
      const response = await getAllColleges();

      const currentColleges = response.data.colleges;
      localStorage.setItem(
        "collegesCopyRemote",
        JSON.stringify(currentColleges)
      );
      setCollegesRemote(JSON.parse(localStorage.getItem("collegesCopyRemote")));
    }

    return;
  }

  useEffect(() => {
    getRemoteColleges();
  }, []);

  return (
    <SelectArea width={width}>
      <p>Instituição:</p>
      <select name="" id={id}>
        <option value="">Selecione</option>
        {collegesRemote ? (
          collegesRemote.map((college) => (
            <option key={`${college.name}`}>{`${college.name}`}</option>
          ))
        ) : (
          <></>
        )}
      </select>
    </SelectArea>
  );
}
