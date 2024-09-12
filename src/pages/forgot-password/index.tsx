import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FirebaseError } from "firebase/app";

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
      setMessage(
        "Email di recupero password inviata con successo. Controlla la tua casella di posta."
      );
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(
          "Errore durante l'invio dell'email di recupero. Verifica l'indirizzo email."
        );
      } else {
        setError("Errore sconosciuto durante il recupero della password.");
      }
    }
  };

  return (
    <div>
      <h1>Recupero Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Inserisci la tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Recupera Password</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Torna al <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
