# Smart Living Guide - Deployment Instructions

This application is built with React, Tailwind CSS, and the Google Gemini API.

## Prerequisites
- A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/).
- A hosting account (Vercel, Netlify, or GitHub Pages).

## Deployment Steps (Vercel - Recommended)

1. **Upload to GitHub**: Push all files in this directory to a new GitHub repository.
2. **Connect to Vercel**:
   - Log in to [Vercel](https://vercel.com).
   - Click **New Project** and import your repository.
3. **Environment Variables**:
   - During configuration, go to the **Environment Variables** section.
   - Add a new variable:
     - **Name**: `API_KEY`
     - **Value**: `YOUR_GEMINI_API_KEY_HERE`
4. **Deploy**: Click the **Deploy** button.

## Local Development
To run this locally, you can use a simple static server. If you have Python installed:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`. 

*Note: For the `.tsx` files to work in a standard browser environment outside of this specialized preview, you would typically use a build tool like Vite. To convert to a Vite project:*
1. Run `npm init vite@latest`
2. Select `React` and `TypeScript`.
3. Move the contents of `index.tsx` and the `pages/` folder into the `src/` directory.
4. Install dependencies: `npm install @google/genai lucide-react react-router-dom`.

## Security Note
This app accesses the Gemini API directly from the client. For high-traffic production use, it is recommended to proxy these requests through a server-side function to keep your `API_KEY` fully secure.
