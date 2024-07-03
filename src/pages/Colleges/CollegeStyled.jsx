import styled from "styled-components";

export const MainCollege = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionCollege = styled.section`
  display: flex;
  justify-content: center;
  gap: 100px;
  padding: 20px;
  flex-wrap: wrap;
  margin-left: 285px;

  #addCollegeArea {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  #addCollegeArea #form-college {
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

  #addCollegeArea #collegesLocalList {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    gap: 25px;
    background-color: white;
    border-radius: 15px;
    border: 1px solid #bababa;
  }
  #addCollegeArea table {
    width: 100%;
  }
  #addCollegeArea table thead {
    font-size: 18px;
    font-weight: bold;
    color: #454545;
  }
  #addCollegeArea table tbody {
    font-size: 12px;
    font-weight: 500;
    color: #525668;
  }
  #local tr td,
  #local tr th {
    padding: 10px 0px;
  }
  table tbody tr {
    border-top: 1px solid #bababa;
  }
  #addCollegeArea table th,
  #addCollegeArea table td {
    text-align: center;
  }
  #addCollegeArea table td button {
    border: none;
    width: 15px;
    height: 16.67px;
    background-image: url("./deleteIcon.png");
    background-color: white;
    background-size: cover;
    background-repeat: no-repeat;
  }
  @media (max-width: 1126px){
    flex-direction: column;
    gap: 20px;
  }
  @media (max-width: 1050px){
    margin: 0;
  }
`;
