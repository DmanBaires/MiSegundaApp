import { useThemeColor } from '@/hooks/use-theme-color';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { IconSymbol } from './ui/icon-symbol';

interface ImagePickerButtonProps {
    imageUri?: string;
    onImageSelected: (uri: string) => void;
    onImageRemoved: () => void;
}

export function ImagePickerButton({
    imageUri,
    onImageSelected,
    onImageRemoved,
}: ImagePickerButtonProps) {
    const tintColor = useThemeColor({}, 'tint');

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Sorry, we need camera roll permissions to add images to your notes!'
            );
            return false;
        }
        return true;
    };

    const pickImageFromGallery = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            onImageSelected(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Sorry, we need camera permissions to take photos!'
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            onImageSelected(result.assets[0].uri);
        }
    };

    const showImageOptions = () => {
        Alert.alert('Add Image', 'Choose an option:', [
            { text: 'Take Photo', onPress: takePhoto },
            { text: 'Choose from Gallery', onPress: pickImageFromGallery },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    return (
        <ThemedView style={styles.container}>
            {imageUri ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" />
                    <TouchableOpacity
                        style={[styles.removeButton, { backgroundColor: '#FF3B30' }]}
                        onPress={onImageRemoved}
                    >
                        <IconSymbol name="xmark" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={[styles.addButton, { borderColor: tintColor }]}
                    onPress={showImageOptions}
                >
                    <IconSymbol name="photo" size={32} color={tintColor} />
                    <ThemedText style={[styles.addButtonText, { color: tintColor }]}>
                        Add Image
                    </ThemedText>
                </TouchableOpacity>
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    addButton: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    addButtonText: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    imageContainer: {
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
