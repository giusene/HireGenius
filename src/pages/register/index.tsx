// src/pages/register.tsx

// COMPONENTS
import RegisterForm from "@/components/Organism/RegisterForm/RegisterForm";
import { registrationFormLabels } from "@/constants/labels";

// STYLE
import style from "./register.module.scss";

const Register = () => {
	return (
		<main className={style.main}>
			{/* NAVBAR BUTTON */}

			<RegisterForm />

			<p className={style.privacyInfo}>{registrationFormLabels.privacyNote}</p>

			{/* {error && <p>{error}</p>} */}
		</main>
	);
};

export default Register;
