import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { fetchNotes, createNote } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm, { type NoteFormValues } from "../NoteForm/NoteForm";

export default function App() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, perPage],
    queryFn: () => fetchNotes(page, search || undefined, perPage),
    placeholderData: keepPreviousData,
    // enabled: search.trim().length > 0,
  });

  // Mutation для створення нотатки==============
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error("Error creating note:", error);
      alert("Failed to create note. Please try again.");
    },
  });
  //=============================================

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (newSearch: string) => {
    debouncedSearch(newSearch);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCreateNote = (values: NoteFormValues) => {
    createNoteMutation.mutate(values);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />
        <Pagination
          totalPages={data?.totalPages || 0}
          currentPage={page}
          onPageChange={handlePageChange}
        />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <strong>Loading...</strong>}
      {isError && <strong>Error!!!</strong>}
      {data && data.notes.length > 0 && <NoteList items={data.notes} />}
      {data && data?.notes.length === 0 && <p>No notes found</p>}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onSubmit={handleCreateNote}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
