import { Button, Modal } from "react-bootstrap";
import { ErrorSpan, HeaderDiv, LogOut } from "./HeaderStyled";
import InputComponent from "../Input/InputComponent";
import SubmitButton from "../SubmitButton/SubmitButton";
import NavModalButton from "../NavModalButton/NavModalButton";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { findUser, signin, signup } from "../../services/userService";
import { signinSchema } from "../../schemas/signinSchema";
import { signupSchema } from "../../schemas/signupSchema";
import { useForm } from "react-hook-form";

export default function Header({ setDisplayNavbarMobile }) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [serverErrorSignin, setServerErrorSignin] = useState("");
  const [serverErrorSigup, setServerErrorSigup] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dilpayLoginNavButton, setDisplayLoginNavButton] = useState("flex");
  const [dilpayRegisterNavButton, setDisplayRegisterNavButton] =
    useState("none");

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  async function inHandleSubmit(data) {
    try {
      const response = await signin(data);
      Cookies.set("token", response.data.token, { expires: 1 });
      handleClose();
      window.location.reload();
    } catch (error) {
      setServerErrorSignin(error.response.data.message);
      console.log(error);
    }
  }

  const {
    register: registerSigup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  async function upHandleSubmit(data) {
    try {
      const response = await signup(data);
      Cookies.set("token", response.data.token, { expires: 1 });
      handleClose();
      window.location.reload();
    } catch (error) {
      setServerErrorSigup(error.response.data.message);
      console.log(error);
    }
  }

  async function getUser() {
    const response = await findUser();
    setUser(response.data.user);
  }

  function logOut() {
    Cookies.remove("token");
    window.location.reload();
  }

  function changeModal(id) {
    if (id === "loginForm") {
      setDisplayLoginNavButton("none");
      document.getElementById("loginForm").style.display = "none";

      document.getElementById("modalTitle").innerHTML = "Cadastrar";

      setDisplayRegisterNavButton("flex");
      document.getElementById("registerForm").style.display = "flex";
    } else if (id === "registerForm") {
      setDisplayLoginNavButton("flex");
      document.getElementById("loginForm").style.display = "flex";

      document.getElementById("modalTitle").innerHTML = "Entrar";

      setDisplayRegisterNavButton("none");
      document.getElementById("registerForm").style.display = "none";
    }
  }

  function showModal() {
    setDisplayNavbarMobile("flex")
  }

  useEffect(() => {
    if (Cookies.get("token")) {
      getUser();
    }
  }, []);

  return (
    <HeaderDiv>
      <button onClick={showModal} id="hamburguer_navbar"></button>
      {user ? (
        <LogOut onClick={logOut}>
          <p>{user.name}</p>
          <button id="buttonLogOut"></button>
        </LogOut>
      ) : (
        <Button id="loginButton" variant="primary" onClick={handleShow}>
          Entrar
        </Button>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="modalTitle">Entrar</Modal.Title>
        </Modal.Header>
        <div id="formArea">
          <form id="loginForm" onSubmit={handleSubmitSignin(inHandleSubmit)}>
            <InputComponent
              name="email"
              type="text"
              title="Email:"
              width="100%"
              register={registerSignin}
            />
            {errorsSignin.email && (
              <ErrorSpan>{errorsSignin.email.message}</ErrorSpan>
            )}
            {serverErrorSignin && <ErrorSpan>{serverErrorSignin}</ErrorSpan>}
            <InputComponent
              name="password"
              type="password"
              title="Senha:"
              width="100%"
              register={registerSignin}
            />
            {errorsSignin.password && (
              <ErrorSpan>{errorsSignin.password.message}</ErrorSpan>
            )}
            {serverErrorSignin && <ErrorSpan>{serverErrorSignin}</ErrorSpan>}
            <SubmitButton type="submit" title="Entrar" width="100%" />
          </form>
          <NavModalButton
            display={dilpayLoginNavButton}
            idModalButton="loginForm"
            changeModal={changeModal}
            text="Não possui uma conta? Clique aqui."
          />
          <form id="registerForm" onSubmit={handleSubmitSignup(upHandleSubmit)}>
            <InputComponent
              name="name"
              type="text"
              title="Nome:"
              width="100%"
              register={registerSigup}
            />
            <InputComponent
              name="email"
              type="text"
              title="Email:"
              width="100%"
              register={registerSigup}
            />
            {errorsSignup.email && (
              <ErrorSpan>{errorsSignup.email.message}</ErrorSpan>
            )}
            {serverErrorSigup && <ErrorSpan>{serverErrorSigup}</ErrorSpan>}
            <InputComponent
              name="password"
              type="password"
              title="Senha:"
              width="100%"
              register={registerSigup}
            />
            {errorsSignup.password && (
              <ErrorSpan>{errorsSignup.password.message}</ErrorSpan>
            )}
            <SubmitButton title="Cadastrar-se" width="100%" />
          </form>
          <NavModalButton
            display={dilpayRegisterNavButton}
            idModalButton="registerForm"
            changeModal={changeModal}
            text="Já possui uma conta? Clique aqui."
          />
        </div>
      </Modal>
    </HeaderDiv>
  );
}
