import { footerLabels } from "@/constants/indexLabels";
import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <p>{footerLabels.reserved}</p>
      <nav>
        <a href="#privacy">{footerLabels.privacy}</a>
        <a href="#terms">{footerLabels.terms}</a>
      </nav>
    </footer>
  );
};

export default Footer;