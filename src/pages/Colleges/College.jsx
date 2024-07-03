import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import InputComponent from "../../components/Input/InputComponent";
import Navbar from "../../components/Navbar/Navbar";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { MainCollege, SectionCollege } from "./CollegeStyled";
import CollegeList from "../../components/CollegesList/CollegeList";
import { registerColleges } from "../../services/collegeService";
import Cookies from "js-cookie";
import SelectCity from "../../components/SelectCity/SelectCity";
import { ToastContainer, toast } from "react-toastify";
import SelectUF from "../../components/SelectUF/SelectUF";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";

export default function College() {
  const [infoAllColleges, setInfoAllColleges] = useState([]);
  const [uf, setUf] = useState("");
  const [displayNavbarMobile, setDisplayNavbarMobile] = useState("none");

  const ToastNotice = (message, type) =>
    toast[type](`${message}`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  function handleDeleteCollege(index) {
    const currentColleges = localStorage.getItem("colleges")
      ? JSON.parse(localStorage.getItem("colleges"))
      : [];

    currentColleges.splice(index, 1);

    localStorage.setItem("colleges", JSON.stringify(currentColleges));

    setInfoAllColleges(currentColleges);
  }

  function registerCollege() {
    const nameCollege = document.getElementById("nameCollege").value;
    const nameCityCollege = document.getElementById("nameCityCollege").value;
    const UF = document.getElementById("ufCityCollege").value;

    if ((nameCollege !== "") & (nameCityCollege !== "") & (uf !== "")) {
      const currentColleges = localStorage.getItem("colleges")
        ? JSON.parse(localStorage.getItem("colleges"))
        : [];

      currentColleges.push({
        name: nameCollege,
        city: nameCityCollege,
        uf: UF,
      });

      localStorage.setItem("colleges", JSON.stringify(currentColleges));
      setInfoAllColleges(currentColleges);
      document.getElementById("nameCollege").value = "";
      document.getElementById("nameCityCollege").value = "";
      document.getElementById("ufCityCollege").value = "";
    }
  }

  async function submitColleges() {
    if (!Cookies.get("token")) {
      return ToastNotice(
        "Você precisa estar logado para realizar essa ação",
        "error"
      );
    }
    const colleges = localStorage.getItem("colleges")
      ? JSON.parse(localStorage.getItem("colleges"))
      : [];

    if (colleges.length == 0) {
      return ToastNotice("Você não possui instituições cadastradas", "error");
    }
    const response = await registerColleges(colleges);
    if (response.status == 200) {
      ToastNotice(response.data.message, "error");
      return;
    } else if (response.status == 201) {
      localStorage.setItem("colleges", []);
      setInfoAllColleges([]);
      ToastNotice(response.data.message, "success");
      window.location.reload();
    }

    return;
  }

  function selectUF() {
    const selectedUF = document.getElementById("ufCityCollege").value;
    setUf(selectedUF);
  }

  useEffect(() => {
    setInfoAllColleges(
      localStorage.getItem("colleges")
        ? JSON.parse(localStorage.getItem("colleges"))
        : []
    );
  }, []);
  return (
    <MainCollege>
      <Navbar p4={1} />
      <NavbarMobile
        display={displayNavbarMobile}
        setDisplay={setDisplayNavbarMobile}
        p4={1}
      />
      <Header setDisplayNavbarMobile={setDisplayNavbarMobile} />
      <SectionCollege>
        <div id="addCollegeArea">
          <div id="form-college">
            <h2>Adicionar Instituição</h2>
            <InputComponent
              name="name"
              type="text"
              title="Nome:"
              width="300px"
              id="nameCollege"
            />
            <SelectUF onChange={selectUF} id="ufCityCollege" width="100%" />
            <SelectCity uf={uf} width="100%" id="nameCityCollege" />
            <SubmitButton
              onClick={registerCollege}
              title="Adicionar"
              width="300px"
            />
          </div>
          <div id="collegesLocalList">
            <h2>Instituições na Rede Local</h2>
            <table id="local">
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Nome</th>
                  <th>Cidade</th>
                  <th>UF</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {infoAllColleges.map((college, index) => (
                  <tr key={index}>
                    <td>{index + 1}º</td>
                    <td>{college.name}</td>
                    <td>{college.city}</td>
                    <td>{college.uf}</td>
                    <td>
                      <button
                        id={`delete-${index}`}
                        onClick={() => handleDeleteCollege(index)}
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SubmitButton
            onClick={submitColleges}
            title="Adicionar ao Banco"
            width="100%"
          />
        </div>
        <CollegeList />
      </SectionCollege>
      <ToastContainer />
    </MainCollege>
  );
}
