import React, { useState, useEffect } from "react";
import styled, { css, keyframes  } from 'styled-components';

export default function ChatBot() {
  return (
    <ContainerBox>
      <div className="chat-messages">
        <div className="message" style={{fontWeight:"bold"}}>챗봇 이소다입니다! 한림대학교 연구실 및 인턴쉽 정보에 대해서 물어보세요!</div>
      </div>
    </ContainerBox>
    
  );
}

const ContainerBox = styled.div`
  width: 300px;
  height: auto;
  min-height: 30px;
  background: white;
  border-radius: 20px 20px 20px 0px;
  padding: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;