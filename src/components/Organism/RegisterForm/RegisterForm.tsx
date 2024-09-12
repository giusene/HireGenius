import { useState } from "react";
import { auth, db } from "../../../lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

// COMPONENTS

// STYLE
import style from "../Form.module.scss";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import PrimaryButton from "@/components/Atoms/Buttons/PrimaryButton/PrimaryButton";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";

const options = [
	{
		label: "Junior",
		value: "junior",
	},
	{
		label: "Mid-level",
		value: "mid-level",
	},
	{
		label: "Senior",
		value: "senior",
	},
];

const RegisterForm = () => {
	const [userName, setUserName] = useState("");
	const [userRole, setUserRole] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userSeniority, setUserSeniority] = useState("");

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
		<form className={style.form} onSubmit={handleRegister}>
			<InputBox type='text' name='userName' label='Username' value={userName} onChange={(e) => setUserName(e.target.value)} required={true} />

			<InputBox type='text' name='userRole' label='Role' value={userRole} onChange={(e) => setUserRole(e.target.value)} required={false} />

			<SelectBox name='seniority' label='Seniority' value={userSeniority} onChange={(e) => setUserSeniority(e.target.value)} required={false} options={options} />

			<InputBox type='email' name='userEmail' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />

			<InputBox type='password' name='userPassword' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} required={true} />

			{error && <mark className={style.invalid}>{error}</mark>}

			<PrimaryButton label='Registrati' className='ctaA' type='submit' />
		</form>
	);
};

export default RegisterForm;