// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [user_name, setUsername] = useState(null);
  const [usertype, setUserTpye] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);

  useEffect(() => {
    userNameGet();
  }, [cookie.access_token]);

  const login = async () => {
    // 로그인 로직 성공 시
    setIsLoggedIn(true);
  };

  const logout = () => {
    // 로그아웃 로직
    setIsLoggedIn(false);
    removeTokens();
  };

  const setTokens = (access, refresh) => {
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const onCookie = (name, token) => {
    setCookie(name, token, {path: '/'});
  }

  const onCookie24 = (name, token) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000));
    setCookie(name, token, {path: '/', expires});
  }

  const removeTokens = () => {
    removeCookie('access_token');
    removeCookie('refresh_token');
  };

  const userNameGet = async () => {

    if(cookie.access_token != null){
      try {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/name_check/`, { 
          method: "GET",
          headers: {
            "Authorization": `Bearer ${cookie.access_token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.name);
          setUsername(data.username);
          if(data.usertype === "professor" ? setUserTpye("교수") : setUserTpye("학생"));
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
    <AuthContext.Provider value={{ isLoggedIn, accessToken, refreshToken, user, user_name, usertype, cookie, login, logout, setTokens, userNameGet, onCookie, removeTokens, onCookie24}}>
      {children}
    </AuthContext.Provider>
  );
};
//여기서 전역으로 토큰 and 로그인정보 사용