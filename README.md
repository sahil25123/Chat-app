# Chat Application

A real-time chat application built with React (Frontend) and Node.js (Backend).

## Project Structure

The project is divided into two main parts:

### Frontend (`/frontend`)
- Built with React + Vite
- Real-time messaging interface
- User authentication
- Modern UI components

### Backend (`/backend`)
- Node.js server
- Socket.IO for real-time communication
- MongoDB database
- RESTful API endpoints
- Authentication middleware

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Chat-app
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

### Running the Application

1. Start the Backend Server
```bash
cd backend
npm start
```

2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

The application should now be running with:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Features

- Real-time messaging
- User authentication
- Message history
- Online/offline status
- Typing indicators
- Message delivery status

## Tech Stack

### Frontend
- React
- Vite
- Socket.IO Client
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- Socket.IO
- MongoDB
- JWT Authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 