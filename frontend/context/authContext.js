import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { API_URL, NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  // Register User
  const register = async ({ username, email, password }) => {
    console.log({ username, email, password });
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setUser(data.user);
    setError(null);
    router.push('/account/dashboard');
  };

  // Login User
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      setError(data.message);
      return;
    }

    setUser(data.user);
    setError(null);
    router.push('/account/dashboard');
  };

  // Logout User
  const logout = async user => {
    console.log('Logout');
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      setError('Something went wrong, please try again later');
      return;
    }

    setError(null);
    setUser(null);
    router.push('/');
  };

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    console.log('check');
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (!res.ok) {
      setUser(null);
      return;
    }

    setUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
