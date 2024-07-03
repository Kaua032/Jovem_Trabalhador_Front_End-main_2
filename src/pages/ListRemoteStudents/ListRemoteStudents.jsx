import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import {
  ListAreaRemoteStudents,
  MainRemoteStudents,
} from "./ListRemoteStudentsStyled";
import {
  delStudent,
  getAllStudentsByPage,
  getAllStudentsBySearch,
  updateStudent,
} from "../../services/student";
import Cookies from "js-cookie";
import { Modal } from "react-bootstrap";
import InputComponent from "../../components/Input/InputComponent";
import { SelectCollege } from "../../components/SelectCollege/SelectCollege";
import { SelectParty } from "../../components/SelectParty/SelectParty";
import CheckBoxCourses from "../../components/CheckBoxCourses/CheckBoxCourses";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { ToastContainer, toast } from "react-toastify";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";

export default function ListRemoteStudent() {
  const [infoAllStudents, setInfoAllStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState("");
  const [displayNavbarMobile, setDisplayNavbarMobile] = useState("none");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  async function SearchStudent() {
    if (Cookies.get("token")) {
      const searchTerm = document.getElementById("searchStudent").value;

      if (searchTerm.length == 0) {
        return findAllStudents(1);
      }
      const response = await getAllStudentsBySearch({ searchTerm });
      setInfoAllStudents(response.data.students);

      document.getElementById("right").style.display = "none";
      document.getElementById("left").style.display = "none";
      document.getElementById("page").style.display = "none";
    } else {
      ToastNotice(
        "Você precisa está logado para a pesquisa funcionar",
        "error"
      );
    }
  }

  async function findAllStudents(page) {
    try {
      const response = await getAllStudentsByPage({ page });
      setInfoAllStudents(response.data.students);
      document.getElementById("page").style.display = "flex";
      if (!response.data.nextPage) {
        document.getElementById("right").style.display = "none";
      } else {
        document.getElementById("right").style.display = "flex";
      }
      if (page > 1) {
        document.getElementById("left").style.display = "flex";
      } else {
        document.getElementById("left").style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleNextPage() {
    setPage((prevPage) => prevPage + 1);
  }

  function handlePreviousPage() {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  }

  function calculateAge(bornDate) {
    const birthDate = new Date(bornDate);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  async function deleteStudent(index) {
    const studentId = infoAllStudents[index]._id;
    const response = await delStudent(studentId);
    window.location.reload();
    ToastNotice(response.data.message, "info");
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function ShowStudent(index) {
    const student = infoAllStudents[index];
    await handleShow();
    setCurrentStudentId(student._id);
    document.getElementById("name").value = student.name;
    document.getElementById("phone").value = student.phone;
    document.getElementById("responsible").value = student.responsible_name;
    student.born_date = await formatDate(student.born_date);
    document.getElementById("born_date").value = student.born_date;
  }

  async function UpdateStudent() {
    const studentId = currentStudentId;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const responsible = document.getElementById("responsible").value;
    const born_date = document.getElementById("born_date").value;

    const name_city_college = document.getElementById("college").value;
    let college_name;
    let college_city;
    if (name_city_college) {
      const college_parts = name_city_college
        .split("|")
        .map((part) => part.trim());
      college_name = college_parts[0];
      college_city = college_parts[1];
    }

    const grade_time_party = document.getElementById("party").value;
    let party_grade;
    let party_time;
    if (grade_time_party) {
      const party_parts = grade_time_party
        .split("|")
        .map((part) => part.trim());
      party_grade = party_parts[0];
      party_time = party_parts[1];
    }

    const courses = document.getElementsByName("courses");
    const student_courses = [];
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].checked) {
        student_courses.push(courses[i].value);
      }
    }
    const student = {
      _id: studentId,
      name: name,
      phone: phone,
      responsible_name: responsible,
      born_date: born_date,
      name_college: college_name,
      city_college: college_city,
      time_party: party_time,
      grade_party: party_grade,
      courses: student_courses,
    };

    const response = await updateStudent(student);

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("responsible").value = "";
    document.getElementById("born_date").value = "";
    document.getElementById("college").value = "Selecione";
    document.getElementById("party").value = "Selecione";
    for (let i = 0; i < courses.length; i++) {
      courses[i].checked = false;
    }

    handleClose();
    window.location.reload();
    ToastNotice(response.data.message, "success");
  }

  useEffect(() => {
    findAllStudents(page);
  }, [page]);
  return (
    <MainRemoteStudents>
      <Navbar p3={1} />
      <NavbarMobile
        display={displayNavbarMobile}
        setDisplay={setDisplayNavbarMobile}
        p3={1}
      />
      <Header setDisplayNavbarMobile={setDisplayNavbarMobile} />
      <ListAreaRemoteStudents>
        <div id="div_search">
          <input
            onChange={SearchStudent}
            id="searchStudent"
            type="text"
            placeholder="Pesquisar..."
          />
        </div>
        <div id="background_listArea">
          <div id="listArea">
            <h2>Lista de Estudantes Remota</h2>
            <table>
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Responsável</th>
                  <th>Idade</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Cookies.get("token") ? (
                  infoAllStudents.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}º</td>
                      <td>{student.name}</td>
                      <td>{student.phone}</td>
                      <td>{student.responsible_name}</td>
                      <td>{calculateAge(student.born_date)} anos</td>
                      <td>
                        <button
                          onClick={() => ShowStudent(index)}
                          className="editButton"
                        ></button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteStudent(index)}
                          className="deleteButton"
                        ></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr id="noLogin">
                    <td colSpan="7">
                      <img src="./alerta.png" alt="" />
                      <p>
                        Você precisa está logado para ver os alunos da Rede
                        remota.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div id="buttons">
          <button id="left" onClick={handlePreviousPage}>
            &#60;
          </button>
          <p id="page">{page}</p>
          <button id="right" onClick={handleNextPage}>
            &#62;
          </button>
        </div>
      </ListAreaRemoteStudents>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="modalTitle">Atualizar Estudante</Modal.Title>
        </Modal.Header>
        <div id="flex">
          <div id="formStudent1">
            <input id="studentID" type="hidden" value={currentStudentId} />
            <InputComponent
              name="name"
              type="text"
              title="Nome do Estudante:"
              width="300px"
              id="name"
            />
            <InputComponent
              name="phone"
              type="text"
              title="Telefone:"
              width="300px"
              id="phone"
            />
            <InputComponent
              name="responsible_name"
              type="text"
              title="Nome do Responsável:"
              width="300px"
              id="responsible"
            />
            <InputComponent
              name="born_date"
              type="date"
              title="Data de nascimento:"
              width="300px"
              id="born_date"
            />
            <SelectCollege width="300px" id="college" />
          </div>
          <div id="formStudent2">
            <SelectParty width="300px" id="party" />
            <CheckBoxCourses height="150px" width="300px" name="courses" />
            <SubmitButton
              onClick={UpdateStudent}
              type="submit"
              title="Adicionar"
              width="300px"
            />
          </div>
        </div>
      </Modal>
      <ToastContainer limit={2} />
    </MainRemoteStudents>
  );
}
