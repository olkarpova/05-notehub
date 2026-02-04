export type NoteTag = "Todo" | "Work" | "Personal" | "Important" | "Ideas";

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: string;
}
    // overview: string;
    // release_date: string;
    // vote_average: number;
    // poster_path: string;
    // backdrop_path: string;