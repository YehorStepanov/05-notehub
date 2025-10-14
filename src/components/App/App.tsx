import { useState } from "react";
import Modal from "../Modal/Modal";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import type { AddNoteFormValue } from "../../types/note";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
function App() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [request, setRequest] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const { data, isError, isFetching} = useQuery({
    queryKey: ["notes", page, request],
    queryFn: () => fetchNotes(page, request),
    retry: false,
    placeholderData: (prev) => prev,
  });
  const addMutation  = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const addNote = (note: AddNoteFormValue) => {
    addMutation.mutate(note);
  };
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
  const deleteElem = (id: string) => {
    deleteMutation.mutate(id);
  };




  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={setRequest}/>
        {data && data?.totalPages > 1 && <Pagination totalPages={data.totalPages} setPage={setPage} page={page}/>}
        <button onClick={toggleModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isFetching && <Loader />}
      {isError && <ErrorMessage />}
      {openModal && <Modal onClose={toggleModal} addNote={addNote} />}
      {data && data?.totalPages > 0 && <NoteList notes={data.notes} onClick={deleteElem}/>}
    </div>
  );
}

export default App;
