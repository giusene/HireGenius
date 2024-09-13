import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

// COMPONENTS
import CtaButton from "@/components/Atoms/Buttons/CtaButton";

// STYLE
import style from "../Form.module.scss";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import Link from "next/link";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const { login } = useAuth();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");


    try {
      await login(email, password);
    } catch (error) {
      setError("Le credenziali inserite non sono corrette.");
    }
  };

	return (
		<form className={style.form} onSubmit={handleLogin}>
			<InputBox type='email' name='userEmail' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />

			<InputBox type='password' name='userPassword' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} required={true} />

			<p className={style.forgotPassword}>
				<Link href='/forgot-password'>Hai dimenticato la password?</Link>
			</p>

			{error && <mark className={style.invalid}>{error}</mark>}

			<CtaButton label='Accedi' className='ctaA' type='submit' />
		</form>
	);
};

export default LoginForm;
