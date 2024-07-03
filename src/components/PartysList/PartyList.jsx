import { useEffect, useState } from "react";
import { ListArea } from "../CollegesList/CollegeListStyled";
import { getAllPartys, updateParty } from "../../services/partyService";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

export default function PartyList() {
  const [allPartys, setAllPartys] = useState([]);

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

  async function findAllPartys() {
    try {
      const response = await getAllPartys();

      setAllPartys(response.data.parties);
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
    const updateParties = [...allPartys];
    updateParties[index][field] = value;
    setAllPartys(updateParties);
    updateParty(allPartys[index]._id, { [field]: allPartys[index][field] });
  };

  useEffect(() => {
    findAllPartys();
  }, []);
  return (
    <>
      <ListArea>
        <div>
          <h2>Instituições na Rede Remota</h2>
          <table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Nome</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {allPartys.map((party, index) => (
                <tr key={index}>
                  <td>{index + 1}º</td>
                  <td>
                    <input
                      type="text"
                      value={party.grade}
                      onChange={(e) =>
                        handleInputChange(index, "grade", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={party.time}
                      onChange={(e) =>
                        handleInputChange(index, "time", e.target.value)
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
