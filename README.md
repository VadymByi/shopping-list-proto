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
You can run the project using Docker (recommended for zero-configuration) or locally using Node.js.

Option 1: Docker (Recommended)
If you have Docker installed, simply run:

Bash
docker-compose up --build
Web App: http://localhost:8081

API Server: http://localhost:3000

Option 2: Local Execution (No Docker)
Install dependencies:

Bash
npm install
Start the API Server:
It is recommended to start the backend first to ensure the data is ready:

Bash
npm run server
Server runs at http://localhost:3000

Start the Frontend:
In a new terminal window, run:

Bash
npx expo start --web
Alternatively, you can use npm run dev to launch both the server and the web bundler simultaneously using concurrently.
Option 3: Mobile Testing (Expo Go)
To run the app on a physical smartphone with a direct connection to the backend:

Preparation: Install the Expo Go app from the App Store (iOS) or Google Play (Android).

Network Setup:
Find your computer's local IP address (run ipconfig in the Windows terminal and find the IPv4 Address).
Example: 192.168.0.106.

Environment Variable:
Create a .env file in the root directory.

Add your IP address:
EXPO_PUBLIC_API_IP=192.168.x.x

Note: Your phone and computer must be connected to the same Wi-Fi network.

Starting the Project:
To see data on the phone, the API server must run in parallel with the bundler. Run:
Bash
npm run dev
Connection:

If the QR code didn't appear or you need a separate session, run:
Bash
npx expo start
Note: You may be prompted that port 8081 is busy (by the previous process). Press Y to use the next available port (8082).

Scan the QR code in the terminal using your phone's camera (iOS) or the Expo Go app (Android).

Troubleshooting:
If the app loads but shows "Error loading data", ensure your Windows Firewall allows incoming connections on port 3000.

Check that your .env contains the correct IP address and restart the process.

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
- As a user, I can mark an item as bought. This will cross out the title and mark the checkbox as checked. Technical requirements: - Layouts are not strict, but the
