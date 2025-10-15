import { useState } from "react";
import Modal from "../Modal/Modal";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import NoteForm from "../NoteForm/NoteForm";
function App() {
  const [page, setPage] = useState<number>(1);
  const [request, setRequest] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const { data, isError, isFetching } = useQuery({
    queryKey: ["notes", page, request],
    queryFn: () => fetchNotes(page, request),
    retry: false,
    placeholderData: (prev) => prev,
  });

  const onChangeRequest = (newRequest: string) => {
    setPage(1);
    setRequest(newRequest);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={onChangeRequest} />
        {data && data?.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            setPage={setPage}
            page={page}
          />
        )}
        <button onClick={toggleModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isFetching && <Loader />}
      {isError && <ErrorMessage />}
      {openModal && (
        <Modal
          onClose={toggleModal}
          children={<NoteForm onClose={toggleModal} />}
        />
      )}
      {data && data?.totalPages > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default App;
