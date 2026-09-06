# Conexa

Conexa is a real-time video calling web app. Users can register, log in, start or join a meeting with a room code, chat during the call, and view their past meeting history. Guests can also join a meeting directly without an account.

## Features

- User registration and login (JWT-style token stored in localStorage)
- Start or join a video call using a meeting code
- Guest access, no account required to join a call
- Real-time video and audio calling using WebRTC (peer-to-peer)
- In-call text chat, synced across all participants
- Camera and microphone toggle during a call
- Screen sharing
- Meeting history for signed-in users, stored in MongoDB
- Responsive video grid that adjusts as participants join or leave

## Tech Stack

**Frontend**
- React (Create React App)
- React Router
- Material UI (MUI)
- Axios
- Socket.IO client

**Backend**
- Node.js, Express
- Socket.IO (signaling server for WebRTC)
- MongoDB with Mongoose
- bcrypt for password hashing
- dotenv for environment variables

**Calling**
- WebRTC (peer-to-peer, STUN server via Google's public STUN)

## Project Structure

```
Conexa/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── socketManager.js
│   │   │   └── user.controller.js
│   │   ├── models/
│   │   │   ├── meetingModel.js
│   │   │   └── userModel.js
│   │   ├── routes/
│   │   │   └── userRoutes.js
│   │   └── app.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   ├── background.png
    │   ├── calling.png
    │   └── mobile.jpg
    ├── src/
    │   ├── contexts/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── authentication.jsx
    │   │   ├── history.jsx
    │   │   ├── home.jsx
    │   │   ├── landing.jsx
    │   │   └── videoMeet.jsx
    │   ├── styles/
    │   │   ├── auth.module.css
    │   │   └── videoComponent.module.css
    │   ├── utils/
    │   │   └── withAuth.jsx
    │   ├── App.js
    │   ├── App.css
    │   ├── environment.js
    │   └── index.js
    ├── .gitignore
    └── package.json
```

## Local Setup

### Prerequisites
- Node.js installed
- A MongoDB Atlas cluster (or local MongoDB instance)

### Backend

```
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
PORT=8000
MONGO_URL=your_mongodb_connection_string
```

Run in development mode:

```
npm run dev
```

You should see:

```
Mongo Connected to Host : ...
App is listening on 8000
```

### Frontend

```
cd frontend
npm install
```

In `src/environment.js`, set `IS_PROD` to `false` for local development, and `true` before deploying:

```javascript
let IS_PROD = false;
```

Run:

```
npm start
```

The app will open at `http://localhost:3000`.

## Environment Variables

**backend/.env**
| Variable | Description |
|---|---|
| `PORT` | Port the backend server runs on (default 8000) |
| `MONGO_URL` | MongoDB Atlas connection string |

**frontend/src/environment.js**
| Variable | Description |
|---|---|
| `IS_PROD` | Set to `false` locally, `true` before deploying, controls which backend URL the frontend calls |

## Notes

- The backend uses an in-memory store for active call connections and chat messages during a call. This resets whenever the server restarts.
- Meeting history is only saved for signed-in users. Guest calls are not recorded.
- WebRTC connections use a public Google STUN server for NAT traversal.