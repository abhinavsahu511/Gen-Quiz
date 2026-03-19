# GenQuiz

A fast, modern Quiz Web Application built with React, Vite, Tailwind CSS, and the Google Gemini API.

## Features

- **Instant Quiz Generation**: Enter any topic, and the AI will generate a custom 10-question multiple-choice quiz.
- **Interactive UI**: Clean, responsive, and animated user interface.
- **Dark Mode**: Built-in support for light and dark themes.
- **Real-time Scoring**: Track your score as you answer questions.
- **Secure Backend**: Dedicated Node.js API to secure Gemini API Keys.

## Project Structure

The project is structured as a monorepo:
- `frontend/` - React frontend application (Vite, Tailwind CSS, React Router)
- `backend/` - Node.js Express server handling Gemini API communication

## Setup Instructions

### 1. Install Dependencies
Run the following command in the root directory to install all packages for both the frontend and backend:
```bash
npm run install:all
```

### 2. Environment Variables
Create a `.env` file in the **`backend`** directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).)*

### 3. Start the Application
To run both the backend and frontend simultaneously in development mode, run from the root directory:
```bash
npm run dev
```
The frontend application will be available at `http://localhost:4000` and the backend API at `http://localhost:5000`.

## Tech Stack
- **Frontend**: React 19, Vite v6, Tailwind CSS v4, React Router
- **Backend**: Node.js, Express, dotenv
- **AI**: Google Gemini API (`@google/genai`)
