import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Set up axios interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const register = async (name, email, phone, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name,
        email,
        phone,
        password,
      });

      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });

      const { token: newToken, user: userData } = response.data;
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
