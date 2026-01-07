<p align="center">
  <a href="https://ronbodnar.com/" target="_blank">
    <img src="src/assets/icons/themes/Mint-Y/apps/showcase-os.svg" width="120" alt="Showcase OS Logo" />
  </a>
</p>

<h1 align="center">Showcase OS</h1>

<p align="center">
  The Developer's Operating System Portfolio
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue" />
  <img src="https://img.shields.io/badge/React-18+-61dafb" />
  <img src="https://img.shields.io/badge/Vite-Bundler-646cff" />
  <img src="https://img.shields.io/badge/License-GPL--3.0-green" />
  <img src="https://github.com/ronbodnar/showcase-os/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
  <img src="https://img.shields.io/badge/Architecture-OS--Inspired-critical" />
</p>

**Showcase OS** is an extensible desktop environment built entirely for the web. It functions as a **living operating system simulation** where developers showcase real projects as first‑class, system‑level applications. If you understand it, you can extend it.

<br />

<p align="center">
  <a href="https://ronbodnar.com/" target="_blank">
    <img src="https://img.shields.io/badge/Launch_Live_Demo-2ea44f?style=for-the-badge" alt="Launch Demo" />
  </a>
</p>

## 📍 Table of Contents

- [🚀 Vision](#vision)
- [🧠 Architectural Philosophy](#philosophy)
- [🏗️ System Architecture](#architecture)
- [🧩 Applications as First‑Class Citizens](#applications)
- [🛠️ Customization & Extension](#customization)
- [📂 Project Structure (High‑Level)](#structure)
- [🧪 Testing Strategy](#testing)
- [🚦 Getting Started](#getting-started)
- [💡 Core Concepts](#concepts)
- [🎨 Credits & Assets](#credits)

<br />

<a name="vision"></a>

## 🚀 Vision

Most portfolios are static. **Showcase OS is experiential.**

Visitors don’t scroll, they launch apps, move windows, open system settings, browse a software center, and interact with your work the same way they would on a real workstation.

<br />

<a name="philosophy"></a>

## 🧠 Architectural Philosophy

Showcase OS is built around **strict separation of concerns**.  
Every subsystem behaves like its real OS counterpart, but implemented in a modern web stack.

### Core Principles

- Programs are static definitions
- Processes are runtime instances
- Windows are stateful UI shells
- Services own logic -> components stay thin
- Everything is replaceable, forkable, and extensible

<br />

<a name="architecture"></a>

## 🏗️ System Architecture

### Core Services (`src/core/services`)

Centralized system logic with no UI coupling.

- **gridService** — Desktop icon placement and snapping
- **launcherService** — Desktop, menu, panel, and mobile launch flows
- **osService** — Boot, shutdown, lock, global state
- **processService** — Program lifecycle, PID tracking, runtime state
- **programService** — Program registration and metadata
- **overlayService** — Context menus, dialogs, tooltips
- **windowService** — Focus, z‑index, resize/maximize/minimize state

<br />

### Window System (`src/features/window`)

A full windowing abstraction.

- Custom window frames
- Dragging, resizing, snapping
- Title bars, controls, focus handling

<br />

### Environments (`src/features/environments`)

Dual‑mode OS environments sharing the same core services.

#### Desktop

- Grid‑based desktop
- Panel + system tray
- Floating resizable windows

#### Mobile

- Home screen launcher
- Fullscreen app cards
- Navigation controls
- Notification shade
- Touch‑first interactions

<br />

### Theme Engine (`src/features/theme`)

A full, extensible skinning system.

- Icon packs (separated by desktop / mobile / shared to save resources)
- Wallpapers with resolution awareness
- Spacing, sizing, and density scaling
- Multiple default skins (Mint‑Y (dark), Mint‑Y (light))

<br />

<a name="applications"></a>

## 🧩 Applications as First‑Class Citizens

Applications are real React components wrapped in OS‑managed windows.

### Built‑in Programs

- Browser
- Photo Viewer
- Software Center
- System Info
- System Settings
- Terminal (command registry–driven, built with XTerm)
- Visual Studio Code (using GitHub1s)

<br />

<a name="customization"></a>

## 🛠️ Customization & Extension

### 1. Add Your Projects

Edit:

```ts
src / features / program / metadata / developer.ts
```

Define:

- Icons & launch locations
- Default window size
- Categories

<br />

### 2. Create New Applications

1. Create a component:

```txt
src/features/program/components/
```

2. Register it:

```ts
src / features / program / registry.ts
```

The OS automatically handles:

- Window chrome
- Process lifecycle
- Focus and z‑index
- Environment compatibility

<br />

### 3. Themes & Assets

- Icons: `src/assets/icons`
- Wallpapers: `src/assets/wallpaper`
- Skins: `src/features/theme/skins`

Supports:

- 4K & ultrawide wallpapers
- Mobile‑specific assets
- SVG‑first icon pipelines

<br />

<a name="structure"></a>

## 📂 Project Structure (High‑Level)

```txt
src/
├── core/             # OS services, overlays, global stores
├── features/         # OS subsystems (windowing, launcher, programs)
├── assets/           # Icons, wallpapers, previews
├── shared/           # Reusable UI primitives & hooks
├── App.tsx           # Root application shell
├── main.tsx          # Entry point
└── index.css         # Global styles
```

<br />

<a name="testing"></a>

## 🧪 Testing Strategy

Showcase OS employs a comprehensive test suite powered by Vitest, focusing on "System-Level" validation. Since the UI is a complex state-driven simulation, I prioritize testing the service logic and state transitions that drive the experience.

### Core Testing Pillars

- **Service-Level Unit Tests** — Every core service is validated for mathematical accuracy and logical correctness.
- **Strict State Mocking** — vi.hoisted patterns to deterministically mock Zustand stores, ensuring tests are isolated.
- **Environment Simulation** — Logic is validated across both Desktop and Mobile modes, ensuring responsive system behavior.
- **Idempotency & Caching** — Registry services are tested to verify component loaders and asset managers cache correctly, preventing performance leaks.

### Running Tests

```bash
npm run test
```

<br />

<a name="getting-started"></a>

## 🚦 Getting Started

### Run with Docker

Build the image:

```bash
docker build -t showcase-os .
```

Run the container:

```bash
docker run --rm -p 8080:80 showcase-os
```

Open http://localhost:8080 in your browser.

### Install

```bash
npm install
```

### Development

Local server:

```bash
npm run dev
```

Locally hosted server:

```bash
npm run devhost
```

### Production Build

```bash
npm run build
```

<br />

<a name="concepts"></a>

## 💡 Core Concepts

- **Program vs Process**  
  A _Program_ is metadata + component.  
  A _Process_ is a live runtime instance with a PID.

- **Window ≠ App**  
  Windows are containers. Programs can spawn multiple processes.

- **Grid System**  
  Desktop icons persist position using `gridService`.

- **Overlay Layer**  
  Context menus, dialogs, previews, and tooltips are globally managed.

<br />

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

<br />

> Development Note: This repository follows a curated commit history to demonstrate the architectural progression of the OS, from core service orchestration to environment-specific UI implementation.
