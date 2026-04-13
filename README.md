🛒 Grocery Shopping List (PoC)
This project is a Proof of Concept (PoC) for a scalable grocery list application. Built as a technical assignment, it demonstrates a production-ready architecture using React Native (Expo) and a mocked REST API.

🎯 Project Overview
The goal was to create a functional, responsive, and maintainable foundation for a large-scale grocery application.

Core Features (User Stories):
✅ View List: Browse all grocery items fetched from the API.

✅ Manage Items: Full CRUD (Create, Read, Update, Delete) functionality.

✅ Amount Tracking: Specify the quantity for each item.

✅ Purchase Toggle: Mark items as bought with immediate visual feedback (strikethrough & checkbox).

✅ Responsive Design: Optimized for both mobile and desktop views using a containerized layout.

🌟 Bonus Functionality Added:
Progress Tracker: A visual progress bar showing the percentage of completed purchases.

Reactive Edit Flow: A seamless editing experience where data populates the main form without intrusive modals or browser prompts.

Haptic Feedback: Physical vibration feedback on mobile devices for successful actions (Add/Delete).

Hybrid Execution: Flexible environment support (Dockerized or Native).

🛠 Tech Stack
Framework: Expo (React Native)

Styling: NativeWind v2 (Tailwind CSS for React Native)

Data Fetching: TanStack Query v5 (React Query)

API Client: Axios

Backend Mock: JSON-server

Icons: Lucide React Native

🚀 Getting Started
Choose one of the following options to run the project. Option 1 (Local Development) is recommended for active coding as it provides faster hot-reloads and better debugging tools.

🔹 Option 1: Local Development (Recommended)
To ensure the application connects correctly to the data, you should start the Backend server first, then launch the Mobile bundler.

1. Install dependencies:

Bash
npm install

2. Start the API Server (Backend):

Bash
npm run server
Runs the JSON-server on Port 3000. Keep this terminal window open.

3. Start the Expo App (Frontend):
   Open a new terminal window and run:

Bash
npx expo start

Access points:
Web App: http://localhost:8081
API Server: http://localhost:3000

Note: If npm run dev fails on your system, using the two separate commands above is the most stable method to ensure both services are fully initialized.

🔹 Option 2: Docker Execution
Use this option if you prefer an isolated environment without installing Node.js locally.

Build and Launch:
docker-compose up --build

Access points:

Web App: http://localhost:8081

API Server: http://localhost:3000

🛠 Utility Commands
npm run server — Start only the JSON-server.

npx expo start --web — Start only the Expo Web bundler.

npx expo start -c — Start with a full cache clear (useful if UI isn't updating).

🏗 Architecture Decisions
State Management: Used React Query for server state to handle caching and synchronization. Local UI state for editing is managed via a lifting-state pattern to ensure synchronization between the list and the form.

Form Handling: Integrated a unified form for both adding and editing to reduce code duplication and provide a consistent UX.

API Layer: Created a modular Axios client with environment-aware base URLs, making it easy to switch from a local mock to a production backend.

UI/UX: Adopted a "Mobile-first" approach with a max-width container (600px) to ensure the app looks professional on large desktop screens.

📂 Project Structure
src/api - Axios client configuration and API calls.

src/components - Reusable UI components (Card, Form).

src/hooks - Custom React Query hooks for clean logic separation.

src/screens - Main application screen.

src/types - TypeScript interfaces.

📝 Original Requirements
Please, create an app that allows users to make grocery lists. Imagine this app is a proof of concept for the big project. And your current code base will be a foundation for the production app. Feel free to use any additional tool that can help you with covering user stories. Good luck
Here are user stories that should be covered:

- As a user, I can view my grocery list
- As a user, I can add, edit and delete items to my grocery list
- As a user, I can add an amount to each item in the list
- As a user, I can mark an item as bought. This will cross out the title and mark the checkbox as checked. Technical requirements: - Layouts are not strict, but the website should look good on desktop and mobile
- Please use JSON-server (https://www.npmjs.com/package/json-server) and React query (https://tanstack.com/query/latest/docs/react/quick-start) to mock an API integration
- @react-native-reusables/cli (https://reactnativereusables.com) to build layouts
- Push your code to the git repo and share a link to the finished project.
