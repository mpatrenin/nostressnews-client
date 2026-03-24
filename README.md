# StressNews Client

Frontend for the [StressNews](https://stressnews-client-940cee89049b.herokuapp.com/) app — browse news filtered by stress level and tags.

## Links
- [Live App](https://stressnews-client-940cee89049b.herokuapp.com/)
- [Server Source Code](https://github.com/mpatrenin/stressnews-server)

## Features
- Stress slider to filter news by emotional intensity (very low → very high)
- Tag-based filtering with popular tags derived from the current feed
- Error state with retry on API failure
- Silent background refresh when returning to the tab
- Responsive design

## Getting Started

```bash
npm install
```

Create a `.env` file in this directory:

```
REACT_APP_API_URL=http://localhost:5000
```

Then start the dev server:

```bash
npm start
```

## Deployment

Build and deploy to Heroku:

```bash
npm run build
git push heroku master
```

## API

`GET /api/news` — Returns a list of news articles with stress level, tags, and source info.
