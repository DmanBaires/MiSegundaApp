import { AutoResizingTextInput } from '@/components/AutoResizingTextInput';
import { ImagePickerButton } from '@/components/ImagePickerButton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useNotes } from '@/contexts/NotesContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AddNoteScreen() {
  const { noteId } = useLocalSearchParams<{ noteId?: string }>();
  const { addNote, updateNote, getNoteById } = useNotes();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');

  // Load existing note if editing
  useEffect(() => {
    if (noteId) {
      const note = getNoteById(noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setImageUri(note.imageUri);
      }
    }
  }, [noteId, getNoteById]);

  const validateForm = (): boolean => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    } else if (title.trim().length < 3) {
      setTitleError('Title must be at least 3 characters');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!content.trim()) {
      setContentError('Content is required');
      isValid = false;
    } else if (content.trim().length < 10) {
      setContentError('Content must be at least 10 characters');
      isValid = false;
    } else {
      setContentError('');
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const noteData = {
        title: title.trim(),
        content: content.trim(),
        imageUri,
      };

      if (noteId) {
        updateNote(noteId, noteData);
        Alert.alert('Success', 'Note updated successfully!');
      } else {
        addNote(noteData);
        Alert.alert('Success', 'Note created successfully!');
      }

      // Clear form
      setTitle('');
      setContent('');
      setImageUri(undefined);
      setTitleError('');
      setContentError('');

      // Navigate back to notes list
      router.push('/');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (title || content || imageUri) {
      Alert.alert(
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              setTitle('');
              setContent('');
              setImageUri(undefined);
              setTitleError('');
              setContentError('');
              router.push('/');
            },
          },
        ]
      );
    } else {
      router.push('/');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            {noteId ? 'Edit Note' : 'New Note'}
          </ThemedText>
        </ThemedView>

        <View style={styles.form}>
          {/* Title Input */}
          <View style={styles.inputContainer}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Title
            </ThemedText>
            <TextInput
              style={[
                styles.titleInput,
                {
                  color: textColor,
                  borderColor: titleError ? '#FF3B30' : borderColor,
                  backgroundColor,
                },
              ]}
              placeholder="Enter note title"
              placeholderTextColor="#8E8E93"
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (titleError) setTitleError('');
              }}
              maxLength={100}
            />
            {titleError ? (
              <ThemedText style={styles.errorText}>{titleError}</ThemedText>
            ) : null}
          </View>

          {/* Content Input */}
          <View style={styles.inputContainer}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Content
            </ThemedText>
            <AutoResizingTextInput
              placeholder="Write your note here..."
              placeholderTextColor="#8E8E93"
              value={content}
              onChangeText={(text) => {
                setContent(text);
                if (contentError) setContentError('');
              }}
              minHeight={150}
              maxHeight={400}
              style={[
                {
                  borderColor: contentError ? '#FF3B30' : borderColor,
                },
              ]}
            />
            {contentError ? (
              <ThemedText style={styles.errorText}>{contentError}</ThemedText>
            ) : null}
          </View>

          {/* Image Picker */}
          <View style={styles.inputContainer}>
            <ThemedText type="defaultSemiBold" style={styles.label}>
              Image (Optional)
            </ThemedText>
            <ImagePickerButton
              imageUri={imageUri}
              onImageSelected={setImageUri}
              onImageRemoved={() => setImageUri(undefined)}
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor }]}
              onPress={handleCancel}
              disabled={isSaving}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.saveButton,
                { backgroundColor: tintColor },
                isSaving && styles.buttonDisabled,
              ]}
              onPress={handleSave}
              disabled={isSaving}
            >
              <ThemedText style={styles.saveButtonText}>
                {isSaving ? 'Saving...' : 'Save Note'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
    paddingTop: 0,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
