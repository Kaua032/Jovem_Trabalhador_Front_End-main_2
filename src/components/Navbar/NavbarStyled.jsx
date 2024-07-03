import styled from "styled-components";

export const BackgroundNav = styled.section`
  width: 285px;
  height: 100%;
  background-color: white;
  padding-top: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  gap: 50px;
  position: fixed;

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
  a img{
    width: 200px;
  }
  @media (max-width: 1050px) {
    display: none;
  }
`;
