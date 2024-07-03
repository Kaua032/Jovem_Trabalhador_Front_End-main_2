import { useEffect } from "react";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { BackgrounMobileNav, BackgroundNavMobile } from "./NavbarMobileStyled";

export default function NavbarMobile({ display, setDisplay, ...props }) {
  function CloseModal() {
    setDisplay("none");
  }
  function handleClickOutsideModal(e) {
    const modal = document.getElementById("modal");
    if (modal && !modal.contains(e.target)) {
      setDisplay("none");
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <BackgrounMobileNav id="backgroundModal" display={display}>
      <BackgroundNavMobile id="modal">
        <div id="headerModal">
          <button onClick={CloseModal}></button>
          <a id="title" href="/">
            <img src="./logo.png" alt="" />
          </a>
        </div>
        <div>
          <NavbarComponent href="/" type={props.p1} name="Adicionar Aluno" />
          <NavbarComponent
            href="/localStudents"
            type={props.p2}
            name="Adicionar Alunos Banco"
          />
          <NavbarComponent
            href="/remoteStudents"
            type={props.p3}
            name="Alunos Salvos no Banco"
          />
          <NavbarComponent
            href="/college"
            type={props.p4}
            name="Instituições"
          />
          <NavbarComponent href="/courses" type={props.p5} name="Cursos" />
          <NavbarComponent href="/party" type={props.p6} name="Turmas" />
          <NavbarComponent
            href="/generateList"
            type={props.p7}
            name="Gerar Lista de Alunos"
          />
          <NavbarComponent
            href="/exportCSV"
            type={props.p8}
            name="Exportar CSV"
          />
        </div>
      </BackgroundNavMobile>
    </BackgrounMobileNav>
  );
}
