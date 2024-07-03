import styled from "styled-components";

export const MainLocalStudents = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ListAreaLocalStudents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-left: 285px;

  #listArea {
    width: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background-color: white;
    padding-top: 20px;
    border-radius: 15px;
    border: 1px solid #bababa;
  }
  #listArea #header_list {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  #listArea #header_list #space {
    width: 170px;
  }
  #listArea #header_list h2 {
    font-size: 20px;
    font-weight: bold;
    color: #454545;
    margin: 0;
  }
  table {
    width: 100%;
  }
  table thead {
    font-size: 18px;
    font-weight: bold;
    color: #454545;
  }
  table {
    text-align: center;
  }
  table tbody tr {
    border-top: 1px solid #bababa;
  }
  table thead tr th,
  table tbody tr td {
    padding: 10px;
  }

  .deleteButton {
    border: none;
    width: 15px;
    height: 16.67px;
    background-image: url("./deleteIcon.png");
    background-color: white;
    background-size: cover;
    background-repeat: no-repeat;
  }
  @media (max-width: 1050px) {
    margin: 0;
    padding: 10px;
  }

  @media (max-width: 800px) {
    #listArea {
      width: 100%;
    }
    #listArea #header_list {
      gap: 10px;
      padding: 10px;
    }
  }
  @media (max-width: 650px) {
    width: 100%;
    #background_listArea {
      width: 100%;
      overflow-x: auto;
    }
    #listArea {
      width: 630px;
    }
  }
`;
