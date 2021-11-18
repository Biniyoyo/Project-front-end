# CSE316 Final Project - Frontend

## Quick Start

### Start on localhost:3000 server

1. `yarn install` or `npm install` to install packages

2. `yarn start` or `npm start` to start your local server on 3000 port

### Production

-   `yarn build`

## Structure

```
cse316-final-frontend
├── public/             # static files
│   ├── index.html      # html template
│   ├── manifest.json   # manifest info
│   └── robots.txt
│
├── src/                # project root
│   ├── api/            # APIs
│   ├── assets/         # images e.i. default user image
│   ├── components/     # basic components e.i. Card, Button, ...
│   ├── pages/     # pages e.i. Main.jsx, Profile.jsx, ...
│   ├── App.css         # main style sheet
│   ├── App.js
│   ├── index.js
│   └── recoilStates.js # global recoil states
│
├── ...
└── package.json
```
