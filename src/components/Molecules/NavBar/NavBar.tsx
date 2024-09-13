import { useState } from "react";
import Link from "next/link";
import style from "./NavBar.module.scss";
import { navMenu, footerMenu } from "@/constants/menuData";
import ActionButton from "@/components/Atoms/Buttons/ActionButton";

import MenuIcon from "../../../../public/menu-icon.png";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleMenu = (): void => {
		setIsOpen(!isOpen);
	};
	return (
		<div className={style.navContainer} onMouseLeave={() => setIsOpen(false)}>
			{!isOpen && <ActionButton onClick={toggleMenu} className='round' icon={MenuIcon} />}

			{isOpen && (
				<nav className={style.sidebar}>
					<ul className={style.menuList}>
						{navMenu.map((item) => (
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
