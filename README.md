<p align="center">
  <a href="https://ronbodnar.com/" target="_blank">
    <img src="src/assets/icons/themes/Mint-Y/apps/showcase-os.svg" width="120" alt="Showcase OS Logo" />
  </a>
</p>

<h1 align="center">Showcase OS</h1>

<p align="center">
  A web-based, extensible desktop environment for developers.
</p>

<p align="center">
  Launch apps, move windows, and showcase your projects like a living operating system.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue" />
  <img src="https://img.shields.io/badge/React-18+-61dafb" />
  <img src="https://img.shields.io/badge/Vite-Bundler-646cff" />
  <img src="https://img.shields.io/badge/License-GPL--3.0-green" />
  <img src="https://github.com/ronbodnar/showcase-os/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
  <img src="https://github.com/ronbodnar/showcase-os/actions/workflows/deploy.yml/badge.svg" alt="CD Status" />
</p>

<br />

<p align="center">
  <a href="https://ronbodnar.com/" target="_blank">
    <img src="https://img.shields.io/badge/Launch_Live_Demo-2ea44f?style=for-the-badge" alt="Launch Demo" />
  </a>
</p>

## 📍 Table of Contents

- [🚦 Getting Started](#getting-started)
- [🛠️ Add Your Projects or Apps](#customization)
- [🧩 Extend System Programs](#programs)
- [🎨 Modifying Themes](#themes)
- [📂 Project Structure (High‑Level)](#structure)
- [🏗️ Architecture Overview](#architecture)
- [🧪 Testing Strategy](#testing)
- [📫 Connect](#connect)
- [🎨 Credits & Assets](#credits)

<br />

<a name="getting-started"></a>

## 🚦 Getting Started

### Clone

```
git clone https://github.com/ronbodnar/showcase-os.git
cd showcase-os
```

### Install Dependencies

_Note: This step can be skipped if you are running with docker._

```
npm install
```

### Run Locally

```
npm run dev        # Local development
npm run devhost    # Locally hosted server
```

### Production Build

```
npm run build
```

### Docker (Optional)

```
docker build -t showcase-os .
docker run --rm -p 8080:80 showcase-os
```

Open http://localhost:8080 in your browser.

<br />

<a name="customization"></a>

## 🛠️ Add Your Projects or Apps

1. Add project metadata: `src/config/programs-developer.ts`
2. Add project to the Software Center: `src/config/config.ts`
3. Override or customize the launcher: `src/config/launchers.ts`

_Note: Step 3 is required if you are supplying a URL for the iframe to the `browser` program, otherwise the system generates a launcher automatically._

<br />

<a name="programs"></a>

## 🧩 Extend System Programs

Programs are React components wrapped in OS‑managed windows.

### Built-in Programs

`src/features/program/components`

- App Drawer
- Browser
- Photo Viewer
- Software Center
- Start Menu
- System Info
- System Settings
- Terminal (command registry–driven, powered by XTerm)
- Visual Studio Code (powered by github1s)

The OS automatically handles:

- Launcher creation
- Window lifecycle
- Process lifecycle
- Environment compatibility

### Add Custom Programs

1. Add Program metadata: `src/config/programs-system.ts`
2. Create a React Component for your new Program: `src/features/program/components`
3. Register the Component in the program map: `src/features/program/components/index.ts`

_Note: Programs are lazy-loaded by default and use a resolver to map the component. You can eagerly load it by providing the Component directly (Start Menu is an example)_

<br />

<a name="themes"></a>

## 🎨 Modifying Themes

### Icons

`src/assets/icons`

Icons are loaded asynchronously on demand using loaders within the Theme's skin.

#### Add a new icon:

1. Update the `ThemeIconSet` type in `src/features/theme/types.ts` with the new icon name
2. Add the icon file to `src/assets/icons/themes/THEME_NAME/...` (pick a category or create a new one)
3. Register the icon file with the skin in `src/features/theme/skins/THEME_NAME/icons/(desktop, mobile, or shared).ts`

_Note: Mobile icons are not available on desktop and vice versa. The shared icon set is available on all platforms._

<br />

### Wallpapers

`src/assets/wallpaper`

The system will apply the correct wallpaper based on the user's viewport and defaults to 1080p.

You can add or change the supported resolutions in `src/features/theme/services/themeService.ts` within `detectResolution()`.

#### Add a new wallpaper:

1. Create a new directory in `src/assets/wallpaper/`
2. Add the .webp files to the directory (desktop-1080p is the fallback wallpaper)
3. Make the wallpaper available in `src/features/theme/assets/wallpaper.ts`

<br />

### Creating or Extending Skins

`src/features/theme/skins`

The default theme is **Mint-Y (dark)** `src/features/theme/skins/Mint-Y/index.ts` and contains the complete default icon set.

#### Add a new skin:

1. Copy the **Mint-Y (light)** skin: `cp -r src/features/theme/skins/Mint-Y-light src/features/theme/skins/YOUR_THEME_NAME`
2. Update the theme config within `index.ts` with a new name and scheme
3. Override desktop, mobile, or shared icons within `icons/`. The default icon set is already included as a fallback.

To ensure the system picks up new themes or to change a skin directory name, you must also update the map in `src/features/theme/index.ts`.

<br />

<a name="structure"></a>

## 📂 Project Structure (High‑Level)

```txt
public/               # Static assets for branding and deployment

src/
├── config/           # Static configuration files to easily extend or modify the system
├── core/             # OS hooks, services, overlays, global stores
├── features/         # OS subsystems (environments, grids, windows/app cards, launchers, programs, themes)
├── assets/           # Icons, wallpapers, Software Center previews
├── shared/           # Reusable UI primitives & hooks
├── test/             # Setup for unit tests
├── App.tsx           # Root application shell
├── main.tsx          # Entry point
└── index.css         # Global styles

index.html            # Site metadata and root element
```

<br />

<a name="architecture"></a>

## 🏗️ Architecture Overview

Every subsystem behaves like its real OS counterpart, but implemented in a modern web stack.

### Core Principles

- Programs are static definitions
- Processes are runtime instances
- Windows are stateful UI shells
- Services own logic -> components stay thin
- Everything is replaceable, forkable, and extensible

<br />

### Core Services

| Service          | Responsibility                                         |
| ---------------- | ------------------------------------------------------ |
| `osService`      | Platform detection, desktop/mobile state               |
| `systemService`  | Boot, shutdown, lock, global state                     |
| `panelService`   | Panel launcher management, pinning/unpinning launchers |
| `processService` | Program lifecycle, PID tracking, runtime state         |
| `overlayService` | Overlay state and lifecycle                            |

<br />

### Feature Services

| Service           | Responsibility                                      |
| ----------------- | --------------------------------------------------- |
| `appCardService`  | App card management (mobile equivalent of a window) |
| `programService`  | Program registration and metadata                   |
| `gridService`     | Grid launcher placement, resizing, snapping         |
| `launcherService` | Desktop, menu, panel, and mobile launch flows       |
| `programService`  | In-program navigation, Program Component access     |
| `themeService`    | Applying theme settings, asset management           |
| `windowService`   | Focus, z‑index, resize/maximize/minimize state      |

<br />

### Environments

`src/features/environments`

Dual‑mode OS environments sharing the same services.

#### Desktop

- Grid‑based desktop
- Panel + system tray
- Floating resizable windows
- Live window previews (panel hover)

#### Mobile

- Home screen launcher
- Fullscreen app cards
- Navigation controls
- Notification shade
- Touch‑first interactions

<br />

### Overlays

`src/core/overlays`

Tooltips, context menus, dialogs, and window compositor (for live previews on the panel/taskbar)

- Syle variant support
- Positional constraints (within viewport, clamp to edge)
- Offset support from client mouse position
- `src/core/hooks/useOverlayPosition.ts` for consistent functionality

<br />

<a name="testing"></a>

## 🧪 Testing Strategy

Since the UI is a complex state-driven simulation, I prioritize testing the service logic and state transitions that drive the experience.

### Core Testing Pillars

- **Service-Level Unit Tests** — Every service is validated for mathematical accuracy and logical correctness.
- **Strict State Mocking** — vi.hoisted patterns to deterministically mock Zustand stores, ensuring tests are isolated.
- **Environment Simulation** — Logic is validated across both Desktop and Mobile modes, ensuring responsive system behavior.
- **Idempotency & Caching** — Registry services are tested to verify component loaders and asset managers cache correctly, preventing performance leaks.

### Running Tests

```bash
npm run test
```

<br />

<a name="connect"></a>

## 📫 Connect

**Created by Ron Bodnar**

- LinkedIn: https://linkedin.com/in/ronbodnar
- Email: ron.bodnar@outlook.com

<br />

<a name="credits"></a>

## 🎨 Credits & Assets

This project is an open-source tribute to desktop environments. It utilizes several high-quality asset libraries:

### Interface & Icons

- **Mint-Y Icons:** [Linux Mint Team](https://github.com/linuxmint/mint-y-icons) (GPL)
- **Adwaita Icons:** [GNOME Project](https://gitlab.gnome.org/GNOME/adwaita-icon-theme) (LGPL/CC-BY-SA)
- **Material Symbols:** [Google Fonts](https://fonts.google.com/icons) (Apache 2.0)
- **Tech Icons:** [techicons.dev](https://techicons.dev/)

### Wallpapers & Media

- **Backgrounds:** Collected from various open-source community sources.
- _Note: If you are the creator of an asset used here and would like specific attribution or removal, please open an issue._

### Licensing

This software is licensed under **GPL-3.0**. This ensures the project remains free and open-source, respecting the licenses of the bundled Linux-based assets.
