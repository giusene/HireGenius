
import HomeIcon from "@/../public/icons/home.png";
import TopicIcon from "@/../public/icons/topic.png";
import InterviewIcon from "@/../public/icons/interview.png";
import ProfileIcon from "@/../public/icons/profile.png";
import SettingsIcon from "@/../public/icons/settings.png";
import LogoutIcon from "@/../public/icons/logout.png";

export const navMenu = [
  {
    icon: HomeIcon,
    label: "Home",
    link: "/",
  },
  {
    icon: TopicIcon,
    label: "Nuovo argomento",
    link: "/topic-process",
  },
  {
    icon: InterviewIcon,
    label: "Nuovo colloquio",
    link: "/new-interview",
  },
  {
    icon: ProfileIcon,
    label: "Profilo",
    link: "/profilo",
  },
  {
    icon: SettingsIcon,
    label: "Impostazioni",
    link: "/impostazioni",
  },
  {
    icon: LogoutIcon,
    label: "Logout",
    link: "/logout",
  },
  {
    icon: LogoutIcon,
    label: "Login",
    link: "/login",
  },
];

export const footerMenu = [
	{
		label: "Il progetto",
		link: "/project-page",
	},
	{
		label: "Github",
		link: "#",
	},
];

export const loginLabels = {
	appName: "interViewer",
	tagline: "Testa le tue competenze",
	emailLabel: "Email",
	passwordLabel: "Password",
	forgotPasswordLink: "Hai dimenticato la password?",
	buttonLogin: "Accedi",
	loginWithGoogle: "Accedi con Google",
	text: "Non hai un account?",
	action: "Registrati",
};

export const registrationFormLabels = {
	usernameLabel: "Username",
	roleLabel: "Role",
	seniorityLabel: "Seniority",
	email: "Email",
	password: "Password",
	confirmPassword: "Confirm password",
	buttonsRegister: "Registrati",
	privacyNote: "I tuoi dati saranno protetti secondo GDPR e usati soltanto per personalizzare la tua esperienza.",
};

export const recoveryPasswordLabels = {
	title: "Recupero Password",
	placeholder: "Inserisci la tua email",
	buttonRecovery: "Recupera Password",
	messagesSuccess: "La tua richiesta è stata inviata con successo. Controlla la tua email per ulteriori istruzioni.",
	messagesError: "Si è verificato un errore durante il recupero della password. Per favore, riprova.",
	linkText: "Torna al",
	loginLabel: "Login",
	href: "/login",
};

export const newInterviewFormLabels = {
	newInterviewTitle: "Nuovo colloquio",
	roleLabel: "Ruolo",
	seniorityLabel: "Seniority",
	numberOfQuestionsLabel: "Numero di domande",
	testDurationLabel: "Durata del test",
	buttonsNext: "Avanti",
};

export const interviewFormOptions = {
	seniority: [
		{ label: "Junior", value: "junior" },
		{ label: "Mid-level", value: "mid-level" },
		{ label: "Senior", value: "senior" },
	],
	numberOfQuestions: [
		{ label: "5", value: "5 domande" },
		{ label: "10", value: "10 domande" },
		{ label: "15", value: "15 domande" },
	],
	testDuration: [
		{ label: "10", value: "10 minuti" },
		{ label: "20", value: "20 minuti" },
		{ label: "30", value: "30 minuti" },
	],
};

export const customFormLabels = {
	title: "Nuovo Argomento",
	topicLabel: "Argomento",
	level: "Livello",
	numberOfQuestionsLabel: "Numero di domande",
	testDurationLabel: "Durata del test",
	button: "Avanti",
};

export const customFormOptions = {
  optionsLevel: [
    {
      label: "Base",
      value: "Base",
    },
    {
      label: "Intermedio",
      value: "Intermedio",
    },
    {
      label: "Avanzato",
      value: "Avanzato",
    },
  ],
  optionsQuestion: [
    {
      label: "5 domande",
      value: "5 domande",
    },
    {
      label: "10 domande",
      value: "10 domande",
    },
    {
      label: "15 domande",
      value: "15 domande",
    },
  ],
  optionsDuration: [
    {
      label: "10 minuti",
      value: "10 minuti",
    },
    {
      label: "20 minuti",
      value: "20 minuti",
    },
    {
      label: "30 minuti",
      value: "30 minuti",
    },
  ],
};
