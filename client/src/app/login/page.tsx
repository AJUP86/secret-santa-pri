'use client';
import React from 'react';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { user, signIn, signOutUser } = useAuth();

  return (
    <div>
      <h1>Login</h1>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;
