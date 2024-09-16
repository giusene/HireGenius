import React, { useState } from "react";
import {
  newInterviewFormLabels,
  interviewFormOptions,
} from "@/constants/menuData";
import Input from "@/components/Atoms/Input/Input";
import Label from "@/components/Atoms/Label/Label";
import style from "./new-interview.module.scss";
import Image from "next/image";
import immagine from "@/../public/nuovocolloquio.png";
import CtaButton from "@/components/Atoms/Buttons/CtaButton";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";

interface InterviewFormProps {
  // Qui puoi aggiungere eventuali props che vuoi passare al componente
}

const NewInterview: React.FC<InterviewFormProps> = () => {
  const [role, setRole] = useState("");
  const [seniority, setSeniority] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui gestisci l'invio del form, ad esempio inviando i dati a un backend
    console.log("Dati del colloquio:", {
      role,
      seniority,
      numberOfQuestions,
      duration,
    });
  };

  return (
    <div className={style.newInterview}>
      <h2>{newInterviewFormLabels.newInterviewTitle}</h2>
      <div className={style.hero}>
        <Image
          className={style.interviewImg}
          src={immagine}
          alt="Interview"
          width={400}
          height={200}
          priority={true}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <Label name="role" label={newInterviewFormLabels.roleLabel} />
          <Input
            type={"text"}
            name={"role"}
            label={newInterviewFormLabels.roleLabel}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div>
          <SelectBox
            name="seniority"
            label={newInterviewFormLabels.seniorityLabel}
            value={seniority}
            onChange={(e) => setSeniority(e.target.value)}
            required={false}
            options={interviewFormOptions.seniority}
          />
        </div>

        <div>
          <SelectBox
            name="numberOfQuestions"
            label={newInterviewFormLabels.numberOfQuestionsLabel}
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(e.target.value)}
            required={false}
            options={interviewFormOptions.numberOfQuestions}
          />
        </div>
        <div>
          <SelectBox
            name="duration"
            label={newInterviewFormLabels.testDurationLabel}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required={false}
            options={interviewFormOptions.testDuration}
          />
        </div>
        <CtaButton
          type="submit"
          label={newInterviewFormLabels.buttonsNext}
          className="ctaB"
        />
      </form>
    </div>
  );
};

export default NewInterview;
