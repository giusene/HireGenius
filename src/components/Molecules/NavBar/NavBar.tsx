import { useState } from "react";
import Link from "next/link";
import style from "./NavBar.module.scss";

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
            <li className={style.menuItem}>
              <Link href="/">Home</Link>
            </li>
            <li className={style.menuItem}>
              <Link href="/nuovo-argomento">Nuovo argomento</Link>
            </li>
            <li className={style.menuItem}>
              <Link href="/nuovo-colloquio">Nuovo colloquio</Link>
            </li>
            <li className={style.menuItem}>
              <Link href="/profilo">Profilo</Link>
            </li>
            <li className={style.menuItem}>
              <Link href="/impostazioni">Impostazioni</Link>
            </li>
            <li className={style.menuItem}>
              <Link href="/logout">Logout</Link>
            </li>
          </ul>

          <div className={style.footer}>
            <ul className={style.footerList}>
              <li>
                <Link href="/il-progetto">Il progetto</Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
            <p>@2024 Interviewer</p>
          </div>
        </nav>
      )}
    </div>
  );
};

export default NavBar;