import { useState } from "react";
import Link from "next/link";
import style from "./NavBar.module.scss";
import { navMenu } from "@/constants/menuData";
import { footerMenu } from "@/constants/menuData";
import ActionButton from "@/components/Atoms/Buttons/ActionButton";

import MenuIcon from "../../../../public/menu-icon.png";

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
	// onMouseLeave={() => setIsOpen(false)}
	return (
		<div className={style.navContainer}>
			{!isOpen && <ActionButton onClick={toggleMenu} className='round' icon={MenuIcon} />}

			{isOpen && (
				<nav className={style.sidebar}>
					<ul className={style.menuList}>
						{navMenu.map((item) => (
							<li className={style.menuItem}>
								<Link href={item.link}>{item.label}</Link>
							</li>
						))}
					</ul>

					<footer className={style.footer}>
						<hr />
						<ul className={style.footerList}>
							{footerMenu.map((item) => (
								<li className={style.menuItem}>
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
