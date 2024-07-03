import { NavButtonArea } from "./NavModalButtonStyled";

export default function NavModalButton({...props}) {

  function handleClick() {
    props.changeModal(props.idModalButton);
  }

  return <NavButtonArea display={props.display} onClick={handleClick}>{props.text}</NavButtonArea>;
}
