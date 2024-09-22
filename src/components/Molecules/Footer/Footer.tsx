import { footerLabels } from "@/constants/indexLabels";
import { footerMenu } from "@/constants/menuData";
import style from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className={style.footer}>
			<div className={style.footerContainer}>
				<div className={style.footerHeader}>
					<h4>{footerLabels.title}</h4>
					<p>{footerLabels.subtitle}</p>
				</div>
				<div className={style.footerMenu}>
					<nav>
						<Link href={"/topic-process"}>Nuovo Argomento</Link>
						<Link href={"/interview-process"}>Nuovo Colloquio</Link>
						<Link href={"/storic-profile"}>Profilo</Link>
					</nav>
					<nav>
						{footerMenu.map((item) => {
							return <Link href={item.link}>{item.label}</Link>;
						})}
					</nav>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
