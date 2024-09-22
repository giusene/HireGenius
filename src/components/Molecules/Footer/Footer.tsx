import { footerLabels } from "@/constants/indexLabels";
import { footerMenu, navMenu } from "@/constants/menuData";
import style from "./Footer.module.scss";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import logo from "@/../public/favicon.ico";

const Footer = () => {
	const { user } = useAuth(); // Usa il contesto di autenticazione

	// Filtra il menu in base all'autenticazione
	const filteredNavMenu = user ? navMenu.filter((item) => item.label !== "Login") : navMenu.filter((item) => item.label === "Login");

	return (
		<footer className={style.footer}>
			<div className={style.footerContainer}>
				<div className={style.footerHeader}>
					<Image src={logo} alt='Logo img' width={80} height={80} priority={false} />
					<h4>{footerLabels.title}</h4>
					<p>{footerLabels.subtitle}</p>
				</div>
				<div className={style.footerMenu}>
					<nav>
						{filteredNavMenu.map((item) => (
							<Link key={item.label} href={item.link}>
								{item.label}
							</Link>
						))}
					</nav>
					<nav>
						{footerMenu.map((item) => (
							<Link key={item.label} href={item.link}>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
