import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import TextAreaBox from "@/components/Molecules/TextAreaBox/TextAreaBox";
import { customFormLabels } from "@/constants/menuData";

import style from "./InterviewRequirements.module.scss";
import { useState } from "react";

interface InterviewRequirementsProps {
  onSubmit: (interviewRequirements: string) => void;
}

const InterviewRequirements = (props: InterviewRequirementsProps) => {
  const { onSubmit } = props;

  const [requirements, setRequirements] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ requirements });
    onSubmit(requirements);
  };

  return (
    <main className={style.main}>
      <header className={style.header}>
        <h2 className={style.sectionTitle}>{customFormLabels.title}</h2>
      </header>

      <form onSubmit={handleSubmit}>
        <TextAreaBox
          name="interviewDetails"
          label="Puoi scrivere qui i requisiti specifici per il colloquio che vuoi affrontare."
          placeholder="I requisiti sono..."
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          required={false}
        />
        <CtaButton type="submit" label={customFormLabels.button} className="ctaB" />
      </form>
    </main>
  );
};

export default InterviewRequirements;
