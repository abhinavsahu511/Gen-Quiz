# GenQuiz

A fast, modern Quiz Web Application built with React, Vite, Tailwind CSS, and the Google Gemini API.

## Features

- **Instant Quiz Generation**: Enter any topic, and the AI will generate a custom 10-question multiple-choice quiz.
- **Interactive UI**: Clean, responsive, and animated user interface.
- **Dark Mode**: Built-in support for light and dark themes.
- **Real-time Scoring**: Track your score as you answer questions.

## Project Structure

- `src/` - Frontend React application
- `src/components/` - Reusable UI components
- `src/pages/` - Application routes (Home, Quiz)
- `src/services/` - API integration logic

## Setup Instructions

### 1. Install Dependencies
Run the following command in the root directory to install all required packages:
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 3. Start the Application
To run the application in development mode:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, React Router
- **Icons & Animations**: Lucide React, Motion
- **AI**: Google Gemini API (`@google/genai`)
