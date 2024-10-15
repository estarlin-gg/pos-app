import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: IconType;
  label: string;
  onClick?: () => void;
}

export const NavItem = ({ to, icon: Icon, label, onClick }: NavItemProps) => (
  <li className="w-full lg:w-fit">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center capitalize font-medium p-4 lg:p-2 rounded-md hover:bg-slate-50 hover:text-black w-full ${
          isActive ? "bg-white" : "text-white"
        }`
      }
      onClick={onClick}
    >
      <Icon className="text-lg mr-2" />
      <span className="text-sm">{label}</span>
    </NavLink>
  </li>
);
