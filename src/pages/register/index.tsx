// src/pages/register.tsx

import { useState } from "react";
import { auth, db } from "../../lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Salva l'utente su Firestore
			await setDoc(doc(db, "users", user.uid), {
				uid: user.uid,
				email: user.email,
			});

			alert("Registrazione completata con successo!");
			router.push("/login"); // Reindirizza l'utente alla pagina di login
		} catch (err) {
			setError("Errore durante la registrazione. Riprova.");
		}
	};

	return (
		<div>
			<h1>Registrazione</h1>
			<form onSubmit={handleRegister}>
				<input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type='submit'>Registrati</button>
			</form>
			{error && <p>{error}</p>}
		</div>
	);
};

export default Register;
