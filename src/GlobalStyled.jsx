import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
}
body{
    max-width: 100vw;
    min-height: 100vh;
    background-color: #F6F7F9;
}
#root{
    height: 100vh;
}
`;
