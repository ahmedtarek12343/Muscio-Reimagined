# 🎵 Musico - Free Music Player

<div align="center">
  <p align="center">
    All the songs you need, in one place, and for free
    <br />
    <a href="#features"><strong>Explore Features »</strong></a>
    <br />
    <br />
    <a href="#demo">View Demo</a>
    ·
    <a href="#installation">Installation</a>
    ·
    <a href="#usage">Usage</a>
  </p>

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

Musico is a modern, free music player web application that allows you to search, play, and organize your favorite songs. Built with React and powered by the iTunes Search API, Musico offers a sleek, animated interface with playlist management, favorites, and real-time audio playback.

## ✨ Features

### Core Features
- 🔍 **Song Search** - Search millions of songs using the iTunes API
- 🎧 **Audio Player** - Real-time audio playback with controls
- 📝 **Playlist Management** - Create, edit, and delete custom playlists
- ❤️ **Favorites** - Mark songs as favorites for quick access
- 🎨 **Beautiful Animations** - Smooth transitions and engaging UI effects

### User Experience
- 🌓 **Dark/Light Mode** - Toggle between themes
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎭 **View Transitions** - Smooth page transitions with React Router
- ⌨️ **Keyboard Navigation** - Full keyboard support for accessibility
- 🎪 **Interactive Dock** - macOS-style dock navigation

### Advanced Features
- 🎬 **Animated Components** - Custom motion primitives for enhanced UX
- 📊 **Infinite Scrolling** - Seamless browsing experience
- 🎯 **Variable Typography** - Dynamic text effects based on mouse proximity
- 🖼️ **Lazy Loading** - Optimized image loading with skeletons
- 💾 **Persistent Storage** - Zustand with persist middleware

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Routing:** React Router v7

### State Management
- **Global State:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Form Handling:** React Hook Form + Zod

### Additional Libraries
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Debouncing:** use-debounce
- **Utilities:** clsx, tailwind-merge

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm/yarn/pnpm package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/musico.git
cd musico
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage

### Searching for Songs

1. On the home page, scroll down to the search section
2. Type a song name, artist, or album in the search bar
3. Results appear automatically with debounced search
4. Click on any song to see action buttons

### Creating Playlists

1. Navigate to the **Playlists** page using the dock
2. Click **Add Playlist**
3. Enter a playlist name and optional cover image URL
4. Click **Create Playlist**

### Adding Songs to Playlists

1. Search for a song
2. Click the **Add to Playlist** button (List icon)
3. Select the destination playlist
4. Song is added instantly with confirmation

### Playing Music

1. Click the **Play** button on any song
2. Audio player appears at the top of the screen
3. Use controls to play/pause and adjust volume
4. Close player by clicking the X button

### Managing Favorites

1. Click the **Heart** icon on any song to add to favorites
2. Visit the **Favorites** page to see all saved songs
3. Click heart again to remove from favorites

## 📁 Project Structure

```
musico/
├── public/                 # Static assets
├── src/
│   ├── api/               # API integration
│   │   └── fetchSongs.ts  # iTunes API queries
│   ├── components/        # React components
│   │   ├── kokonutui/    # External UI components
│   │   ├── motion-primitives/  # Animation components
│   │   ├── ui/           # Reusable UI components
│   │   ├── AnimatedList.jsx
│   │   ├── DockComp.tsx
│   │   ├── LazyImage.tsx
│   │   ├── Navbar.tsx
│   │   ├── SongBar.tsx
│   │   ├── SongCard.tsx
│   │   └── ...
│   ├── constants/         # App constants
│   │   ├── constants.ts
│   │   └── type.ts
│   ├── hooks/            # Custom React hooks
│   │   └── useFetchSong.ts
│   ├── lib/              # Utilities
│   │   └── utils.ts
│   ├── pages/            # Page components
│   │   ├── MainPage.tsx
│   │   ├── PlaylistsPage.tsx
│   │   ├── PlaylistIDPage.tsx
│   │   └── FavoritesPage.tsx
│   ├── store/            # Zustand stores
│   │   ├── favorites.store.ts
│   │   ├── player.store.ts
│   │   └── playlists.store.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🔑 Key Components

### AnimatedList
Displays scrollable lists with scroll animations and keyboard navigation support.

```jsx
<AnimatedList
  items={songs}
  showGradients={true}
  enableArrowNavigation={true}
  displayScrollbar={true}
/>
```

### SongBar
Persistent audio player component with playback controls.

### Dock
macOS-style dock navigation for seamless page switching.

### VariableProximity
Dynamic typography that responds to mouse proximity with font weight changes.

### InfiniteSlider
Infinite scrolling image carousel with customizable direction and speed.

## 🗄️ State Management

### Zustand Stores

**Favorites Store** (`favorites.store.ts`)
```typescript
- favorites: SongType[]
- addFavorite(song: SongType)
- removeFavorite(id: number)
```

**Player Store** (`player.store.ts`)
```typescript
- playedSong: SongType | null
- setPlayedSong(song: SongType | null)
```

**Playlists Store** (`playlists.store.ts`)
```typescript
- playlists: PlaylistType[]
- addPlaylist(playlist: PlaylistType)
- removePlaylist(id: string)
- updatePlaylist(id: string, data)
- addSongToPlaylist(playlistId: string, song: SongType)
- removeSongFromPlaylist(playlistId: string, songId: number)
```

All stores use:
- `persist` middleware for localStorage persistence
- `immer` middleware for immutable state updates

## 🔌 API Integration

### iTunes Search API

```typescript
// API Call
const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=20&media=music`;
```

**Response Structure:**
```typescript
interface SongType {
  trackId: number;
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl100: string;
  artworkUrl60: string;
  previewUrl: string;
  trackName: string;
  releaseDate: string;
}
```

### TanStack Query Integration
- Cached queries for optimal performance
- Suspense boundaries for loading states
- Automatic refetching on window focus

## 🎨 Styling

### Tailwind Configuration
- Custom color palette with Spotify-inspired green primary color
- Dark mode support via class-based strategy
- Custom animations and utilities
- Component-level CSS modules for complex animations

### Theme Variables
```css
--primary: #1ed760
--background: oklch(0.145 0 0) /* Dark */
--foreground: oklch(0.985 0 0)
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
