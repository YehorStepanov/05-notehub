import axios from "axios";
import type { AddNoteFormValue, Note } from "../types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}
export async function fetchNotes(page:number, search:string ) : Promise<NoteResponse>{
  const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
  const res = await axios.get<NoteResponse>("https://notehub-public.goit.study/api/notes", {
    params:{
        page,
        perPage: 12,
        sortBy: 'created',
        search
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return res.data;
}
export async function createNote(note: AddNoteFormValue) {
  const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
  const res = await axios.post<Note>("https://notehub-public.goit.study/api/notes", note,{
    headers: {
      Authorization: `Bearer ${myKey}`
    }
  });
  return res.data;
}
export async function deleteNote(id: string) {
  const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
  const res = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`,{
    headers: {
      Authorization: `Bearer ${myKey}`
    }
  });
  return res.data;
}
