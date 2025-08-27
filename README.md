# StressNews Client

This is the frontend part of StressNews app. It allows users to browse news articles, filter by stress level and tags, and interact with the backend API.

## Main App
- [Live App](https://stressnews-client-940cee89049b.herokuapp.com/)
- [Server Source Code](https://github.com/mpatrenin/stressnews-server)

## Project Structure

- `client/` — React frontend
- `server/` — Node.js/Express backend API

## Features
- Browse and filter news articles
- Stress slider and popular tags
- Responsive design
- Deployed on Heroku

## Getting Started
1. Install dependencies: `npm install`
2. Start client: `npm start`
3. Environment: Set API URL in `.env`

## Deployment
- Deployed on Heroku
- See server README for backend setup

---
For the server app, see [server/README.md](https://github.com/mpatrenin/stressnews-server/README.md)

## Deployment

You can deploy the contents of the `client/build` folder to any static hosting service.
The server can be deployed to any Node.js hosting platform.

## API

- `GET /api/news` — Returns a list of news articles.
