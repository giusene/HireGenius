import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <p>© 2024 Interviewer. All rights reserved.</p>
      <nav>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
      </nav>
    </footer>
  );
};

export default Footer;
