# Backend (Node.js) for GitHub Search App

This simple Express server proxies requests to the GitHub Search API to avoid CORS issues
and optionally allow you to attach a GitHub token.

## Usage
Install and start:
```bash
cd backend
npm install
npm start
```

## Adding a GitHub token (optional)
To increase rate limits, set an environment variable `GITHUB_TOKEN` before starting:
```bash
export GITHUB_TOKEN=ghp_XXXX
node server.js
```
The server will attach the token to outgoing requests.
