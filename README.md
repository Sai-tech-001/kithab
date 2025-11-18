# kithab

A second-hand book marketplace application built with React (frontend) and Node.js/Express (backend).

## Features

- User authentication and registration
- Browse and search for second-hand books
- Sell books with image uploads
- User profiles and book listings
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Axios for API calls
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads
- Cloudinary for image storage
- Express Validator for input validation

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sai-tech-001/kithab.git
cd kithab
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables:
Create a `.env` file in the backend directory with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

2. Start the frontend:
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:3002

3. Open your browser and navigate to http://localhost:3002

## Project Structure

```
kithab/
├── backend/          # Node.js/Express backend
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   └── server.js     # Main server file
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   └── api/         # API client
│   └── public/          # Static assets
├── assets/           # Shared assets
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login

### Books
- GET /api/books - Get all books
- POST /api/books - Create new book listing (authenticated)
- GET /api/books/:id - Get book details
- PUT /api/books/:id - Update book (owner only)
- DELETE /api/books/:id - Delete book (owner only)

### Users
- GET /api/users/profile - Get user profile (authenticated)
- PUT /api/users/profile - Update user profile (authenticated)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the ISC License.
