import style from "./choose-interviewer.module.scss";
import { FormEvent, useState } from "react";
import Avatar1 from "@/../public/avatar1.png";
import Avatar2 from "@/../public/avatar2.png";
import Avatar3 from "@/../public/avatar3.png";
import Avatar4 from "@/../public/avatar4.png";
import Image from "next/image";
import InterviewerBadge from "@/components/Atoms/InterviewerBadge/InterviewerBadge";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";

export const profiles = [
  {
    avatarSrc: Avatar1,
    name: "Giulia",
    value: "giulia",
    shortBio: "Solare ed empatica. Ti farà sentire a tuo agio.",
    longBio:
      "Solare ed empatica, mette gli altri a proprio agio e mantiene un livello semplice e diretto di domande, come: -Puoi parlarmi un po’ di te?- o -Perché ti piacerebbe lavorare qui?-. Si interessa alle motivazioni personali e alle qualità individuali.",
    level: "semplice",
    className: "semplice",
  },
  {
    avatarSrc: Avatar2,
    name: "Alessandro",
    value: "alessandro",
    shortBio: "Analitico e diretto. Indagherà come affronti le sfide.",
    longBio:
      "Analitico e diretto, con uno stile di comunicazione chiaro e conciso. Le sue domande, come: -Puoi descrivermi una situazione in cui hai affrontato una difficoltà sul lavoro e come l’hai risolta?- riflettono il desiderio di comprendere come gli altri si confrontano con sfide simili e quale approccio adottano per ottenere risultati concreti.",
    level: "semplice",
    className: "semplice",
  },
  {
    avatarSrc: Avatar3,
    name: "Marco",
    value: "marco",
    shortBio: "Determinato ed esigente. Ti metterà alla prova.",
    longBio:
      "Determinato ed esigente. Domande come: -Qual è stato il tuo più grande fallimento e cosa hai imparato da esso?- o -Perché dovremmo scegliere te rispetto agli altri candidati?- mettono alla prova l'interlocutore. Affronta anche temi come la gestione dei conflitti. Domande, come -Come gestisci un conflitto con un collega o con un superiore?-, mostrano la sua attenzione alla risoluzione di problemi efficace.",
    level: "equo",
    className: "equo",
  },
  {
    avatarSrc: Avatar4,
    name: "Luca",
    value: "luca",
    shortBio:
      "Proverà a mettere in luce i tuoi punti di forza e le tue fragilità.",
    longBio:
      "Ama mettere alla prova i candidati con domande trabocchetto, come: -Se fossi il mio capo e dovessi valutare questa tua intervista, quale aspetto ritieni sia stato il tuo punto debole?- per testare la capacità di mantenere la calma sotto pressione. Usa queste tecniche per valutare non solo la competenza. È un intervistatore che mira a mettere in luce non solo i punti di forza, ma anche le possibili fragilità.",
    level: "equo",
    className: "equo",
  },
  {
    avatarSrc: Avatar2,
    name: "Ivan",
    value: "ivan",
    shortBio:
      "Proverà a mettere in luce i tuoi punti di forza e le tue fragilità.",
    longBio:
      "Ama mettere alla prova i candidati con domande trabocchetto, come: -Se fossi il mio capo e dovessi valutare questa tua intervista, quale aspetto ritieni sia stato il tuo punto debole?- per testare la capacità di mantenere la calma sotto pressione. Usa queste tecniche per valutare non solo la competenza. È un intervistatore che mira a mettere in luce non solo i punti di forza, ma anche le possibili fragilità.",
    level: "arduo",
    className: "arduo",
  },
  {
    avatarSrc: Avatar1,
    name: "Elena",
    value: "elena",
    shortBio: "Una leader capace di vedere oltre l’immediato.",
    longBio:
      "Una leader capace di vedere oltre l’immediato e di sviluppare strategie che abbiano un impatto duraturo e significativo. Quando chiede di descrivere una decisione impopolare e come è stata gestita dimostra la sua comprensione del fatto che le decisioni difficili sono inevitabili e che il modo in cui vengono affrontate è cruciale per il successo.",
    level: "avanzato",
    className: "avanzato",
  },
];

interface ChooseInterviewerProps {
  onInterviewerSelect: (selectedInterviewer: (typeof profiles)[0]) => void;
}

const ChooseInterviewer: React.FC<ChooseInterviewerProps> = ({
  onInterviewerSelect,
}) => {
  const [selectedInterviewer, setSelectedInterviewer] = useState<
    (typeof profiles)[0] | null
  >(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedInterviewer) {
      onInterviewerSelect(selectedInterviewer);
    }
  };

  return (
    <main className={style.main}>
      <header className={style.header}>
        <h2 className={style.sectionTitle}>Nuovo argomento</h2>
      </header>

      <form onSubmit={handleSubmit} className={style.interviewerForm}>
        <div className={style.avatarGrid}>
          {profiles.map((profile) => (
            <label
              key={profile.value}
              className={`${
                selectedInterviewer?.value === profile.value
                  ? `${style.label} ${style.selected}`
                  : style.label
              }`}
              htmlFor={profile.value}
            >
              <div>
                <div className={style.avatar}>
                  <Image
                    className={style.avatarImg}
                    src={profile.avatarSrc}
                    alt={`Avatar ${profile.name}`}
                    width={1000}
                    height={1000}
                    priority
                  />
                </div>
                <h3 className={style.avatarName}>{profile.name}</h3>
                <p className={style.avatarBio}>{profile.shortBio}</p>
              </div>
              <InterviewerBadge
                label={profile.level}
                className={profile.className}
              />
              <input
                type="radio"
                name="interviewer"
                id={profile.value}
                value={profile.value}
                onChange={() => setSelectedInterviewer(profile)}
                required={false}
                className={style.radio}
              />
            </label>
          ))}
        </div>

        <CtaButton label="Cominciamo!" className="ctaA" type="submit" />
      </form>
    </main>
  );
};

export default ChooseInterviewer;
