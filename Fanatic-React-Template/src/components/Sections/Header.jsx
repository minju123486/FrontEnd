import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// Components
import FullButton from "../Buttons/FullButton";
// Assets
import QuotesIcon from "../../assets/svg/Quotes";
import { useAuth } from "../Member/AuthContext";
import robotlee from '../../assets/img/robotlee.png';
import backbb from '../../assets/img/backbb8.jpg';


export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, cookie } = useAuth();

  const checkPosition = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_Server_IP}/position_check/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${cookie.access_token}`
        }
      });
      if (response.ok) {
        const status = response.status;
        if (status === 200) {
          navigate("/classroom");
        } else if (status === 201) {
          navigate("/proClassroom");
        } else {
          console.error('Unexpected status code:', status);
        }
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error checking position:', error);
    }
  };

  const handleEnterClassroom = () => {
    if (cookie.access_token) {
      checkPosition();
    } else {
      navigate("/login");
    }
  };


  const TypingEffect = ({ text, speed, type }) => {
    const [displayText, setDisplayText] = useState('');
  
    useEffect(() => {
      let currentIndex = 0;
  
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText((prevText) => prevText + text[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);
  
      return () => clearInterval(typingInterval);
    }, [text, speed, type]);
  
    return (
      <type>
        {displayText}
      </type>
    );
  };

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <WhiteBg id="home">
      <Wrapper>
      
        {showContent && (
          <Containermain>
            <p class="fontMedium" style={{fontSize:"70px", marginTop:"200px", fontWeight:"bold", color:"black"}}>AI 학습실 <strong class="fontMedium" style={{color:"green"}}>'iSoda'</strong> </p>
            <hr style={{width:"650px"}}/>
            <div class="fontMedium" style={{marginTop:"40px", display:"flex", alignItems:"center", flexDirection:"column", marginBottom:"50px"}}>
              <h3 style={{color:"black", marginBottom:"27px"}}><TypingEffect text="'교수와 학생 간의 원활한 공부 환경을 위한 서비스 제공'" speed={100} type="h3"/></h3>
              <h4 style={{color:"black", marginBottom:"7px"}}>교수가 문제 유형과 키워드를 고르면</h4>
              <h4 style={{color:"black", marginBottom:"15px"}}>iSoda 문제 생성 AI가 문제와 정답을 제공.</h4>
              <h4 style={{color:"black", marginBottom:"7px"}}>학생들이 문제를 풀고 나면</h4>
              <h4 style={{color:"black"}}>학생들의 퀴즈 결과에 대한 통계와 피드백 제공.</h4>
            </div>
            <Button onClick={handleEnterClassroom}>바로가기 &gt;</Button>
          </Containermain>
        )}
      </Wrapper>
    </WhiteBg>
  );
}

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: lightgreen;
    color: white;
  }
`;

const WhiteBg = styled.div`
  background-color: white;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.section`
  width: 100%;
  min-height: 840px;
  display: flex;
  background-image: url(${backbb});
  background-size: cover;
  background-attachment: fixed;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Containermain = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: -300px;
  @media (max-width: 960px) {
    margin-left: 0;
    text-align: center;
    width: 100%;
  }
`;

const RightSide = styled.div`
  width: 50%;
  position: relative;
  @media (max-width: 960px) {
    width: 100%;
    margin-top: 31px;
  }
`;

const HeaderP = styled.p`
  max-width: 470px;
  padding: 15px 0 20px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    text-align: center;
    max-width: 100%;
  }
`;

const BtnWrapper = styled.div`
  position: absolute;
  right: 400px;
  top: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  @media (max-width: 960px) {
    top: 40px;
    right: 0;
    align-items: center;
  }
`;

const QuoteWrapper = styled.div`
  max-width: 330px;
  z-index: 99;
  @media (max-width: 960px) {
    margin-top: 20px;
  }
`;

const QuotesWrapper = styled.div`
  position: relative;
  top: -10px;
  left: 0;
`;
