import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NodeListProps{
  notes: Note[],
  onClick: (id: string)=>void
}

export default function NoteList({notes, onClick}:NodeListProps) {
  return (
    <ul className={css.list}>
      { notes.map((note : Note)=>{
        return <li key={note.id} className={css.listItem}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note.tag}</span>
          <button onClick={()=>onClick(note.id)} className={css.button}>Delete</button>
        </div>
      </li>
      })}
    </ul>
  );
}
