export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  tag: string;
}

export interface AddNoteFormValue{
  title: string;
  content: string;
  tag: string;
}