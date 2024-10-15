import { useAuth } from "../context/AuthProvider";

import { Avatar } from "./Avatar";

interface Props {
  classes: string;
  image: string;
}

export const UserDropdown = ({ classes }: Props) => {
  const { LogOut } = useAuth();
  return (
    <div
      tabIndex={0}
      className={`${classes} dropdown dropdown-end min-w-[150px] cursor-pointer `}
    >
      <Avatar />
      <ul
        tabIndex={1}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow space-y-2"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a onClick={LogOut} className="bg-error text-white">
            Log Out
          </a>
        </li>
      </ul>
    </div>
  );
};
