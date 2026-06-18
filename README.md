# Video Diary App

A React Native (Expo) video diary app where you import a video, crop a fixed **5-second** segment with a filmstrip scrubber, add a name & description, and save it to a persistent library for later viewing and editing.

Built for the SevenApps React Native case study.

## Features

- **Library (Home):** Persistent list of cropped videos with thumbnails, pull-to-refresh, and an empty state. Tap any item to open its details.
- **Details:** Looping playback of the cropped clip with its name, description, and creation date. Quick access to edit or delete.
- **3-step crop flow (modal):**
  1. **Select** a video from the device library.
  2. **Trim** – preview the clip and drag a 5-second window over a generated filmstrip scrubber (animated playhead, haptic feedback).
  3. **Metadata** – enter a name and description (validated), then run the crop.
- **Cropping:** `trimVideo` from `expo-trim-video`, executed through TanStack Query (`useMutation`) for robust async handling, with progress/success states.
- **Edit:** Update name & description of an existing video; changes are persisted (with optimistic UI updates).
- **i18n:** English & Turkish, auto-selected from device locale.
- **Theming:** Light/dark support via NativeWind + design tokens.

## Tech Stack

| Concern | Library |
|---|---|
| Framework | Expo (~54), React Native 0.81, React 19 |
| Navigation | Expo Router (typed routes) |
| Local state (crop flow) | Zustand |
| Server/async state | TanStack Query |
| Video cropping | `expo-trim-video` |
| Playback | `expo-video` |
| Persistent storage | Expo SQLite + Drizzle ORM (migrations) |
| Styling | NativeWind (Tailwind) |
| Animations | React Native Reanimated + Gesture Handler |
| Validation | Zod + React Hook Form |
| Media | `expo-image-picker`, `expo-video-thumbnails`, `expo-file-system` |
| i18n | i18next / react-i18next + `expo-localization` |
| Tests | Jest (`jest-expo`) |

## Project Structure

```
app/                     Expo Router screens
  index.tsx              Library (home) screen
  (crop)/index.tsx       3-step crop modal flow
  video/[id]/index.tsx   Video details
  video/[id]/edit.tsx    Edit metadata
api/                     Data layer (Drizzle schema, queries, query client/keys)
hooks/                   crop.ts (pick + trim), videos.ts (CRUD queries)
store/                   cropStore.ts (Zustand crop state)
components/
  crop/                  Step components (Select / Trim / Metadata)
  video/                 VideoPlayer, VideoScrubber, thumbnails, list item
  form/                  MetadataForm + controlled inputs
  ui/                    Reusable primitives (Button, Card, Input, Toast, ...)
lib/                     fs storage, formatting, haptics, validation, ids
drizzle/                 SQLite migrations
i18n/                    Locales (en, tr)
constants/               Theme tokens, video constants (5s segment)
__tests__/               Unit tests
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A **development build** is required (`expo-trim-video`, `expo-sqlite`, and `expo-video` rely on native code, so Expo Go will not work).
- iOS: Xcode + CocoaPods. Android: Android Studio + SDK.

### 1. Install dependencies

```bash
npm install
```

### 2. Run on a device/simulator

```bash
# iOS
npm run ios

# Android
npm run android
```

These build and launch a native dev client. Once installed, you can start the bundler anytime with:

```bash
npm start
```

## Usage

1. On the **Library** screen, tap the **+** button to open the crop flow.
2. **Select** a video from your library (grant photo permission when prompted).
3. **Trim:** drag the highlighted 5-second window across the filmstrip to choose the start point, preview with play/pause, then tap **Next**.
4. **Metadata:** enter a name (required) and an optional description, then tap the crop button.
5. The clip is cropped, stored locally, and you land on its **Details** page.
6. From Details, use the edit icon to change the name/description, or delete the video.

## Database & Migrations

Storage uses Expo SQLite via Drizzle ORM. Migrations are bundled and applied automatically on app start (a loading gate runs `useMigrations` before rendering).

To change the schema, edit `api/schema.ts` and regenerate migrations:

```bash
npx drizzle-kit generate
```

## Testing

```bash
npm test          # run once
npm run test:watch
```

Unit tests cover the crop store, validation schema, query keys, and formatting helpers.

## Notes & Decisions

- **Storage:** The case allowed Zustand + AsyncStorage; this app uses the bonus **Expo SQLite (Drizzle)** path for structured, scalable persistence. Zustand is used for ephemeral crop-flow state.
- **Segment length:** Fixed at 5 seconds (`constants/video.ts`). The scrubber moves a 5-second window, so the end point is derived from the chosen start.
- **Reusable components:** `VideoPlayer`, `MetadataForm`, `VideoScrubber`, and the `ui/` primitives are abstracted for reuse and scalability.
