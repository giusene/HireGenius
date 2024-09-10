import { useState } from "react";
import { auth } from "../lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registrazione completata con successo!");
      router.push("/login"); // Reindirizza l'utente dopo la registrazione
    } catch (err) {
      setError("Errore durante la registrazione. Riprova.");
    }
  };

  return (
    <div>
      <h1>Registrazione</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrati</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
