import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineHistory } from "react-icons/md";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";
import { UserDropdown } from "./UserDropdown";
import { NavItem } from "./NavItem";
import { BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { Button } from "./Button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-neutral-800 flex justify-between items-center h-14">
      <div className="flex justify-between items-center py-4 lg:py-2 px-4 w-full lg:w-fit">
        <h2 className="text-white text-2xl">POS</h2>
        <Button
          classes=" text-white lg:hidden z-40"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CgClose size={30} /> : <BiMenu size={30} />}
        </Button>
      </div>
      <nav
        className={`fixed inset-0 bg-neutral-800  ${
          isMenuOpen ? "flex" : "hidden"
        } lg:relative lg:flex lg:bg-transparent z-20`}
      >
        <ul className="flex flex-col gap-2 items-start w-full bg-red-400 pt-12 z-20 lg:bg-transparent lg:flex-row lg:p-0 lg:w-fit lg:items-center lg:h-fit">
          <NavItem
            to="dashboard"
            icon={IoHomeOutline}
            label="Dashboard"
            onClick={closeMenu}
          />
          <NavItem
            to="menu"
            icon={TfiMenuAlt}
            label="Menu"
            onClick={closeMenu}
          />
          <NavItem
            to="history"
            icon={MdOutlineHistory}
            label="History"
            onClick={closeMenu}
          />
          <NavItem
            to="products"
            icon={HiOutlineArchiveBox}
            label="Products"
            onClick={closeMenu}
          />
          <NavItem
            to="settings"
            icon={LuSettings}
            label="Settings"
            onClick={closeMenu}
          />
          <UserDropdown
            classes="border-l order-first my-4 lg:order-last"
            image={""}
          />
        </ul>
      </nav>
    </header>
  );
};
