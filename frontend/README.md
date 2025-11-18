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

## Deployment

### Pushing to GitHub

1. Initialize Git repository (if not already done):
```bash
git init
```

2. Add all files to staging:
```bash
git add .
```

3. Commit the changes:
```bash
git commit -m "Your commit message"
```

4. Add remote origin (replace with your repository URL):
```bash
git remote add origin https://github.com/your-username/kithab.git
```

5. Push to GitHub:
```bash
git push -u origin main
```

### Deploying to Netlify

#### Frontend Deployment
1. Build the frontend for production:
```bash
cd frontend
npm run build
```

2. The build files will be in the `dist` folder.

3. Go to [Netlify](https://netlify.com) and sign in.

4. Drag and drop the `dist` folder from `frontend/dist` to the Netlify deployment area, or connect your GitHub repository.

5. For GitHub integration:
   - Click "New site from Git"
   - Connect your GitHub account
   - Select the repository
   - Set build command: `npm run build`
   - Set publish directory: `frontend/dist`
   - Click "Deploy site"

6. Your frontend will be live on Netlify's URL.

#### Backend Deployment
For the backend, you'll need a platform that supports Node.js like Heroku, Railway, or Vercel. Here's an example for Heroku:

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create a new Heroku app:
```bash
heroku create your-app-name
```

3. Set environment variables in Heroku:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloudinary_name
heroku config:set CLOUDINARY_API_KEY=your_cloudinary_api_key
heroku config:set CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Deploy to Heroku:
```bash
git push heroku main
```

5. Your backend will be live on Heroku's URL.

Remember to update your frontend's API base URL to point to the deployed backend URL.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the ISC License.
