import styled from "styled-components";

export const ButtonArea = styled.button`
    padding: 5px 0px;

    background-color: #F58634;
    color: white;

    border-radius: 20px;
    border: none;

    font-size: 20px;
    font-weight: 600;

    width: ${(props) => props.width};
`