import Navbar from "../../components/Navbar/Navbar";
import { MainHome } from "./HomeStyled";
import Header from "../../components/Header/Header";
import InputComponent from "../../components/Input/InputComponent";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { SelectParty } from "../../components/SelectParty/SelectParty";
import CheckBoxCourses from "../../components/CheckBoxCourses/CheckBoxCourses";
import { ToastContainer, toast } from "react-toastify";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";
import { useState } from "react";

export default function Home() {
  const [displayNavbarMobile, setDisplayNavbarMobile] = useState("none");
  const [phone, setPhone] = useState("");

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

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    let formattedValue = "";

    if (inputValue.length <= 2) {
      formattedValue = `(${inputValue}`;
    } else if (inputValue.length <= 6) {
      formattedValue = `(${inputValue.slice(0, 2)}) ${inputValue.slice(2)}`;
    } else if (inputValue.length <= 11) {
      formattedValue = `(${inputValue.slice(0, 2)}) ${inputValue.slice(
        2,
        3
      )}-${inputValue.slice(3, 7)}-${inputValue.slice(7)}`;
    }

    setPhone(formattedValue);
  };

  function registerStudent() {
    const student_name = document.getElementById("name").value;
    const student_phone = document.getElementById("phone").value;
    const student_responsible = document.getElementById("responsible").value;
    const student_born = document.getElementById("born_date").value;
    const grade_time_party = document.getElementById("party").value;

    if (
      !student_name ||
      !student_phone ||
      !student_responsible ||
      !student_born ||
      grade_time_party === ""
    ) {
      ToastNotice("Por favor, preencha todos os campos obrigatórios.", "error");
      return;
    }

    const party_parts = grade_time_party.split("|").map((part) => part.trim());
    const party_grade = party_parts[0];
    const party_time = party_parts[1];

    const courses = document.getElementsByName("courses");
    const student_courses = [];
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].checked) {
        student_courses.push(courses[i].value);
      }
    }

    const actualDate = new Date();
    const formatedDate = actualDate.toISOString().split("T")[0];

    const student = {
      name: student_name.toLowerCase(),
      phone: student_phone,
      responsible_name: student_responsible.toLowerCase(),
      born_date: student_born,
      registration: formatedDate,
      time_party: party_time.toLowerCase(),
      grade_party: party_grade.toLowerCase(),
      courses: student_courses,
    };

    let students = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    ToastNotice("Estudante registrado com sucesso.", "success");

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("responsible").value = "";
    document.getElementById("born_date").value = "";
    document.getElementById("party").value = "Selecione";
    for (let i = 0; i < courses.length; i++) {
      courses[i].checked = false;
    }
  }
  return (
    <MainHome>
      <Navbar p1={1} />
      <NavbarMobile
        display={displayNavbarMobile}
        setDisplay={setDisplayNavbarMobile}
        p1={1}
      />
      <Header setDisplayNavbarMobile={setDisplayNavbarMobile} />
      <div id="formStudent">
        <h2>Adicionar Novo Estudante</h2>
        <div id="flex">
          <div id="formStudent1">
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
              value={phone}
              onChange={handlePhoneChange}
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
          </div>
          <div id="formStudent2">
            <SelectParty width="300px" id="party" />
            <CheckBoxCourses height="151px" width="300px" name="courses" />
            <SubmitButton
              onClick={registerStudent}
              type="submit"
              title="Adicionar"
              width="300px"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </MainHome>
  );
}
