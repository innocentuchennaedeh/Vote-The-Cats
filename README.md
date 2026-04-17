# 🐾 Vote The Cats

A modern React Native application built to explore, upload, and rate the internet's finest felines. Developed as part of a Senior React Native technical assessment.

## 🚀 Features

- **Upload:** Seamlessly upload new cat images from your device.
- **Gallery:** Responsive grid view of all uploaded cats (adapts from 1 to 4 columns based on screen width).
- **Interactive:** Favourite/Unfavourite images, and Upvote/Downvote with real-time score calculation.

## 🛠️ Architecture & Tech Stack

As a senior-level implementation, this project prioritizes scalable architecture, predictable state management, and modern tooling:

- **Framework:** [Expo](https://expo.dev/) with **Expo Router** for file-based routing and deep-linking readiness.
- **State Management & Caching:** [TanStack React Query](https://tanstack.com/query/latest) is utilized to handle asynchronous state, caching, loading/error states, and UI invalidation post-mutation.
- **API Client:** `axios` for robust HTTP requests and interceptor capabilities.
- **UI & Styling:** Native React Native `StyleSheet` with modular, reusable components to maintain a clean Design System.

## ⚙️ Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/innocentuchennaedeh/Vote-The-Cats.git vote-the-cats
   cd vote-the-cats

2. **Install dependencies**
   ```bash
   npm install

3. **Environment Variables**
  Create a .env file in the root directory and add your API key from The Cat API:
   ```bash
   EXPO_PUBLIC_CAT_API_KEY=your_api_key_here

4. **Run the app**
   ```bash
   npx expo start


## 🧠 Technical Decisions & Trade-offs
- **API Data Merging:** The Cat API separates images, favourites, and votes into distinct endpoints. I architected a unified API layer using Promise.all to fetch and merge these locally, preventing waterfall requests and ensuring components receive clean, hydrated data.

- **Responsiveness:** Utilized useWindowDimensions dynamically to adapt the FlatList column count, ensuring the UI remains pristine across devices scaling down to 340px.