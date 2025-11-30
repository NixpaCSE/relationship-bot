# Relationship Bot for Cindy 💕

A personalized AI chatbot designed to help Cindy feel secure and loved in her relationship with Nick. Built with React, Vite, and Google's Gemini API.

## Features

- 🤖 **AI-Powered Responses**: Uses Google Gemini API to provide relationship advice
- 💗 **Relationship-Focused**: Always frames responses to support and strengthen the relationship
- 💾 **Message History**: Automatically saves conversations to localStorage
- 📱 **Mobile Responsive**: Works beautifully on all devices
- 🎨 **Beautiful Pink UI**: ChatGPT-like interface with a pink theme
- ⚡ **Fast & Smooth**: Built with React and Vite for optimal performance

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env` file in the root directory:**
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

- Type your question in the input box and press Enter or click the send button
- The chatbot will respond with relationship-focused advice
- All conversations are automatically saved and will persist when you refresh the page
- Click "Clear History" to start a new conversation

## Customization

The system prompt can be customized in `src/App.jsx` to adjust how the chatbot responds. The current prompt is designed to:
- Always support the relationship
- Reassure Cindy about Nick's love and commitment
- Frame concerns in a positive, relationship-strengthening way
- Include personal notes from Nick

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Tech Stack

- React 19
- Vite 7
- Google Gemini API
- CSS3 (no external UI libraries)

## Notes

- The `.env` file is already in `.gitignore` to keep your API key secure
- Messages are stored locally in the browser's localStorage
- The chatbot is designed to be supportive and relationship-positive
