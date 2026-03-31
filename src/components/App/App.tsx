import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import css from "./App.module.css";

import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import { fetchNotes } from "../../services/noteService";

export default function App() {
  const [page, setPage] = useState<number>(0); // 0-based
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(0);
  }, 300);

  const { data } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () =>
      fetchNotes({
        page: page + 1,
        perPage: 12,
        search,
      }),
    placeholderData: (previousData) => previousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={debouncedSearch} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ["notes"] });
              setIsOpen(false);
            }}
            onCancel={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
