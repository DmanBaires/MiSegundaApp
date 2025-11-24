import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface AutoResizingTextInputProps extends TextInputProps {
    minHeight?: number;
    maxHeight?: number;
}

export function AutoResizingTextInput({
    minHeight = 100,
    maxHeight = 400,
    style,
    ...props
}: AutoResizingTextInputProps) {
    const [height, setHeight] = useState(minHeight);
    const textColor = useThemeColor({}, 'text');
    const borderColor = useThemeColor({}, 'border');
    const backgroundColor = useThemeColor({}, 'background');

    return (
        <TextInput
            {...props}
            multiline
            style={[
                styles.input,
                {
                    height: Math.max(minHeight, Math.min(height, maxHeight)),
                    color: textColor,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                },
                style,
            ]}
            onContentSizeChange={(event) => {
                setHeight(event.nativeEvent.contentSize.height);
            }}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        textAlignVertical: 'top',
    },
});
