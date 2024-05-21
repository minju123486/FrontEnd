import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from 'styled-components';

// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Projects from "../components/Sections/Projects";
import Blog from "../components/Sections/Blog";
import Pricing from "../components/Sections/Pricing";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer";

import ChatBot from "../components/Sections/ChatBot";
import chatboticon from '../assets/img/chatboticon.png';
import pngwing from '../assets/img/pngwing.png';
import roundlogo from '../assets/img/roundlogo.png';
import chatrobot from '../assets/img/chatrobot.png';
import robotlee from '../assets/img/robotlee.png';
import soda1 from '../assets/img/soda1.png';
import soda2 from '../assets/img/soda2.png';
import { useAuth } from "../components/Member/AuthContext";

function Landing() {

  const [isClicked, setIsClicked] = useState(false);
  const [rotateDeg, setRotateDeg] = useState(0);
  const [showChatBot, setShowChatBot] = useState(false);
  const [imageSrc, setImageSrc] = useState(soda1);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { cookie } = useAuth();

  const handleClick = () => {
    setIsClicked(!isClicked);
    setRotateDeg(isClicked ? 0 : 45);
    const newImageSrc = isClicked ? soda1 : soda2;
    setTimeout(() => {
      setImageSrc(newImageSrc);
    }, 400);
  };

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setShowChatBot(true);
      }, 600);
    } else {
      setShowChatBot(false);
    }
  }, [isClicked]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
  
      fetchSendquery(inputValue);
    }
  };

  const fetchSendquery  = async (query) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/chat_response/`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${cookie.access_token}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              query: query 
            })
        });
        const result = await response.json();
      
        if (response.ok) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: result.response, sender: 'bot' }
          ]);
        } 
        else {
            console.error(`Fetch failed: ${result.message}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Header />
      <Projects />
      <Blog />
      <Pricing />
      <Contact />
      
      <ChatbotBox onClick={handleClick} isClicked={isClicked}>
        <Iconimg 
          src={imageSrc}
          alt={"챗봇"} 
          rotate={rotateDeg}
        />
      </ChatbotBox>

      <ModalContainer isClicked={isClicked}>
        <ModalContent>
          <ModalHeader>
            <ChatBotTitle><strong className="fontMedium">iSoda ChatBot</strong></ChatBotTitle>
            <img src={chatrobot} alt="Bot" style={{width:"38px", height:"45px"}}/>
          </ModalHeader>
        </ModalContent>

        <ModalInnerContent>
          <ChatAreaL>
            {showChatBot && (
              <ChatBot />
            )}
          </ChatAreaL>
          <ChatAreaR>
            {messages.map((message, index) => (
              <ChatMessageContainer key={index} isUser={message.sender === 'user'}>
                <ChatMessage isUser={message.sender === 'user'}><strong class="fontLight">{message.text}</strong></ChatMessage>
              </ChatMessageContainer>
            ))}
          </ChatAreaR>
        </ModalInnerContent>
        <ChatInputAndButtonWrapper>
          <ChatInput 
            type="text" 
            placeholder="메시지를 입력하세요" 
            value={inputValue}
            onChange={handleInputChange}
          />
          <SendMessageButton onClick={handleSendMessage}>전송</SendMessageButton>
        </ChatInputAndButtonWrapper>
      </ModalContainer>
    </>
  );
}

export default Landing;

const ChatbotBox = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 1000;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  background: #B9F6C7;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;

  &:hover {
      bottom: 20px;
      right: 20px;
      width: 75px;
      height: 75px;
  }
`;

const Pagecontent = styled.div`
  margin-bottom: 80px;
`;

const rotateAnimation1 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(60deg);
  }
`;

const rotateAnimation2 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-60deg);
  }
`;

const Iconimg = styled.img`
  width: 65px;
  height: 65px;

  ${({ rotate }) => rotate 
    ? css`
        animation: ${rotateAnimation1} 0.4s linear;
      `
    : css`
        animation: ${rotateAnimation2} 0.4s linear;
      `
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  padding:10px;
  bottom: 100px;
  right: 25px;
  border-radius: 20px;
  background: #F5FBEF;
  width: ${({ isClicked }) => (isClicked ? "400px" : "0px")};
  height: ${({ isClicked }) => (isClicked ? "580px" : "0px")};
  visibility: ${({ isClicked }) => (isClicked ? "visible" : "hidden")};
  transition: all 0.5s;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.4);
  z-index: 1001;
  overflow: hidden;
`;

const ModalContent = styled.div`
  background: #4CAF50; /* 초록색 배경 */
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const ChatBotTitle = styled.h2`
  margin-right: 120px;
  color: white;
`;

const ModalInnerContent = styled.div`
  overflow-y: auto;
  height: calc(100% - 130px);
  background: #C8F6D0;
  border-radius: 15px;
  padding: 18px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatInput = styled.input`
  width: calc(100% - 65px);
  height: 39px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

const SendMessageButton = styled.button`
  margin-left: 10px;
  width: 55px;
  height: 39px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const ChatAreaL = styled.div`
  height: auto;
  margin-bottom:10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align messages to the left */
`;

const ChatAreaR = styled.div`
  height: auto;
  margin-bottom:10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align messages to the right */
`;

const ChatMessageContainer = styled.div`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  width: 100%;
  margin-bottom: 5px;
`;

const ChatMessage = styled.div`
  max-width: 80%;
  background: ${({ isUser }) => (isUser ? '#e0f7fa' : '#ffffff')};
  border-radius: ${({ isUser }) => (isUser ? '20px 20px 0px 20px' : '20px 20px 20px 0px')};
  padding: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ChatInputAndButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin-top: 10px;
`;
