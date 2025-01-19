import { NavLink } from "react-router-dom";

interface NavMenyIconProps {
  text?: string;
  icon: string;
  iconActive: string;
  to: string;
  white?: boolean;
}

function computeStyles(isWhite: boolean | undefined): string {
  let base =
    "flex flex-col justify-center text-xs items-center space-y-1 w-[10vw] h-[10vw]";
  if (isWhite) base += " text-white";

  return base;
}

function NavMenuIcon(props: NavMenyIconProps) {
  const { text, icon, iconActive, to, white } = props;
  return (
    <NavLink to={to} className={computeStyles(white)}>
      {({ isActive }) => (
        <>
          <img
            src={isActive ? iconActive : icon}
            className="h-[6.7vw] min-h-[25px] w-[6.7vw] min-w-[25px]"
          />
          {text ? <p>{text} </p> : ""}
        </>
      )}
    </NavLink>
  );
}

export default NavMenuIcon;
