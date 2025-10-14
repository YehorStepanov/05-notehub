import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import type { AddNoteFormValue} from "../../types/note";

interface ModalProps {
  onClose: () => void;
  addNote: (note: AddNoteFormValue) =>void;
}

export default function Modal({ onClose, addNote}: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose} addNote={addNote}/>
      </div>
    </div>,
    document.body
  );
}
