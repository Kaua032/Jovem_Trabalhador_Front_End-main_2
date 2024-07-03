import styled from "styled-components";

export const MainHome = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;

  #formStudent {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 285px;
    gap: 20px;
    background-color: white;
    border-radius: 15px;
    border: 1px solid #bababa;
    padding: 25px 20px;
  }
  #formStudent h2 {
    font-size: 20px;
    font-weight: bold;
    color: #454545;
  }
  #formStudent #flex {
    display: flex;
    align-items: center;
    gap: 80px;
    flex-wrap: wrap;
  }
  #formStudent1,
  #formStudent2 {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  @media (max-width: 1050px) {
    #formStudent {
      margin-left: 0;
      margin: 10px;
    }
    #formStudent #flex{
      flex-direction: column;
      gap: 20px;
    }
  }
  @media (max-width: 360px){
    #formStudent {
      width: 100%;
    }
  }
`;
