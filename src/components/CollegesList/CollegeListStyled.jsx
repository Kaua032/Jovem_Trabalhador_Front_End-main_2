import styled from "styled-components";

export const ListArea = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    gap: 20px;
    padding-top: 20px;
    background-color: white;
    border-radius: 15px;
    border: 1px solid #bababa;
  }
  table {
    width: 100%;
  }
  table thead {
    font-size: 18px;
    font-weight: bold;
    color: #454545;
  }
  table tbody {
    font-size: 15px;
    font-weight: 500;
    color: #525668;
  }
  table th {
    text-align: center;
    padding: 10px;
  }
  table td {
    text-align: center;
    padding: 10px 0px;
  }
  table td input {
    width: 100%;
    border: none;
    text-align: center;
    color: #525668;
  }
  table td input:focus {
    outline: none;
  }
`;
