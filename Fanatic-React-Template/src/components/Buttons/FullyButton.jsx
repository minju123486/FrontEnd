import React from "react";
import styled from "styled-components";

export default function FullyButton({ title, action, border, small }) {
  return (
    <Wrapper
      onClick={action ? () => action() : null}
      border={border}
      small={small} // small prop을 Wrapper에 전달
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: ${props => props.border ? "1px solid #707070" : "none"}; // border prop에 따른 조건부 스타일
  background-color: ${props => props.border ? "transparent" : "green"};
  width: ${props => props.small ? "50%" : "100%"}; // 버튼의 너비를 줄입니다.
  margin: ${props => props.small ? "10px 0" : "0"}; // 버튼 위 아래에 마진을 추가합니다.
  align-self: ${props => props.small ? "flex-end" : "auto"};
  padding: ${props => props.small ? "8px 12px" : "15px 20px"};
  font-size: ${props => props.small ? "14px" : "16px"};
  color: ${props => props.border ? "#707070" : "#fff"};
  outline: none;
  font-weight:bold;
  border-radius: 25px;

  &:hover {
    background-color: ${props => props.border ? "transparent" : "#8DF689"};
    border: ${props => props.border ? "1px solid #7620ff" : "none"}; // 호버 시 테두리 스타일
    color: ${props => props.border ? "#7620ff" : "#fff"};
  }
`;
