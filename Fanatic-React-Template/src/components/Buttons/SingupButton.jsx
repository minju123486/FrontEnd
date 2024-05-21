import React from "react";
import styled from "styled-components";

export default function SingupButton({ title, action, border, small,margin_top, margin_left }) {
  return (
    <Wrapper
      onClick={action ? () => action() : null}
      border={border}
      small={small} // small prop을 Wrapper에 전달
      margin_top={margin_top}
      margin_left={margin_left}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: ${props => props.border ? "1px solid #01DF01" : "none"}; // border prop에 따른 조건부 스타일
  background-color: ${props => props.border ? "transparent" : "#20C075"};
  width: 220px; // 버튼의 너비를 줄입니다.
  height: 40px;
  margin-top: ${props => props.margin_top ? "45px" : "20px"};
  align-self: ${props => props.small ? "flex-end" : "auto"};
  padding: ${props => props.small ? "8px 12px" : "15px 30px"};
  font-size: ${props => props.small ? "14px" : "16px"};
  color: ${props => props.border ? "#707070" : "#fff"};
  outline: none;
  font-weight:bold;
  border-radius: 20px;
  display: flex; /* 요소를 플렉스 박스로 설정 */
  flex-direction: column; /* 수직으로 요소들을 배치 */
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  

  &:hover {
    background-color: ${props => props.border ? "transparent" : "#01DF01"};
    border: ${props => props.border ? "1px solid #7620ff" : "none"}; // 호버 시 테두리 스타일
    color: ${props => props.border ? "#7620ff" : "#fff"};
  }
`;
