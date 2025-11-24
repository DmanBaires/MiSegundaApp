import { NoteCard } from '@/components/NoteCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useNotes } from '@/contexts/NotesContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

export default function NotesListScreen() {
  const { notes } = useNotes();
  const [refreshing, setRefreshing] = React.useState(false);
  const tintColor = useThemeColor({}, 'tint');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh - in real app this might fetch from API
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  const handleNotePress = (noteId: string) => {
    // Navigate to edit screen (we'll use the explore tab for editing)
    router.push({
      pathname: '/explore',
      params: { noteId },
    });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol name="note.text" size={80} color={tintColor} style={styles.emptyIcon} />
      <ThemedText type="title" style={styles.emptyTitle}>
        No Notes Yet
      </ThemedText>
      <ThemedText style={styles.emptySubtitle}>
        Tap the &ldquo;Add Note&rdquo; tab to create your first note
      </ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          My Notes
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        </ThemedText>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard note={item} onPress={() => handleNotePress(item.id)} />
        )}
        contentContainerStyle={[
          styles.listContent,
          notes.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={tintColor}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    opacity: 0.6,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    opacity: 0.3,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
