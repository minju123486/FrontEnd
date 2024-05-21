import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Member/AuthContext";
import backbb from '../../assets/img/study2.jpg';
import isodaloding from '../../assets/img/loding/isodaloding.png';

//useState로 컴포넌트 상태 관리
const ClassDiary = () => {
    const navigate = useNavigate();

    const { user, isLoggedIn, cookie} = useAuth();

return (
  <ClassroomWrapper>
    <CoursesBox>
    <h2 style={{color:"#20C075", fontWeight:"bold"}}>{user}님의 수업 일기장</h2>
    </CoursesBox>
  </ClassroomWrapper>
);

};

export default ClassDiary;

const ClassroomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${backbb});
    background-size: cover;
    background-attachment: fixed;
    opacity: 0.2;
    z-index: -1;
  }
`;

const CoursesBox = styled.div`
  width: 45%;
  min-height: 75%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 20px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  overflow: hidden;
  margin-top:50px;
`;

const TitleText = styled.h3`
  margin: 0;
  font-weight: bold;
  color: #333;
`;