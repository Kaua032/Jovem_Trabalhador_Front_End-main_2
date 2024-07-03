import { useEffect, useState } from "react";
import { ListArea } from "../CollegesList/CollegeListStyled";
import { getAllCourses, updateCourse } from "../../services/courseService";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

export default function CourseList() {
  const [allCourses, setAllCourses] = useState([]);

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

  async function findAllCourses() {
    try {
      const response = await getAllCourses();

      setAllCourses(response.data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = async (index, field, value) => {
    if (!Cookies.get("token")) {
      return ToastNotice(
        "Você precisa estar logado para editar uma instituição",
        "error"
      );
    }

    const students = JSON.parse(localStorage.getItem("students") || "[]");
    if (students.length > 0) {
      return ToastNotice(
        "Por favor, adicione todos os alunos da rede local.",
        "error"
      );
    }
    const updateCourses = [...allCourses];
    updateCourses[index][field] = value;
    setAllCourses(updateCourses);
    await updateCourse(allCourses[index]._id, {
      [field]: allCourses[index][field],
    });
  };

  useEffect(() => {
    findAllCourses();
  }, []);
  return (
    <>
      <ListArea>
        <div>
          <h2>Cursos na Rede Remota</h2>
          <table>
            <thead>
              <tr>
                <td>Nº</td>
                <td>Nome</td>
              </tr>
            </thead>
            <tbody>
              {allCourses.map((course, index) => (
                <tr key={index}>
                  <td>{index + 1}º</td>
                  <td>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ListArea>
      <ToastContainer />
    </>
  );
}
