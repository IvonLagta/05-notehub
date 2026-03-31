import axios, { AxiosResponse } from "axios";
import { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const { page, perPage, search } = params;

  const response: AxiosResponse<FetchNotesResponse> = await instance.get(
    "/notes",
    {
      params: {
        page,
        perPage,
        search,
      },
    },
  );

  return response.data;
};

interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.post("/notes", payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.delete(`/notes/${id}`);
  return response.data;
};
