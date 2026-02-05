export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: NoteTag;
}
    // overview: string;
    // release_date: string;
    // vote_average: number;
    // poster_path: string;
    // backdrop_path: string;