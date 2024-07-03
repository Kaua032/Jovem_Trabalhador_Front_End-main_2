import { NavbarButton } from "./NavbarComponentStyled";

export default function NavbarComponent({...props}) {
   return <NavbarButton href={props.href} type={props.type}>{props.name}</NavbarButton>;
}
