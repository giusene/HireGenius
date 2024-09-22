import React from "react";
import style from "./ConfirmDeletePopup.module.scss";
import CtaButton from "../Buttons/CtaButton";

interface ConfirmDeletePopupProps {
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({ message, isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={style.overlay}>
      <div className={style.popup}>
        {/* <h3>Un momento!</h3> */}
        <h4>{message}</h4>
        <div className={style.buttons}>
          <CtaButton label="Annulla" className="ctaA" onClick={onCancel} />
          <CtaButton label="Conferma" className="ctaC" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
