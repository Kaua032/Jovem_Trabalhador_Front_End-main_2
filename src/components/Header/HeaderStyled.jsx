import styled from "styled-components";

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  padding: 30px 20px 40px 20px;

  #loginButton {
    font-size: 20px;
    font-weight: 600;
    width: 130px;
    align-self: flex-end;
    border-radius: 10px;
    background-color: #F58634;
    border: none;
  }
  #hamburguer_navbar {
    width: 40px;
    height: 40px;

    border: none;
    background-image: url("./hamburguer_navbar.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #f6f7f9;
  }
`;
export const LogOut = styled.div`
  margin-right: 20px;

  display: flex;
  align-items: center;
  gap: 25px;
  cursor: pointer;

  p {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #454545;
  }
  button {
    border: none;
  }
  button {
    width: 25px;
    height: 25px;
    background-image: url("./logout.svg");
    background-repeat: no-repeat;
    background-position: center;
  }

  &:hover {
    button {
      background-image: url("./logoutHover.svg");
    }
    p {
      color: #F58634;
    }
  }
`;

export const ErrorSpan = styled.span`
  background-color: #ffcdcd;
  color: #9e0000;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  border-radius: 7px;
`;
