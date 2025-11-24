import { Note, NoteFormData } from '@/types/Note';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface NotesContextType {
    notes: Note[];
    addNote: (noteData: NoteFormData) => Note;
    updateNote: (id: string, noteData: NoteFormData) => void;
    deleteNote: (id: string) => void;
    getNoteById: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (noteData: NoteFormData): Note => {
        const newNote: Note = {
            ...noteData,
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        setNotes(prevNotes => [newNote, ...prevNotes]);
        return newNote;
    };

    const updateNote = (id: string, noteData: NoteFormData) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === id
                    ? { ...note, ...noteData, updatedAt: new Date() }
                    : note
            )
        );
    };

    const deleteNote = (id: string) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    };

    const getNoteById = (id: string): Note | undefined => {
        return notes.find(note => note.id === id);
    };

    return (
        <NotesContext.Provider
            value={{ notes, addNote, updateNote, deleteNote, getNoteById }}
        >
            {children}
        </NotesContext.Provider>
    );
}

export function useNotes() {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
}
