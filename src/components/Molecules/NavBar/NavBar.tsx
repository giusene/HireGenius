import { useState } from "react";
import Link from "next/link";
import style from "./NavBar.module.scss";
import { navMenu, footerMenu } from "@/constants/menuData";
import ActionButton from "@/components/Atoms/Buttons/ActionButton";
import MenuIcon from "../../../../public/icons/menu-icon.png";
import { useAuth } from "@/context/AuthContext"; // Importa il contesto di autenticazione

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAuth(); // Usa il contesto di autenticazione

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // Filtra il menu in base all'autenticazione
  const filteredNavMenu = user
    ? navMenu
    : navMenu.filter((item) => item.label === "Home" || item.label === "Login");

  return (
    <div className={style.navContainer} onMouseLeave={() => setIsOpen(false)}>
      {!isOpen && (
        <ActionButton onClick={toggleMenu} className="round" icon={MenuIcon} />
      )}

      {isOpen && (
        <nav className={style.sidebar}>
          <ul className={style.menuList}>
            {filteredNavMenu.map((item) => (
              <li key={item.label} className={style.menuItem}>
                <Link href={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <footer className={style.footer}>
            <hr />
            <ul className={style.footerList}>
              {footerMenu.map((item) => (
                <li key={item.label} className={style.menuItem}>
                  <Link href={item.link}>{item.label}</Link>
                </li>
              ))}
              <p>@2024 Interviewer</p>
            </ul>
          </footer>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
