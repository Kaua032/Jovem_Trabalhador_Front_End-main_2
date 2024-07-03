import { useEffect, useState } from "react";
import { ListArea } from "./CollegeListStyled";
import { getAllColleges, updateCollege } from "../../services/collegeService";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

export default function CollegeList() {
  const [allColleges, setAllColleges] = useState([]);

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

  async function findAllColleges() {
    try {
      const response = await getAllColleges();

      setAllColleges(response.data.colleges);
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

    const updatedColleges = [...allColleges];
    updatedColleges[index][field] = value;
    setAllColleges(updatedColleges);
    await updateCollege(allColleges[index]._id, {
      [field]: allColleges[index][field],
    });
  };

  useEffect(() => {
    findAllColleges();
  }, []);
  return (
    <>
      <ListArea>
        <div>
          <h2>Instituições na Rede Remota</h2>
          <table id="remota">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nome</th>
                <th>Cidade</th>
                <th>UF</th>
              </tr>
            </thead>
            <tbody>
              {allColleges.map((college, index) => (
                <tr key={index}>
                  <td>{index + 1}º</td>
                  <td>
                    <input
                      type="text"
                      value={college.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={college.city}
                      onChange={(e) =>
                        handleInputChange(index, "city", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={college.uf}
                      onChange={(e) =>
                        handleInputChange(index, "uf", e.target.value)
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
