# MiSegundaApp - Note-Taking Application 📝

A modern, feature-rich note-taking mobile application built with React Native and Expo, similar to Gnote. This app allows users to create, edit, and manage notes with text content and images.

## 📱 Project Description

MiSegundaApp is a mobile note-taking application developed as part of the Mobile Application Development course (Desarrollo de Aplicaciones para Dispositivos Móviles). The app demonstrates comprehensive knowledge of React Native development, including:

- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for notes
- **Rich Media Support**: Add images from camera or photo gallery to your notes
- **Auto-Resizing Text Input**: Text fields that grow dynamically as you type
- **Form Validation**: Real-time input validation with visual feedback
- **Responsive Design**: Beautiful UI that adapts to both light and dark themes
- **Tab Navigation**: Easy navigation between notes list and note creation screens

## ✨ Features

- ✅ **View All Notes**: Browse your notes in a scrollable list with previews
- ✅ **Create Notes**: Add new notes with title, content, and optional images
- ✅ **Edit Notes**: Tap any note to edit its content
- ✅ **Delete Notes**: Remove unwanted notes with confirmation dialog
- ✅ **Image Support**: 
  - Take photos with camera
  - Select images from photo gallery
  - Image preview in notes
- ✅ **Auto-Resizing Text**: Content input expands as you type
- ✅ **Form Validation**: 
  - Title must be at least 3 characters
  - Content must be at least 10 characters
  - Visual error feedback
- ✅ **Pull to Refresh**: Refresh your notes list
- ✅ **Empty State**: Helpful message when no notes exist
- ✅ **Dark/Light Theme**: Automatic theme switching based on device settings

## 🛠 Technical Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router with Tab Navigation
- **State Management**: React Context API with hooks
- **Image Handling**: expo-image-picker
- **UI Components**: Functional components with React hooks
- **Styling**: StyleSheet with Flexbox layout

## 📦 Dependencies

### Core Dependencies
- `expo`: ~54.0.19 - Main Expo framework
- `react`: 19.1.0 - React library
- `react-native`: 0.81.5 - React Native framework
- `expo-router`: ~6.0.13 - File-based routing and navigation
- `typescript`: ~5.9.2 - TypeScript language support

### Navigation & UI
- `@react-navigation/native`: ^7.1.8 - Navigation library
- `@react-navigation/bottom-tabs`: ^7.4.0 - Tab navigation
- `expo-status-bar`: ~3.0.8 - Status bar component

### Image & Media
- `expo-image`: ~3.0.10 - Optimized image component
- `expo-image-picker`: Latest - Camera and gallery access for adding images to notes

### Utilities
- `expo-haptics`: ~15.0.7 - Haptic feedback for better UX
- `react-native-reanimated`: ~4.1.1 - Smooth animations
- `react-native-safe-area-context`: ~5.6.0 - Handle device safe areas

## 📂 Project Structure

```
MiSegundaApp/
├── app/                          # Main application code (Expo Router)
│   ├── (tabs)/                  # Tab navigation screens
│   │   ├── index.tsx           # Notes List Screen (with FlatList)
│   │   ├── explore.tsx         # Add/Edit Note Screen (form)
│   │   └── _layout.tsx         # Tab navigation configuration
│   ├── _layout.tsx             # Root layout with providers
│   └── modal.tsx               # Modal screen (if needed)
├── components/                  # Reusable UI components
│   ├── AutoResizingTextInput.tsx  # Auto-expanding text input
│   ├── ImagePickerButton.tsx      # Image selection component
│   ├── NoteCard.tsx              # Note display card
│   ├── themed-text.tsx           # Themed text component
│   ├── themed-view.tsx           # Themed view component
│   └── ui/                       # UI utility components
│       ├── collapsible.tsx
│       ├── icon-symbol.tsx
│       └── icon-symbol.ios.tsx
├── contexts/                    # React Context providers
│   └── NotesContext.tsx        # Global state for notes (CRUD operations)
├── types/                       # TypeScript type definitions
│   └── Note.ts                 # Note interface definition
├── constants/                   # App constants
│   └── theme.ts               # Colors and theme configuration
├── hooks/                       # Custom React hooks
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
├── assets/                      # Images and static files
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                    # This file
```

## 🚀 Installation & Execution

### Prerequisites
- Node.js (v20.19.4 or higher)
- npm or yarn
- Expo Go app on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

3. **Open on your device**
   - A QR code will appear in your terminal
   - Open Expo Go app on your phone
   - Scan the QR code
   - The app will load on your device

### Alternative: Run on Emulator
```bash
# For Android
npx expo start --android

# For iOS (macOS only)
npx expo start --ios

# For Web
npx expo start --web
```

## 🎯 Assignment Requirements Checklist

This project fulfills all requirements from the "Trabajo Práctico Integrador":

- ✅ **React Native + Expo + TypeScript**: Built with latest Expo SDK 54 and TypeScript 5.9
- ✅ **Functional Components**: All components are functional with hooks
- ✅ **Navigation**: Tab navigation implemented (can be combined with Stack if needed)
- ✅ **FlatList with CRUD**: 
  - List view with FlatList
  - Create new notes
  - Read/view notes
  - Update existing notes
  - Delete notes
- ✅ **Forms with Validation**: Title and content inputs with real-time validation
- ✅ **Visual Feedback**: Error messages, loading states, success alerts
- ✅ **Flexbox Styling**: Responsive layouts using StyleSheet and Flexbox
- ✅ **State Management**: React Context API with custom hooks
- ✅ **Conditional Rendering**: Empty states, error displays, loading indicators
- ✅ **Runs on Expo Go**: No native code modifications, fully compatible

### Additional Features (Beyond Requirements)
- 🎨 **Theme Support**: Automatic dark/light mode
- 📸 **Image Integration**: Camera and gallery support
- ↕️ **Auto-Resizing Input**: Dynamic text field height
- 🔄 **Pull to Refresh**: Smooth refresh interaction
- 🎯 **Professional UX**: Haptic feedback, smooth animations

## 🤖 AI Usage Declaration

This project was developed with assistance from AI tools (Google Gemini) for:
- General questions and code correction
- React Native best practices
- Documentation writing

All code has been reviewed, tested, and understood by the developer. The AI served as a learning companion and development accelerator, similar to how developers use Stack Overflow or official documentation.

## 👨‍💻 Author

**Derek** - Mobile Application Development Course

## 📝 License

This is an academic project developed for educational purposes.

---

**Note**: This project is part of a professional practice assignment for the Mobile Application Development course. It demonstrates the integration of various React Native concepts learned throughout the semester.
