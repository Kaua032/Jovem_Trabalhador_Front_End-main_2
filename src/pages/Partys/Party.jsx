import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import InputComponent from "../../components/Input/InputComponent";
import Navbar from "../../components/Navbar/Navbar";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { MainParty, SectionParty } from "./PartyStyled";
import Cookies from "js-cookie";
import { registerPartys } from "../../services/partyService";
import PartyList from "../../components/PartysList/PartyList";
import SelectTime from "../../components/SelectTime/SelectTime";
import { ToastContainer, toast } from "react-toastify";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";

export default function Party() {
  const [infoAllPartys, setInfoAllPartys] = useState([]);
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

  function handleDeleteParty(index) {
    const currentPartys = localStorage.getItem("partys")
      ? JSON.parse(localStorage.getItem("partys"))
      : [];

    currentPartys.splice(index, 1);

    localStorage.setItem("partys", JSON.stringify(currentPartys));

    setInfoAllPartys(currentPartys);
  }

  function registerParty() {
    const gradeParty = document.getElementById("nameParty").value;
    const timeParty = document.getElementById("timeParty").value;

    if (gradeParty !== "" && timeParty !== "") {
      const currentPartys = localStorage.getItem("partys")
        ? JSON.parse(localStorage.getItem("partys"))
        : [];

      currentPartys.push({ grade: gradeParty, time: timeParty });

      localStorage.setItem("partys", JSON.stringify(currentPartys));
      setInfoAllPartys(currentPartys);
      document.getElementById("nameParty").value = "";
      document.getElementById("timeParty").value = "";
    }
  }

  async function submitPartys() {
    if (!Cookies.get("token")) {
      return ToastNotice(
        "Você precisa estar logado para realizar essa ação",
        "error"
      );
    }

    const partys = localStorage.getItem("partys")
      ? JSON.parse(localStorage.getItem("partys"))
      : [];

    if (partys.length == 0) {
      return ToastNotice("Você não possui turmas cadastradas", "error");
    }

    const response = await registerPartys(partys);

    if (response.status == 200) {
      ToastNotice(response.data.message, "error");
      return;
    } else if (response.status == 201) {
      localStorage.setItem("partys", []);
      setInfoAllPartys([]);
      ToastNotice(response.data.message, "success");
      window.location.reload();
    }

    return;
  }

  useEffect(() => {
    setInfoAllPartys(
      localStorage.getItem("partys")
        ? JSON.parse(localStorage.getItem("partys"))
        : []
    );
  }, []);
  return (
    <MainParty>
      <Navbar p6={1} />
      <NavbarMobile
        display={displayNavbarMobile}
        setDisplay={setDisplayNavbarMobile}
        p6={1}
      />
      <Header setDisplayNavbarMobile={setDisplayNavbarMobile} />
      <SectionParty>
        <div id="addPartyArea">
          <div id="form-party">
            <h2>Adicionar Turma</h2>
            <InputComponent
              name="grade"
              type="text"
              title="Grade:"
              width="300px"
              id="nameParty"
            />
            <SelectTime width="300px" id="timeParty" />
            <SubmitButton
              onClick={registerParty}
              title="Adicionar"
              width="300px"
            />
          </div>
          <div id="partysLocalList">
            <h2>Turmas na Rede Local</h2>
            <table id="local">
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Grade</th>
                  <th>Horário</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {infoAllPartys.map((party, index) => (
                  <tr key={index}>
                    <th>{index + 1}º</th>
                    <th>{party.grade}</th>
                    <th>{party.time}</th>
                    <th>
                      <button
                        id={`delete-${index}`}
                        onClick={() => handleDeleteParty(index)}
                      ></button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SubmitButton
            onClick={submitPartys}
            title="Adicionar ao Banco"
            width="100%"
          />
        </div>
        <PartyList />
      </SectionParty>
      <ToastContainer />
    </MainParty>
  );
}
