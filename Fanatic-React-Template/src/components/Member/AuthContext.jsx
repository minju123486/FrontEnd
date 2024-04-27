// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = () => {
    // �α��� ���� ���� ��
    setIsLoggedIn(true);
  };

  const logout = () => {
    // �α׾ƿ� ����
    setIsLoggedIn(false);
  };

  const setTokens = (access, refresh) => {
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accessToken, refreshToken, login, logout, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
//���⼭ �������� ��ū and �α������� ���