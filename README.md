# StressNews

StressNews is a full-stack web application for browsing news articles filtered by stress level and tags. It consists of a React client and a Node.js/Express server.

## Project Structure

- `client/` — React frontend
- `server/` — Node.js/Express backend API

## Setup & Development

### Client
```bash
cd client
npm install
npm start
```

### Server
```bash
cd server
npm install
npm run build
npm start
```

The server runs on port 5000 by default and exposes `/api/news`.

## Environment Variables

You can set environment variables in `.env` files in the client and server folders as needed (e.g., API URLs, secrets).

## Building for Production

To create an optimized production build of the client:
```bash
cd client
npm run build
```
The build will be output to the `client/build` folder.

## Deployment

You can deploy the contents of the `client/build` folder to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).
The server can be deployed to any Node.js hosting platform (Heroku, Render, etc.).

## API

- `GET /api/news` — Returns a list of news articles.