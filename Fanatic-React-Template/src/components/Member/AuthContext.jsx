// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    userNameGet();
  }, [accessToken]);

  const login = async () => {
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

  const userNameGet = async () => {

    if(accessToken != null){
      try {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/name_check/`, { 
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.name);
        } 
        else {
          console.error("Failed to fetch userName:", response.statusText);
        }  
      }
      catch (error) {
        console.error("Error:", error);
      }
    }
    else{
      console.log("nonononono");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accessToken, refreshToken, user, login, logout, setTokens, userNameGet}}>
      {children}
    </AuthContext.Provider>
  );
};
//���⼭ �������� ��ū and �α������� ���