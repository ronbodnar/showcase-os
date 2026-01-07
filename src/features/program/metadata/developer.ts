import { ProgramMetadata } from "../types"

import CoreFlowArchitectureDark from "@assets/software-center/coreflow-erp-architecture-diagram-dark-mode.webp"
import CoreFlowArchitectureLight from "@assets/software-center/coreflow-erp-architecture-diagram-light-mode.webp"
import CoreFlowContractDetailsDark from "@assets/software-center/coreflow-erp-contract-details-dark-mode.webp"
import CoreFlowContractDetailsLight from "@assets/software-center/coreflow-erp-contract-details-light-mode.webp"
import CoreFlowDocuments from "@assets/software-center/coreflow-erp-documents.webp"
import CoreFlowGovernance from "@assets/software-center/coreflow-erp-governance.webp"
import CoreFlowLogViewerDark from "@assets/software-center/coreflow-erp-log-viewer-dark-mode.webp"
import CoreFlowLogViewerLight from "@assets/software-center/coreflow-erp-log-viewer-light-mode.webp"

import GridOfWordsGameboard from "@assets/software-center/grid-of-words-gameboard.webp"
import GridOfWordsStatistics from "@assets/software-center/grid-of-words-statistics.webp"
import GridOfWordsHowToPlay from "@assets/software-center/grid-of-words-how-to-play.webp"

import TMSDashboardDark from "@assets/software-center/tms-dashboard-dark-mode.png"
import TMSDashboardLight from "@assets/software-center/tms-dashboard-light-mode.png"
import TMSAnalyticsDark from "@assets/software-center/tms-analytics-dark-mode.png"
import TMSAnalyticsLight from "@assets/software-center/tms-analytics-light-mode.png"

export const DEVELOPER_PROGRAMS_META = [
  {
    id: "deliveryrouter_cli",
    name: "DeliveryRouter",
    icon: "DeliveryRouterCLI",
    category: "developer",
    runnable: false,
    details: {
      description: {
        short:
          "A Python tool for efficiently routing packages using the Nearest Neighbor algorithm.",
        long:
          `DeliveryRouter is a high-efficiency logistics simulation engineered to solve a variation of the Traveling Salesman Problem (**TSP**). Developed as a core project for Data Structures and Algorithms II, the application demonstrates the practical application of **greedy heuristics** and custom data structures to optimize complex routing constraints within strict mileage limits.\n\n` +
          `<b>Algorithmic Strategy & Optimization</b>\n` +
          `The system implements a **Nearest Neighbor algorithm** to determine delivery sequences in real-time. By iteratively selecting the closest remaining delivery point, the router significantly reduces total mileage across multiple trucks. The engine supports complex operational constraints, including **staggered departure times**, **truck capacity limits**, and **time-sensitive delivery deadlines**.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Data Structure Implementation</b>\n\n` +
          `<b>Custom Hash Table Core</b>\n` +
          `To ensure **O(1) average-case lookup** performance for package data, the system utilizes a **custom-built Hash Table**. By avoiding built-in dictionary abstractions, the project showcases a practical understanding of **collision resolution**, memory management, and efficient data retrieval.\n\n` +
          `<b>Real-Time State Tracking</b>\n` +
          `The router maintains a **deterministic simulation** of package lifecycles (At Hub, En Route, Delivered). It provides **time-accurate snapshot reporting**, allowing users to query the exact status and physical location of any package at any given timestamp, while simultaneously calculating cumulative mileage for individual vehicles and the entire fleet.\n\n` +
          `<div class='my-4' />This project serves as a comprehensive bridge between theoretical **algorithmic complexity** and real-world logistics engineering, prioritizing performance, accuracy, and efficient resource allocation.`,
      },
      githubUrl: "https://github.com/ronbodnar/deliveryrouter-cli",
      technologies: ["Python"],
      year: { start: 2023, end: 2023 },
    },
  },

  {
    id: "grid_of_words",
    name: "Grid of Words",
    icon: "GridOfWords",
    category: "developer",
    background: {
      color: "#6c5ce7",
    },
    details: {
      description: {
        short:
          "A high-interactivity Wordle-inspired SPA with a custom Vanilla JavaScript frontend and Node.js/MongoDB backend.",

        long:
          `Grid of Words is a dynamic single-page application (**SPA**) featuring a fully custom, **framework-less frontend**. Built with **Vanilla JavaScript**, the UI is orchestrated through a **declarative component system** and **programmatic DOM generation**, achieving high-performance state transitions without relying on external frameworks.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Custom Frontend Architecture</b>\n\n` +
          `<b>Component-Based UI & Form Engine</b>\n` +
          `The frontend uses a modular "View" system with reusable components and a **FormBuilder engine** to standardize user interactions. **Manual DOM management** ensures precise control over rendering and efficient handling of game state.\n\n` +
          `<b>Decoupled Services & State Management</b>\n` +
          `**Event orchestration**, API communication, and local storage logic are handled by specialized services, keeping the game engine, UI rendering, and user session state **cleanly separated** and highly maintainable.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Backend & Operational Highlights</b>\n\n` +
          `<b>Secure, SPA-Ready Authentication</b>\n` +
          `Implements **JWT-based authentication** with **refresh token rotation** and **HttpOnly cookies** for secure, persistent sessions. Password reset and token validation workflows ensure safe lifecycle management without compromising usability.\n\n` +
          `<b>Game Engine & Performance</b>\n` +
          `Supports configurable word lengths, attempts, and multiple dictionaries. Backend logic efficiently handles **concurrent game sessions**, real-time SPA updates, and **player statistics aggregation**.\n\n` +
          `<b>Reliability & Observability</b>\n` +
          `**Structured error logging** with Winston and environment-based configuration (**Docker**) enable easy development, deployment, and operational transparency.`,
      },
      images: [GridOfWordsGameboard, GridOfWordsStatistics, GridOfWordsHowToPlay],
      githubUrl: "https://github.com/ronbodnar/grid-of-words",
      publicUrl: "https://play.ronbodnar.com/",
      technologies: ["JavaScript", "NodeJS", "Express", "ChartJS", "MongoDB", "Docker"],
      year: { start: 2024 },
    },
  },

  {
    id: "league_of_legends_log_parser",
    name: "League of Legends Log Parser",
    icon: "LeagueOfLegendsLogParser",
    category: "developer",
    runnable: false,
    details: {
      description: {
        short:
          "A legacy Java tool for parsing League of Legends game logs to extract detailed match statistics.",
        long:
          `League of Legends Log Parser is a legacy Java utility developed to extract structured match data from raw game client logs. Created before the widespread availability of official APIs, the tool served as a personal analytics engine for tracking performance trends, win/loss streaks, and champion-specific metrics.\n\n` +
          `<b>Log Analysis & Data Extraction</b>\n` +
          `The application utilized complex string parsing to normalize data across multiple legacy log formats. It extracted granular statistics including: summoner performance, game durations, and regional data, transforming unstructured text into JSON responses for statistical summary and long-term performance statistics.`,
      },
      githubUrl: "https://github.com/ronbodnar/league-of-legends-log-parser",
      technologies: ["Java"],
      year: { start: 2014, end: 2014 },
    },
  },

  {
    id: "loan_eligibility",
    name: "Loan Eligibility ML",
    icon: "LoanEligibilityML",
    category: "developer",
    runnable: false,
    details: {
      description: {
        short: "Machine learning-based loan eligibility prediction using Python and Scikit-Learn.",
        long:
          `Loan Eligibility ML is a predictive analytics project developed to automate the **credit risk assessment process**. Built using Python and Scikit-Learn, the project demonstrates a complete **machine learning pipeline**—from exploratory data analysis (EDA) and feature engineering to model optimization and deployment.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Data Engineering & Preprocessing</b>\n\n` +
          `<b>Feature Engineering & Class Balancing</b>\n` +
          `To ensure model reliability, the project involved extensive data cleaning, including handling missing values and encoding categorical variables. A critical component was the implementation of **oversampling techniques** to **balance classes**, preventing the model from developing a bias toward majority-class outcomes during the training phase.\n\n` +
          `<b>Exploratory Data Analysis (EDA)</b>\n` +
          `Utilizing Pandas and NumPy, the project analyzes **complex correlations** between applicant profiles and approval rates. This data-driven approach identifies **key feature impacts**, ensuring that the final model is grounded in statistically significant patterns.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Model Selection & Optimization</b>\n\n` +
          `<b>Comparative Model Analysis</b>\n` +
          `The system evaluates multiple **classification algorithms** to determine the most effective predictor. Performance metrics include:\n` +
          `• **Random Forest: ~88% Accuracy** (Precision: 89%, Recall: 88%)\n` +
          `• **Logistic Regression: ~84% Accuracy**\n` +
          `• **Support Vector Classifier (SVC): ~81% Accuracy**\n\n` +
          `<b>Hyperparameter Tuning</b>\n` +
          `To maximize predictive power, the Random Forest model was optimized using **GridSearchCV**. This **exhaustive search over specified parameter grids** ensured the highest possible accuracy and generalization for real-time eligibility predictions.`,
      },
      githubUrl: "https://github.com/ronbodnar/loan-eligibility-ml",
      technologies: ["Python", "ScikitLearn", "NumPy", "Pandas"],
      year: { start: 2023, end: 2023 },
    },
  },

  {
    id: "mtg_virtual_binder",
    name: "MTG Virtual Card Binder",
    icon: "MTGVirtualBinder",
    category: "developer",
    runnable: false,
    details: {
      description: {
        short: "A tool for creating virtual card binders for Magic: The Gathering",
        long:
          `MTG Virtual Card Binder is a legacy collection management system built to organize and track physical card assets in a digital environment. Developed using a LAMP stack, the project focused on translating complex, requirement-driven hobbyist workflows into a structured data management tool.\n\n` +
          `<b>Data Organization & Integration</b>\n` +
          `The application implemented a multi-binder architecture to handle relational tracking between thousands of card records, decks, and storage locations. It originally integrated with external TCG APIs to retrieve real-time metadata and pricing, utilizing jQuery to provide an interactive interface for searching and filtering large datasets without page reloads.`,
      },
      githubUrl: "https://github.com/ronbodnar/mtg-virtual-binder",
      technologies: ["PHP", "JQuery", "JavaScript", "MySQL"],
      year: { start: 2014, end: 2015 },
    },
  },

  {
    id: "oed_parser",
    name: "OED Parser",
    icon: "OEDParser",
    category: "developer",
    runnable: false,
    details: {
      description: {
        short:
          "A Python parser for extracting words, definitions, and parts of speech from the Oxford English Dictionary.",

        long:
          "Oxford English Dictionary Word Parser is a Python-based utility that **programmatically fetches and parses** entries from the OED. Originally built to compile word lists for games like Grid of Words, it extracts word text, definitions, and parts of speech and supports **structured output in CSV, TXT, and JSON formats**.\n\n" +
          "<b>Technical Highlights</b>\n" +
          "• Automated fetching and parsing of dictionary entries with robust handling of **pagination**, **request delays**, and **retries**\n" +
          "• Extracts **structured word metadata** for downstream analysis or database import\n" +
          "• Supports multiple output formats and **bulk import into MySQL databases**\n" +
          "• Designed for flexible configuration via **command-line arguments** and environment variables",
      },
      githubUrl: "https://github.com/ronbodnar/oed-parser",
      technologies: ["Python", "MySQL"],
      year: { start: 2024, end: 2024 },
    },
  },

  {
    id: "showcase_os",
    name: "Showcase OS",
    icon: "ShowcaseOS",
    category: "developer",
    background: {
      color: "#ff914d",
    },
    details: {
      description: {
        short:
          "A web-based OS simulator designed as an interactive portfolio to demonstrate complex UI orchestration and frontend systems engineering.",
        long:
          `Showcase OS is a desktop environment built entirely for the web. It functions as a <b>living operating system simulation</b> where projects are treated as first-class, system-level applications rather than static entries.\n\n` +
          `<b>Project Intent & Vision</b>\n` +
          `Designed to move beyond the static portfolio, Showcase OS demonstrates system-level thinking by simulating a full workstation experience. It prioritizes <b>engineering depth and architectural modularity</b>, allowing visitors to interact with a dynamic ecosystem of apps and services.\n\n` +
          `<div class='my-4' /><b class='text-xl'>System Architecture</b>\n\n` +
          `<b>Headless Service Core</b>\n` +
          `Centralized system logic is managed by <b>singleton services</b> decoupled from the UI. These services handle the <b>process lifecycle (PID tracking)</b>, program registration, and global state orchestration independently of React's render cycle.\n\n` +
          `<b>Windowing System & Compositor</b>\n` +
          `A full windowing abstraction manages <b>focus, z-index stacking, and spatial coordinates</b>. A dedicated <b>Window Compositor</b> observes system state to drive live visual previews while maintaining a performant render loop.\n\n` +
          `<b>Domain-Specific State</b>\n` +
          `State is managed via **modular Zustand stores**, isolating domain logic for windows, themes, and processes. This prevents global state bloat while ensuring high-speed reactivity across complex UI transitions.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Environment & Design System</b>\n\n` +
          `<b>Adaptive Layout Engine</b>\n` +
          `The system features a dual-mode engine that seamlessly transitions between a grid-based <b>Desktop</b> and a touch-first <b>Mobile</b> experience using environment-aware rendering.\n\n` +
          `<b>Theme & Skinning API</b>\n` +
          `A robust skinning system supports <b>declarative theming</b> and runtime re-skinning of icons, wallpapers, and UI density, demonstrating a scalable approach to design systems.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Engineering Tradeoffs</b>\n\n` +
          `• Distributed Zustand stores to improve maintainability and performance at the cost of cross-store orchestration.\n` +
          `• Accepted increased initial boilerplate to ensure OS services remain testable and framework-agnostic.\n` +
          `• Interactive UI orchestration and process simulation over native filesystem functionality to maximize web portability.`,
      },
      githubUrl: "https://github.com/ronbodnar/showcase-os",
      publicUrl: "https://ronbodnar.com/",
      technologies: ["React", "TypeScript", "TailwindCSS"],
      year: { start: 2025 },
    },
  },

  {
    id: "coreflow_erp",
    name: "CoreFlow ERP",
    icon: "CoreFlowERP",
    category: "developer",
    background: {
      color: "#1666af",
    },
    details: {
      description: {
        short:
          "A contract-first ERP engineered for deterministic financial management and automated legal-technical workflows.",

        long:
          `CoreFlow ERP is a contract-first enterprise solution that digitizes the end-to-end lifecycle of complex contract-driven businesses. Contracts serve as the immutable source of truth for all billing and financial reporting.\n\n` +
          `<b>Project Intent & Constraints</b>\n` +
          `Built under real operational constraints, CoreFlow prevents misalignment between contracts, invoices, and ledgers by enforcing contract state as the single source of truth and ensuring consistency at the service and API layers.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Backend Architecture</b>\n\n` +
          `<b>Multi-Tenancy & Isolation</b>\n` +
          `Strict tenant data isolation is enforced using a <b>TenantRoutingDataSource</b> with context-propagation filters and <b>ThreadLocal storage</b>, enabling rapid provisioning of isolated demo environments.\n\n` +
          `<b>CQRS-Lite & API Governance</b>\n` +
          `Read and write paths are separated via a <b>Query Handler layer</b>, while RBAC at the API boundary ensures controlled data exposure.\n\n` +
          `<b>Deterministic Financial Logic</b>\n` +
          `Financial state derives directly from contract lifecycle events, with automated installment scheduling and tax calculation services preventing divergence between invoices and ledger balances.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Frontend Architecture</b>\n\n` +
          `<b>Reactive State Management</b>\n` +
          `Angular <b>Signals</b> and specialized Stores manage high-complexity state transitions, maintaining predictable UI behavior across reactive workflows.\n\n` +
          `<b>Document Engine</b>\n` +
          `Documents are generated from <b>immutable, server-validated state</b> to ensure legal and financial correctness, with a built-in localization layer for <b>bilingual (EN/ES)</b> output.\n\n` +
          `<b>Security & Interceptors</b>\n` +
          `JWT-based stateless authentication with HTTP interceptors centralizes credential injection and tenant-header propagation.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Operations & Infrastructure</b>\n\n` +
          `<b>Containerized Isolation</b>\n` +
          `Docker Compose separates the application, database, and rendering engines, simplifying development and maintaining production parity.\n\n` +
          `<b>Traceability & Async Processing</b>\n` +
          `Comprehensive activity logging and non-blocking execution for PDF generation and consolidations ensure reliability under load.\n\n` +
          `<div class='my-4' /><b>Engineering Tradeoffs</b>\n` +
          `• <b>Modular Monolith</b> chosen to balance transactional integrity with simplicity.\n` +
          `• Backend complexity accepted to guarantee deterministic financial outcomes.\n` +
          `• Client-side document generation avoided to reduce attack surface and ensure legal correctness.\n\n` +
          `CoreFlow drives daily operations in production, translating complex legal and operational requirements into a correctness-first system designed for efficiency, traceability, and long-term maintainability.`,
      },
      images: [
        CoreFlowContractDetailsDark,
        CoreFlowContractDetailsLight,
        CoreFlowArchitectureDark,
        CoreFlowArchitectureLight,
        CoreFlowDocuments,
        CoreFlowGovernance,
        CoreFlowLogViewerDark,
        CoreFlowLogViewerLight,
      ],
      publicUrl: "https://erp.ronbodnar.com/",
      technologies: [
        "Angular",
        "TypeScript",
        "Java",
        "Spring",
        "MySQL",
        "NodeJS",
        "Nginx",
        "Docker",
        "GithubActions",
      ],
      year: { start: 2024 },
    },
  },

  {
    id: "tms_prototype",
    name: "TMS Prototype",
    icon: "TMSPrototype",
    category: "developer",
    details: {
      description: {
        short:
          "A prototype TMS that centralizes driver workflows and facility-level logistics, improving accountability and operational visibility.",

        long:
          `The TMS Prototype is a web-based transportation management system designed to digitize driver workflows and yard operations. Built to address manual tracking gaps, it provides a centralized platform for managing assignments, monitoring facility wait times, and tracking shipment status.\n\n` +
          `<div class='my-4' /><b class='text-xl'>Key Features & Logistics Logic</b>\n\n` +
          `<b>Driver & Yard Management</b>\n` +
          `Dynamic assignment of drivers, doors, and trailer tasks, with real-time status updates and historical tracking.\n\n` +
          `<b>Shipment Analytics</b>\n` +
          `Facility-level metrics and strict status-management allow transparency across shipments and accountability for delays or refusals.\n\n` +
          `<b>Technical Implementation</b>\n` +
          `Frontend built with <b>JavaScript/jQuery</b> for interactive updates; backend uses <b>PHP/MySQL</b> to manage relational data.\n\n` +
          `This prototype translates operational experience into a functional tool, demonstrating user-focused design and process efficiency without a full-scale production footprint.`,
      },
      images: [TMSDashboardDark, TMSDashboardLight, TMSAnalyticsDark, TMSAnalyticsLight],
      technologies: ["PHP", "JavaScript", "JQuery", "ChartJS"],
      publicUrl: "https://tms.ronbodnar.com/",
      githubUrl: "https://github.com/ronbodnar/transportation-management",
      year: { start: 2022, end: 2023 },
    },
  },

  {
    id: "twitch_buddy",
    name: "Twitch Buddy",
    icon: "TwitchBuddy",
    category: "developer",
    runnable: false,
    details: {
      description: {
        short: "Minimal Twitch dashboard in Java Swing",
        long:
          `Twitch Buddy is a legacy desktop application developed during the early years of the Twitch platform to provide a lightweight, alternative dashboard for stream monitoring. Built with Java Swing, the project served as a deep dive into building responsive desktop interfaces that consume real-time external data.\n\n` +
          `<b>Early API Integration</b>\n` +
          `The application integrated directly with the Twitch API to aggregate featured games, live channels, and trending highlights into a tabbed interface. It features dynamic content loading where viewer counts and stream metadata were updated in real-time, providing a high-level overview of the platform's state without the overhead of a web browser.`,
      },
      technologies: ["Java"],
      githubUrl: "https://github.com/ronbodnar/twitch-buddy",
      year: { start: 2013, end: 2013 },
    },
  },

  {
    id: "twitch_chat_irc",
    name: "Twitch Chat IRC",
    icon: "TwitchChatIRC",
    category: "developer",
    runnable: false,
    details: {
      description: {
        short: "Twitch chat IRC interface in Java",

        long:
          `Twitch Chat IRC is an early Java-based client developed to interface directly with Twitch’s messaging infrastructure via the IRC protocol. Built during the platform's early years, it served as a foundational exploration into Socket Programming and real-time data parsing.\n\n` +
          `<b>Protocol Implementation</b>\n` +
          `The client manages low-level TCP/IP connections, handling the IRC handshake and mandatory PING/PONG heartbeats to maintain server persistence. It features a custom parser to extract user metadata, such as moderator and subscriber statuses, from raw message tags.`,
      },
      technologies: ["Java"],
      githubUrl: "https://github.com/ronbodnar/twitch-chat-irc",
      year: { start: 2013, end: 2014 },
    },
  },

  {
    id: "twitch_raffle",
    name: "Twitch Raffle",
    icon: "TwitchRaffle",
    category: "developer",
    runnable: false,
    details: {
      description: {
        short: "Host live raffles on Twitch chat",
        long:
          "Twitch Raffle is an early Java-based application designed to host live raffles directly in Twitch chat. It allowed streamers to engage viewers in real-time competitions, automatically track participants, and randomly select winners, supporting both general and follower-only raffles.\n\n" +
          "<b>Technical Design & Challenges</b>\n" +
          "The system was built to handle high-frequency chat events while maintaining thread-safe state for participants and raffle tracking. It ensures fairness by preventing duplicate entries and managing concurrent real-time interactions.",
      },
      technologies: ["Java"],
      githubUrl: "https://github.com/ronbodnar/twitch-raffle",
      year: { start: 2013, end: 2014 },
    },
  },
] as const satisfies ProgramMetadata[]
