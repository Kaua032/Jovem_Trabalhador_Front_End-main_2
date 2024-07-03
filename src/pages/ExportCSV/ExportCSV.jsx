import { MainExportCSV, SectionExportCSV } from "./ExportCSVStyled";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import SelectJustCollege from "../../components/SelectJustCollege/SelectJustCollege";
import SelectCity from "../../components/SelectCity/SelectCity";
import SelectJustParty from "../../components/SelectJustParty/SelectJustParty";
import SelectTime from "../../components/SelectTime/SelectTime";
import CheckBoxCourses from "../../components/CheckBoxCourses/CheckBoxCourses";
import SelectRegistration from "../../components/SelectRegistration/SelectRegistration";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { exportStudentCSV } from "../../services/student";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";

export default function ExportCSV() {
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

  async function generateExport() {
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
      return ToastNotice(
        "Você precisa preencher pelo menos um campo.",
        "error"
      );
    }

    try {
      const response = await exportStudentCSV(filterCriteria);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "students.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Arquivo CSV exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar CSV:", error);
      ToastNotice(
        "Erro ao exportar CSV. Verifique se você está autorizado.",
        "error"
      );
    }
  }

  return (
    <MainExportCSV>
      <Navbar p8={1} />
      <NavbarMobile
        display={displayNavbarMobile}
        setDisplay={setDisplayNavbarMobile}
        p8={1}
      />
      <Header setDisplayNavbarMobile={setDisplayNavbarMobile} />
      <SectionExportCSV>
        <div id="formExportCSV">
          <h2>Exportar CSV</h2>
          <div id="areaInputs">
            <div className="inputs">
              <SelectJustCollege width="300px" id="college" />
              <SelectCity width="300px" id="city" />
              <SelectJustParty width="300px" id="party" />
            </div>
            <div className="inputs">
              <SelectTime width="300px" id="time" />
              <SelectRegistration width="300px" id="registration" />
              <CheckBoxCourses name="courses" width="300px" height="50px" />
            </div>
          </div>
          <SubmitButton
            onClick={generateExport}
            width="300px"
            title="Exportar"
          />
        </div>
      </SectionExportCSV>
      <ToastContainer />
    </MainExportCSV>
  );
}
