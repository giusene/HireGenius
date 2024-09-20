import style from "./forgotPassword.module.scss";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FirebaseError } from "firebase/app";
import { forgotPasswordLabels } from "@/constants/forgotPasswordLabels";
import Input from "@/components/Atoms/Input/Input";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const messageRef = useRef<HTMLDivElement>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await resetPassword(email);
      setMessage(forgotPasswordLabels.setMessage);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(forgotPasswordLabels.setError);
      } else {
        setError(forgotPasswordLabels.unknownError);
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      messageRef.current &&
      !messageRef.current.contains(event.target as Node)
    ) {
      setMessage("");
      setError("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={style.main}>
      <div className={style.mainContent}>
        <h1>{forgotPasswordLabels.title}</h1>
        <form onSubmit={handleResetPassword} className={style.form}>
          <Input
            type="email"
            name="Email"
            label={forgotPasswordLabels.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={false}
          />
          <CtaButton
            label={forgotPasswordLabels.button}
            className="ctaA"
            type="submit"
          />
        </form>

        {(message || error) && (
          <div ref={messageRef} className={style.messageContainer}>
            {message && <p className={style.message}>{message}</p>}
            {error && <p className={style.error}>{error}</p>}
          </div>
        )}

        <p>
          <Link href="/login" className={style.login}>
            {forgotPasswordLabels.login}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
