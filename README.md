# Solace

> A minimalist, typography-driven new tab extension for time awareness and intentional focus.

Solace transforms your browser's new tab page into a serene, ambient dashboard. By gently visualizing the passage of time - days, months, and the year - it shifts perspective from endless scrolling to mindful productivity.


https://github.com/user-attachments/assets/680aa4c3-6743-44f8-90dd-ea40e6adab3c



## Core Features

- **Ambient Time-Tracking**: A real-time view of the current year's progression, with a live countdown of days and hours remaining.
- **Dot Matrix Calendar**: A column-oriented grid representing every day of the year - weeks flow left to right, days top to bottom - letting you reflect on time passed and anticipate what's ahead.
- **Contextual Greeting**: A dynamic greeting that adapts to the time of day, paired with the current date.
- **Shortcut Dock**: Quick access to your most important links with drag-to-reorder, per-item removal, and JSON export/import - minimizing friction between opening a tab and getting to work.
- **Dark / Light Mode**: A seamless theme toggle with smooth transitions, persisted across sessions.
- **Minimalist Aesthetic**: Crafted with modern typography (Archivo Black and Inter) and a clean, distraction-free layout.

## Installation (Browser Extension)

To use Solace as your default New Tab experience, load it as an "unpacked extension" in any Chromium-based browser (Chrome, Edge, Brave, etc.).

### Step 1: Get the files

```bash
git clone https://github.com/your-username/solace.git
cd solace
```

### Step 2: Build the project

Make sure [Node.js](https://nodejs.org/) is installed, then run:

```bash
npm install
npm run build
```

This generates a `dist` folder containing the compiled extension.

### Step 3: Load in your browser

1. Navigate to `chrome://extensions/` (or `edge://extensions/` for Edge).
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** and select the `dist` folder.
4. Open a new tab and experience Solace.

## Local Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` with hot-reload enabled.

## Technologies Used

- **React 19**: Component architecture and state management
- **TypeScript**: Type safety and predictability
- **Tailwind CSS 4**: Utility-first styling
- **Framer Motion**: Fluid animations and micro-interactions
- **Vite**: High-performance frontend tooling
