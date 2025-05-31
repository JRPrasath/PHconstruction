# PaperHouse Construction Website

A modern, responsive website for PaperHouse Construction company built with React and Node.js.

## Features

- Modern, responsive design
- Admin dashboard for managing content
- Project showcase
- Service listings
- Contact form
- Image gallery
- Authentication system

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Axios
- Headless UI

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Multer (for file uploads)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd paperhouse-construction
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/paperhouse
   JWT_SECRET=your_jwt_secret
   ```

4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

5. Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
paperhouse-construction/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Projects
- GET /api/projects - Get all projects
- POST /api/projects - Create a new project (admin only)
- PUT /api/projects/:id - Update a project (admin only)
- DELETE /api/projects/:id - Delete a project (admin only)

### Services
- GET /api/services - Get all services
- POST /api/services - Create a new service (admin only)
- PUT /api/services/:id - Update a service (admin only)
- DELETE /api/services/:id - Delete a service (admin only)

### Contact
- POST /api/contact - Submit a contact form
- GET /api/contact - Get all messages (admin only)
- PUT /api/contact/:id - Update message status (admin only)
- DELETE /api/contact/:id - Delete a message (admin only)

### Gallery
- GET /api/gallery - Get all images
- POST /api/gallery/upload - Upload an image (admin only)
- DELETE /api/gallery/:filename - Delete an image (admin only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 