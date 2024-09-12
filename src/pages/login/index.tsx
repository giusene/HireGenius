// src/pages/login/index.tsx

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

// COMPONENTS
import LoginForm from "@/components/Organism/LoginForm/LoginForm";
import PrimaryButton from "@/components/Atoms/Buttons/PrimaryButton/PrimaryButton";

// STYLE
import style from "./login.module.scss";
import Hero from "../../../public/hero.png";

const Login = () => {
  const [error, setError] = useState("");
  const { loginWithGoogle, user } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      alert("Login con Google effettuato con successo!");
    } catch (err) {
      setError("Errore durante il login con Google. Riprova.");
    }
  };

  return (
    <main className={style.main}>
      <div className={style.hero}>
        <Image src={Hero} alt="Hero image" width={545} height={204} />
      </div>

      <div className={style.header}>
        <h1>interViewer</h1>
        <h2>Testa le tue competenze</h2>
      </div>

      <LoginForm />

      <hr />

      <PrimaryButton
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

      {/* {user && <Link href='/protected'>test</Link>} */}
    </main>
  );
};

export default Login;
