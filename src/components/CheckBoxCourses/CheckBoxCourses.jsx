import { useEffect, useState } from "react";
import { BoxCoursesArea } from "./CheckBoxCoursesStyled";
import { getAllCourses } from "../../services/courseService";
import Cookies from "js-cookie";

export default function CheckBoxCourses({ height, width, name }) {
  const [coursesRemote, setCoursesRemote] = useState([]);
  const [coursesLocal, setCoursesLocal] = useState([]);

  async function getRemoteCourses() {
    if (Cookies.get("token")) {
      const response = await getAllCourses();

      const currentCourses = response.data.courses;
      localStorage.setItem("coursesCopyRemote", JSON.stringify(currentCourses));
    }

    setCoursesRemote(JSON.parse(localStorage.getItem("coursesCopyRemote")));

    setCoursesLocal(JSON.parse(localStorage.getItem("courses")));

    return;
  }

  useEffect(() => {
    getRemoteCourses();
  }, []);
  return (
    <BoxCoursesArea height={height} width={width}>
      <p>Cursos:</p>
      <div id="AllCourses">
        {coursesRemote &&
          coursesRemote.map((course) => (
            <div key={course.name}>
              <input value={course.name} type="checkbox" name={name} />
              <label htmlFor="">{course.name}</label>
            </div>
          ))}
        {coursesLocal &&
          coursesLocal.map((course) => (
            <div key={course.name}>
              <input value={course.name} type="checkbox" name={name} />
              <label htmlFor="">{course.name}</label>
            </div>
          ))}
      </div>
    </BoxCoursesArea>
  );
}
