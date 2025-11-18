import axios from 'axios';

const API_URL =
    import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
});

// Auth APIs
export const authAPI = {
    register: (name, email, phone, password) =>
        apiClient.post('/auth/register', { name, email, phone, password }),
    login: (email, password) =>
        apiClient.post('/auth/login', { email, password }),
    getMe: () => apiClient.get('/auth/me'),
};

// Books APIs
export const booksAPI = {
    getAllBooks: (params) => apiClient.get('/books', { params }),
    getBook: (id) => apiClient.get(`/books/${id}`),
    createBook: (data) => apiClient.post('/books', data),
    updateBook: (id, data) => apiClient.put(`/books/${id}`, data),
    deleteBook: (id) => apiClient.delete(`/books/${id}`),
    markSold: (id, buyerId) => apiClient.patch(`/books/${id}/sold`, { buyerId }),
    addReview: (id, name, email, rating, comment) =>
        apiClient.post(`/books/${id}/review`, { name, email, rating, comment }),
    getByCategory: (category) => apiClient.get(`/books/category/${category}`),
    getTrending: () => apiClient.get('/books/trending/all'),
};

// Users APIs
export const usersAPI = {
    getProfile: (id) => apiClient.get(`/users/${id}`),
    updateProfile: (id, data) => apiClient.put(`/users/${id}`, data),
    getBooksListed: (id) => apiClient.get(`/users/${id}/books-listed`),
    getBooksBought: (id) => apiClient.get(`/users/${id}/books-bought`),
    getBooksSold: (id) => apiClient.get(`/users/${id}/books-sold`),
    getAllSellers: () => apiClient.get('/users'),
};

export default apiClient;