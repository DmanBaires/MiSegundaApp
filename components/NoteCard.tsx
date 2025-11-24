import { useNotes } from '@/contexts/NotesContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Note } from '@/types/Note';
import { Image } from 'expo-image';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { IconSymbol } from './ui/icon-symbol';

interface NoteCardProps {
    note: Note;
    onPress: () => void;
}

export function NoteCard({ note, onPress }: NoteCardProps) {
    const { deleteNote } = useNotes();
    const backgroundColor = useThemeColor({}, 'background');
    const borderColor = useThemeColor({ light: '#E5E5E7', dark: '#38383A' }, 'border');
    const subtleTextColor = useThemeColor({ light: '#8E8E93', dark: '#98989D' }, 'text');

    const handleDelete = () => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteNote(note.id),
                },
            ]
        );
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const noteDate = new Date(date);
        const diffInMs = now.getTime() - noteDate.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return 'Today';
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        } else {
            return noteDate.toLocaleDateString();
        }
    };

    const truncateContent = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <ThemedView style={[styles.card, { backgroundColor, borderColor }]}>
                <View style={styles.content}>
                    {note.imageUri && (
                        <Image
                            source={{ uri: note.imageUri }}
                            style={styles.thumbnail}
                            contentFit="cover"
                        />
                    )}
                    <View style={styles.textContent}>
                        <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
                            {note.title}
                        </ThemedText>
                        <ThemedText style={styles.preview} numberOfLines={3}>
                            {truncateContent(note.content)}
                        </ThemedText>
                        <ThemedText style={[styles.date, { color: subtleTextColor }]}>
                            {formatDate(note.updatedAt)}
                        </ThemedText>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDelete}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <IconSymbol name="trash" size={20} color="#FF3B30" />
                </TouchableOpacity>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    content: {
        flexDirection: 'row',
        gap: 12,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    textContent: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontSize: 18,
        marginBottom: 4,
    },
    preview: {
        fontSize: 14,
        opacity: 0.8,
        lineHeight: 20,
    },
    date: {
        fontSize: 12,
        marginTop: 4,
    },
    deleteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 4,
    },
});
