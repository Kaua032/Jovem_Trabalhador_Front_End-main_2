import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import {
  ListAreaLocalStudents,
  MainLocalStudents,
} from "./ListLocalStudentsStyled";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Cookies from "js-cookie";
import { postAllStudents } from "../../services/student";
import { toast, ToastContainer } from "react-toastify";
import { SelectCollege } from "../../components/SelectCollege/SelectCollege";
import { getCollege } from "../../services/collegeService";
import { getCourse } from "../../services/courseService";
import { getParty } from "../../services/partyService";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";

export default function ListLocalStudents() {
  const [infoLocalStudents, setInfoLocalStudents] = useState([]);
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

  function handleDeleteStudent(index) {
    const currentStudents = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];

    currentStudents.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(currentStudents));

    setInfoLocalStudents(currentStudents);
    ToastNotice("Estudante deletado com sucesso", "info");
  }

  function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  }

  async function registerStudents() {
    const currentStudents = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];

    if (currentStudents.length == 0) {
      return ToastNotice("Não há alunos registrados.", "error");
    } else if (!Cookies.get("token")) {
      return ToastNotice(
        "Faça login antes de enviar ao banco de dados",
        "error"
      );
    }

    const name_city_college = document.getElementById("college").value;
    let id_college;

    if (name_city_college) {
      const [name_college, location] = name_city_college.split(" | ");
      const [city_college, uf_college] = location.split("-");
      const response = await getCollege({
        name_college,
        city_college,
        uf_college,
      });
      id_college = response.data.college[0]._id;
    } else {
      return ToastNotice("Selecione um colégio", "error");
    }

    const studentPromises = infoLocalStudents.map(async (student) => {
      const name_courses = student.courses;
      let id_courses = [];

      for (let i = 0; i < name_courses.length; i++) {
        const response = await getCourse({ name_course: name_courses[i] });
        id_courses.push(response.data.course[0]._id);
      }

      const response = await getParty({
        grade_party: student.grade_party,
        time_party: student.time_party,
      });
      const id_party = response.data.party[0]._id;

      let current_student = {
        name: student.name,
        phone: student.phone,
        responsible_name: student.responsible_name,
        born_date: student.born_date,
        registration: student.registration,
        id_college,
        id_party,
        id_courses,
      };

      return current_student;
    });

    const students = await Promise.all(studentPromises);

    console.log(students);

    const response = await postAllStudents(students);

    if (response.status == 200) {
      ToastNotice(response.data.message, "error");
    } else if (response.status == 201) {
      ToastNotice(response.data.message, "success");
      setInfoLocalStudents([]);
      localStorage.setItem("students", []);
    }
    return;
  }

  useEffect(() => {
    setInfoLocalStudents(
      localStorage.getItem("students")
        ? JSON.parse(localStorage.getItem("students"))
        : []
    );
  }, []);
  return (
    <MainLocalStudents>
      <Navbar p2={1} />
      <NavbarMobile
        display={displayNavbarMobile}
        setDisplay={setDisplayNavbarMobile}
        p2={1}
      />
      <Header setDisplayNavbarMobile={setDisplayNavbarMobile} />
      <ListAreaLocalStudents>
        <div id="background_listArea">
          <div id="listArea">
            <div id="header_list">
              <h2>Lista de Estudantes Local</h2>
              <SelectCollege id="college" width="250px" />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Responsável</th>
                  <th>Idade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {infoLocalStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}º</td>
                    <td>{student.name}</td>
                    <td>{student.phone}</td>
                    <td>{student.responsible_name}</td>
                    <td>{calculateAge(student.born_date)}</td>
                    <td>
                      <button
                        className="deleteButton"
                        onClick={() => handleDeleteStudent(index)}
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <SubmitButton
          onClick={registerStudents}
          type="submit"
          title="Adicionar Lista de Alunos Ao Banco"
          width="70%"
        />
      </ListAreaLocalStudents>
      <ToastContainer />
    </MainLocalStudents>
  );
}
