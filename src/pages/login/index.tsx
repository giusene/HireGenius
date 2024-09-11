// src/pages/login.tsx

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const { login, loginWithGoogle, user } = useAuth();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			await login(email, password);
			alert("Login effettuato con successo!");
		} catch (err) {
			setError("Errore durante il login. Verifica le tue credenziali.");
		}
	};

	const handleGoogleLogin = async () => {
		try {
			await loginWithGoogle();
			alert("Login con Google effettuato con successo!");
		} catch (err) {
			setError("Errore durante il login con Google. Riprova.");
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type='submit'>Login</button>
			</form>
			{error && <p>{error}</p>}
			<button onClick={handleGoogleLogin}>Accedi con Google</button>
			<p>
				Non hai un account? <Link href='/register'>Registrati</Link>
			</p>
			{user && <Link href='/protected'>test</Link>}
		</div>
	);
};

export default Login;
