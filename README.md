🛒 Grocery Shopping List (PoC)
This project is a Proof of Concept (PoC) for a scalable grocery list application. Built as a technical assignment, it demonstrates a production-ready architecture using React Native (Expo), TypeScript, and a mocked REST API.

🎯 Project Overview
The goal was to create a functional, responsive, and maintainable foundation for a large-scale grocery application.

Core Features (User Stories):
✅ View List: Browse all grocery items fetched from the API.

✅ Manage Items: Full CRUD (Create, Read, Update, Delete) functionality.

✅ Amount Tracking: Specify the quantity for each item.

✅ Purchase Toggle: Mark items as bought with visual feedback.

✅ Responsive Design: Optimized for both mobile and desktop views.

🚀 Getting Started
🔹 Option 1: Local Development (Fastest)
Recommended for web testing and active coding.

Install dependencies: npm install

Start API: npm run server (Keep this terminal open)

Start App: npx expo start (Press 'w' for web view)

🔹 Option 2: Mobile Testing (Expo Go)
To test on a physical smartphone with a live connection to your local backend.

Network: Connect your phone and PC to the same Wi-Fi.

Environment: Create a .env file in the root and add your IPv4 address:
EXPO_PUBLIC_API_IP=192.168.x.x

Start: Run npm run server and npx expo start, then scan the QR code with the Expo Go app.

🔹 Option 3: Docker Execution
Complete isolation. No local Node.js installation required.

Config: Ensure .env is created with your IP or localhost.

Launch: docker-compose up --build

Access: Web App at http://localhost:8081, API at http://localhost:3000.

🏗 Architecture Decisions
State Management: React Query for server state (caching, optimistic updates).

Validation: Zod schema-based validation for all form inputs.

UI/UX: Mobile-first approach with a max-width container (600px) for desktop clarity.

Code Quality: ESLint (with cross-env for Windows compatibility) and Prettier for standardizing the codebase.

📂 Project Structure
src/api — Axios client and API calls.

src/components — UI components (Card, Form, ProgressBar).

src/hooks — Logic for queries, theme, and animations.

src/utils — Sorting and progress calculation logic.

src/i18n — Localization (EN/UA).

🛠 Utility Commands
npm run lint — Check code quality.

npm run format — Auto-fix formatting.

npx expo start -c — Clear Expo cache.

📝 Original Requirements
Please, create an app that allows users to make grocery lists. Imagine this app is a proof of concept for the big project. And your current code base will be a foundation for the production app. Feel free to use any additional tool that can help you with covering user stories. Good luck
Here are user stories that should be covered:

- As a user, I can view my grocery list
- As a user, I can add, edit and delete items to my grocery list
- As a user, I can add an amount to each item in the list
- As a user, I can mark an item as bought. This will cross out the title and mark the checkbox as checked. Technical requirements: - Layouts are not strict, but the
