// src/pages/login/index.tsx

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router"; // Importa il router di Next.js

// COMPONENTS
import LoginForm from "@/components/Organism/LoginForm/LoginForm";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";

// STYLE
import style from "./login.module.scss";
import Hero from "../../../public/hero.png";

const Login = () => {
  const { loginWithGoogle } = useAuth();
  const router = useRouter(); // Inizializza il router

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      console.log("Login con Google effettuato con successo!");
      router.push("/landing-page"); // Reindirizza alla pagina desiderata
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className={style.main}>
      <div className={style.hero}>
        <Image
          src={Hero}
          alt="Hero image"
          width={545}
          height={204}
          priority={true}
        />
      </div>

      <div className={style.header}>
        <h1>interViewer</h1>
        <h2>Testa le tue competenze</h2>
      </div>

      <LoginForm />

      <hr />

      <CtaButton
        label="Accedi con Google"
        className="ctaB"
        onClick={handleGoogleLogin}
      />

      <p className={style.register}>
        Non hai un account?{" "}
        <Link className={style.registerLink} href="/register">
          Registrati
        </Link>
      </p>
    </main>
  );
};

export default Login;
