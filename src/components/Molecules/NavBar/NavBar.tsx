import { useState } from "react";
import Link from "next/link";
import style from "./NavBar.module.scss";
import { navMenu } from "@/constants/labels";
import { footerMenu } from "@/constants/labels";


const menuData = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Nuovo argomento",
    link: "/nuovo-argomento",
  },
  {
    label: "Nuovo colloquio",
    link: "/nuovo-colloquio",
  },
  {
    label: "Profilo",
    link: "/profilo",
  },
  {
    label: "Impostazioni",
    link: "/impostazioni",
  },
  {
    label: "Logout",
    link: "/logout",
  },
];

const menuFooter = [
  {
    label: "Il progetto",
    link: "/il-progetto",
  },
  {
    label: "GitHub",
    link: "#",
  },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.navContainer}>
      <button onClick={toggleMenu} className={style.menuButton}>
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen && (
        <nav className={style.sidebar}>
          <ul className={style.menuList}>
            {navMenu.map((item) => (
              <li className={style.menuItem}>
                <Link href={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <div className={style.footer}>
            <ul className={style.footerList}>
              {footerMenu.map((item) => (
                <li className={style.menuItem}>
                  <Link href={item.link}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <p>@2024 Interviewer</p>
          </div>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
