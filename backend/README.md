
# Canvas App Backend

This is the Node.js/Express backend for the Canvas sketching application.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
2. Create a `.env` file in the root directory and copy the contents from `.env.example`
3. Install dependencies:

```
npm install
```

4. Start the server:

```
# Development mode
npm run dev

# Production mode
npm start
```

## API Documentation

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/password` - Update user password

### User Routes

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/follow` - Follow user
- `POST /api/users/:id/unfollow` - Unfollow user
- `GET /api/users/:id/followers` - Get user followers
- `GET /api/users/:id/following` - Get user following

### Sketch Routes

- `GET /api/sketches` - Get all sketches
- `GET /api/sketches/:id` - Get single sketch
- `POST /api/sketches` - Create sketch
- `PUT /api/sketches/:id` - Update sketch
- `DELETE /api/sketches/:id` - Delete sketch
- `POST /api/sketches/:id/like` - Like sketch
- `POST /api/sketches/:id/unlike` - Unlike sketch
- `POST /api/sketches/:id/comments` - Comment on sketch
- `DELETE /api/sketches/:id/comments/:commentId` - Delete comment
- `GET /api/sketches/user/:userId` - Get user's sketches

### Notification Routes

- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id` - Mark notification as read
- `PUT /api/notifications` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete notification

## Project Structure

```
backend/
├── controllers/         # Route controllers
├── middleware/          # Custom middleware
├── models/              # MongoDB models
├── routes/              # Express routes
├── uploads/             # Uploaded files
├── .env                 # Environment variables
├── .env.example         # Example environment variables
├── server.js            # Entry point
└── package.json         # Project dependencies
```
