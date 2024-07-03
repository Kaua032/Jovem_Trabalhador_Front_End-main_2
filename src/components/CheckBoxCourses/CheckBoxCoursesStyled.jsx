import styled from "styled-components";

export const BoxCoursesArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: ${(props) => props.width};
  #AllCourses {
    display: flex;
    flex-direction: column;
    gap: 1px;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    overflow-y: auto;
  }
  p {
    font-size: 12px;
    font-weight: bold;
    color: #454545;
    margin: 0;
  }
  #AllCourses div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  input {
    width: 20px;
    height: 20px;
  }
`;
