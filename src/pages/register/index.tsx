// src/pages/register.tsx

// COMPONENTS
import RegisterForm from "@/components/Organism/RegisterForm/RegisterForm";

// STYLE
import style from "./register.module.scss";

const Register = () => {
	return (
		<main className={style.main}>
			<header className={style.header}>
				<h2 className={style.sectionTitle}>Registrati</h2>
			</header>

			<RegisterForm />

			<p className={style.privacyInfo}>I tuoi dati saranno protetti secondo GDPR e usati soltanto per personalizzare la tua esperienza</p>

			{/* {error && <p>{error}</p>} */}
		</main>
	);
};

export default Register;
