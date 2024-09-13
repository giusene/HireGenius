export const navMenu = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Nuovo argomento",
    link: "/new-topic",
  },
  {
    label: "Nuovo colloquio",
    link: "/new-interview",
  },
  {
    label: "Profilo",
    link: "/profilo",
  },
  {
    label: "Impostazioni",
    link: "/impostazioni",
  },
  {
    label: "Logout",
    link: "/logout",
  },
];

export const footerMenu = [
  {
    label: "Il progetto",
    link: "/il-progetto",
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
  privacyNote:
    "I tuoi dati saranno protetti secondo GDPR e usati soltanto per personalizzare la tua esperienza.",
};

export const recoveryPasswordLabels = {
  title: "Recupero Password",
  placeholder: "Inserisci la tua email",
  buttonRecovery: "Recupera Password",
  messagesSuccess:
    "La tua richiesta è stata inviata con successo. Controlla la tua email per ulteriori istruzioni.",
  messagesError:
    "Si è verificato un errore durante il recupero della password. Per favore, riprova.",
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
  optionsLevel: ["Base", "Intermedio", "Avanzato"],
  optionsQuestion: ["5 domande", "10 domande", "15 domande"],
  optionsDuration: ["10 minuti", "20 minuti", "30 minuti"],
};
