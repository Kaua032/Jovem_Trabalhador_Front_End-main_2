import styled from "styled-components";

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${(props) => props.width};
  p {
    font-size: 12px;
    font-weight: bold;
    color: #454545;
    margin: 0;
  }
  label {
    font-size: 12px;
    font-weight: bold;
    color: #454545;
    margin: 0;
  }
  input {
    color: #454545;
    border: 1px solid #bababa;
    border-radius: 20px;
    height: 40px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;
