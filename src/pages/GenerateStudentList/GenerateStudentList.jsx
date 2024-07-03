import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import SelectCity from "../../components/SelectCity/SelectCity";
import {
  MainGenerateStudent,
  SectionGenerateStudent,
} from "./GenerateStudentListStyled";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import SelectTime from "../../components/SelectTime/SelectTime";
import CheckBoxCourses from "../../components/CheckBoxCourses/CheckBoxCourses";
import SelectRegistration from "../../components/SelectRegistration/SelectRegistration";
import { useState } from "react";
import SelectJustParty from "../../components/SelectJustParty/SelectJustParty";
import { generateStudents } from "../../services/student";
import SelectJustCollege from "../../components/SelectJustCollege/SelectJustCollege";
import { ToastContainer, toast } from "react-toastify";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";

export default function GenerateStudentList() {
  const [infoAllStudents, setInfoAllStudents] = useState([]);
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

  async function GenerateStudents() {
    const name_college = document.getElementById("college").value;
    const name_city = document.getElementById("city").value;
    const time_party = document.getElementById("time").value;
    const grade_party = document.getElementById("party").value;
    const student_registration = document.getElementById("registration").value;

    const courses = document.getElementsByName("courses");
    const student_courses = [];
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].checked) {
        student_courses.push(courses[i].value);
      }
    }

    const filterCriteria = {};

    if (name_college) {
      filterCriteria.name_college = name_college.toLowerCase();
    }
    if (name_city) {
      filterCriteria.city_college = name_city.toLowerCase();
    }
    if (time_party) {
      filterCriteria.time_party = time_party.toLowerCase();
    }
    if (grade_party) {
      filterCriteria.grade_party = grade_party.toLowerCase();
    }
    if (student_registration) {
      filterCriteria.student_registration = student_registration.toLowerCase();
    }
    if (student_courses && student_courses.length > 0) {
      filterCriteria.courses = student_courses;
    }

    if (Object.keys(filterCriteria).length == 0) {
      return ToastNotice("Você precisa preencher pelo menos um campo", "error");
    }

    const response = await generateStudents(filterCriteria);

    if (response.status == 200) {
      return setInfoAllStudents([]);
    } else if (response.status == 201) {
      return setInfoAllStudents(response.data);
    }
  }

  function calculateAge(bornDate) {
    const birthDate = new Date(bornDate);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return (
    <MainGenerateStudent>
      <Navbar p7={1} />
      <NavbarMobile
        display={displayNavbarMobile}
        setDisplay={setDisplayNavbarMobile}
        p7={1}
      />
      <Header setDisplayNavbarMobile={setDisplayNavbarMobile} />
      <SectionGenerateStudent>
        <div id="formGenerateList">
          <h2>Gerar Lista de Alunos</h2>
          <div id="areaInputs">
            <div className="inputs">
              <SelectJustCollege width="300px" id="college" />
              <SelectCity width="300px" id="city" />
              <SelectJustParty width="300px" id="party" />
            </div>
            <div className="inputs">
              <SelectTime width="300px" id="time" />
              <SelectRegistration width="300px" id="registration" />
              <CheckBoxCourses name="courses" height="50px" width="300px" />
            </div>
          </div>
          <SubmitButton
            onClick={GenerateStudents}
            width="300px"
            title="Gerar Lista"
          />
        </div>
        <div id="background_listArea">
          <div id="listArea">
            <h2>Lista de Estudantes</h2>
            <table>
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Responsável</th>
                  <th>Idade</th>
                </tr>
              </thead>
              <tbody>
                {infoAllStudents.length > 0 ? (
                  infoAllStudents.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}º</td>
                      <td>{student.name}</td>
                      <td>{student.phone}</td>
                      <td>{student.responsible_name}</td>
                      <td>{calculateAge(student.born_date)} anos</td>
                    </tr>
                  ))
                ) : (
                  <tr id="noStudents">
                    <td colSpan="5">
                      <img src="./alerta.png" alt="" />
                      <p>Nenhum aluno encontrado.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </SectionGenerateStudent>
      <ToastContainer />
    </MainGenerateStudent>
  );
}
