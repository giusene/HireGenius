import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { recoveryPasswordLabels } from "@/constants/labels";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await resetPassword(email);
      setMessage(recoveryPasswordLabels.loginLabel);
    } catch (err: any) {
      setError(recoveryPasswordLabels.messagesSuccess);
    }
  };

  return (
    <div>
      <h1>{recoveryPasswordLabels.title}</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder={recoveryPasswordLabels.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{recoveryPasswordLabels.buttonRecovery}</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        {recoveryPasswordLabels.linkText} <Link href={recoveryPasswordLabels.linkText}>{recoveryPasswordLabels.linkText}</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
