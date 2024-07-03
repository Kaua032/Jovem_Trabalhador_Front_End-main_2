import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import InputComponent from "../../components/Input/InputComponent";
import Navbar from "../../components/Navbar/Navbar";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { MainCourse, SectionCourse } from "./CoursesStyled";
import Cookies from "js-cookie";
import { registerCourses } from "../../services/courseService";
import CourseList from "../../components/CoursesList/CoursesList";
import { ToastContainer, toast } from "react-toastify";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";

export default function Courses() {
  const [infoAllCourses, setInfoAllCourses] = useState([]);
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

  function handleDeleteCourse(index) {
    const currentCourses = localStorage.getItem("courses")
      ? JSON.parse(localStorage.getItem("courses"))
      : [];

    currentCourses.splice(index, 1);

    localStorage.setItem("courses", JSON.stringify(currentCourses));

    setInfoAllCourses(currentCourses);
  }

  function registerCourse() {
    const nameCourse = document.getElementById("nameCourse").value;

    if (nameCourse !== "") {
      const currentCourses = localStorage.getItem("courses")
        ? JSON.parse(localStorage.getItem("courses"))
        : [];

      currentCourses.push({ name: nameCourse });

      localStorage.setItem("courses", JSON.stringify(currentCourses));
      setInfoAllCourses(currentCourses);
      document.getElementById("nameCourse").value = "";
    }
  }

  async function submitCourses() {
    if (!Cookies.get("token")) {
      return ToastNotice(
        "Você precisa estar logado para realizar essa ação",
        "error"
      );
    }
    const courses = localStorage.getItem("courses")
      ? JSON.parse(localStorage.getItem("courses"))
      : [];

    if (courses.length == 0) {
      return ToastNotice("Você não possui cursos cadastrados", "error");
    }
    const response = await registerCourses(courses);
    if (response.status == 200) {
      ToastNotice(response.data.message, "error");
      return;
    } else if (response.status == 201) {
      localStorage.setItem("courses", []);
      setInfoAllCourses([]);
      ToastNotice(response.data.message, "success");
      window.location.reload();
    }
  }

  useEffect(() => {
    setInfoAllCourses(
      localStorage.getItem("courses")
        ? JSON.parse(localStorage.getItem("courses"))
        : []
    );
  }, []);

  return (
    <MainCourse>
      <Navbar p5={1} />
      <NavbarMobile
        display={displayNavbarMobile}
        setDisplay={setDisplayNavbarMobile}
        p5={1}
      />
      <Header setDisplayNavbarMobile={setDisplayNavbarMobile} />
      <SectionCourse>
        <div id="addCourseArea">
          <div id="form-course">
            <h2>Adicionar Curso</h2>
            <InputComponent
              name="name"
              type="text"
              title="Nome:"
              width="300px"
              id="nameCourse"
            />
            <SubmitButton
              onClick={registerCourse}
              title="Adicionar"
              width="300px"
            />
          </div>
          <div id="coursesLocalList">
            <h2>Cursos na Rede Local</h2>
            <table id="local">
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Nome</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {infoAllCourses.map((course, index) => (
                  <tr key={index}>
                    <th>{index + 1}º</th>
                    <th>{course.name}</th>
                    <th>
                      <button
                        id={`delete-${index}`}
                        onClick={() => handleDeleteCourse(index)}
                      ></button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SubmitButton
            onClick={submitCourses}
            title="Adicionar ao Banco"
            width="100%"
          />
        </div>
        <CourseList />
      </SectionCourse>
      <ToastContainer />
    </MainCourse>
  );
}
