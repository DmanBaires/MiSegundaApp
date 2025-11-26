import { Note, NoteFormData } from '@/types/Note';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const savedNotes = await AsyncStorage.getItem('notes');
                if (savedNotes) {
                    // We need to parse dates back from strings because JSON.stringify converts dates to strings
                    const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
                        ...note,
                        createdAt: new Date(note.createdAt),
                        updatedAt: new Date(note.updatedAt),
                    }));
                    setNotes(parsedNotes);
                }
            } catch (error) {
                console.error('Failed to load notes:', error);
            }
        };

        loadNotes();
    }, []);

    const saveNotes = async (newNotes: Note[]) => {
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        } catch (error) {
            console.error('Failed to save notes:', error);
        }
    };

    const addNote = (noteData: NoteFormData): Note => {
        const newNote: Note = {
            ...noteData,
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        saveNotes(updatedNotes);
        return newNote;
    };

    const updateNote = (id: string, noteData: NoteFormData) => {
        const updatedNotes = notes.map(note =>
            note.id === id
                ? { ...note, ...noteData, updatedAt: new Date() }
                : note
        );
        setNotes(updatedNotes);
        saveNotes(updatedNotes);
    };

    const deleteNote = (id: string) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        saveNotes(updatedNotes);
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
