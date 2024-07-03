import styled from "styled-components";

export const MainParty = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionParty = styled.section`
  display: flex;
  justify-content: center;
  gap: 100px;
  padding: 20px;
  flex-wrap: wrap;
  margin-left: 285px;

  #addPartyArea {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  #addPartyArea #form-party {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px 25px;
    background-color: white;
    border-radius: 15px;
    border: 1px solid #bababa;
  }
  h2 {
    font-size: 20px;
    font-weight: bold;
    color: #454545;
  }

  #addPartyArea #partysLocalList {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    gap: 25px;
    background-color: white;
    border-radius: 15px;
    border: 1px solid #bababa;
  }
  #addPartyArea table {
    width: 100%;
  }
  #addPartyArea table thead {
    font-size: 18px;
    font-weight: bold;
    color: #454545;
  }
  #local tr th {
    text-align: center;
    padding: 10px 0px;
  }
  table tbody tr {
    border-top: 1px solid #bababa;
  }
  #addPartyArea table tbody {
    font-size: 12px;
    font-weight: 500;
    color: #525668;
  }
  #addPartyArea table th p {
    text-align: center;
  }
  #addPartyArea table th button {
    border: none;
    width: 15px;
    height: 16.67px;
    background-image: url("./deleteIcon.png");
    background-color: white;
    background-size: cover;
    background-repeat: no-repeat;
  }
  @media (max-width: 1126px) {
    flex-direction: column;
    gap: 20px;
  }
  @media (max-width: 1050px) {
    margin: 0;
  }
`;
