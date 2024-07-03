import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { BackgroundNav } from "./NavbarStyled";

export default function Navbar({ ...props }) {
  return (
    <BackgroundNav>
      <a id="title" href="/">
        <img src="./logo.png" alt="" />
      </a>
      <div>
        <NavbarComponent href="/" type={props.p1} name="Adicionar Aluno" />
        <NavbarComponent href="/localStudents" type={props.p2} name="Adicionar Alunos Banco" />
        <NavbarComponent href="/remoteStudents" type={props.p3} name="Alunos Salvos no Banco" />
        <NavbarComponent href="/college" type={props.p4} name="Instituições" />
        <NavbarComponent href="/courses" type={props.p5} name="Cursos" />
        <NavbarComponent href="/party" type={props.p6} name="Turmas" />
        <NavbarComponent href="/generateList" type={props.p7} name="Gerar Lista de Alunos" />
        <NavbarComponent href="/exportCSV" type={props.p8} name="Exportar CSV" />
      </div>
    </BackgroundNav>
  );
}
