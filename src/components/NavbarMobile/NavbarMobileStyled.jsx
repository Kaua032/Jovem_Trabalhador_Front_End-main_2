import styled from "styled-components";

export const BackgrounMobileNav = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0000001a;
  position: fixed;
  z-index: 1;
  display: ${(props) => props.display};
`;

export const BackgroundNavMobile = styled.section`
  @keyframes leftToRight {
    0% {
      transform: translate(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  width: 285px;
  height: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  gap: 50px;
  position: fixed;
  animation: leftToRight 0.5s ease-in-out forwards;

  #title {
    color: #0a7de8;
    font-weight: bold;
    font-size: 24px;
    text-decoration: none;
  }
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  #headerModal {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  #headerModal button {
    align-self: flex-end;
    margin: 10px 10px 0px 0px;
    width: 20px;
    height: 20px;

    background-image: url("./X.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-color: white;
    border: none;
  }
  a img{
    width: 200px;
  }
`;
