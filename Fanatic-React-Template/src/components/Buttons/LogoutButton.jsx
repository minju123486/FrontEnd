import React from "react";
import styled from "styled-components";


export default function LogoutButton({ title, action, border, small, margin_top }) {
  return (
    <Wrapper
      onClick={action ? () => action() : null}
      border={border}
      small={small} // small prop�� Wrapper�� ����
      margin_top={margin_top}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: ${props => props.border ? "1px solid #01DF01" : "none"}; // border prop�� ���� ���Ǻ� ��Ÿ��
  background-color: ${props => props.border ? "transparent" : "#20C075"};
  width: 90px; // ��ư�� �ʺ� ���Դϴ�.
  height:40px;
  align-self: ${props => props.small ? "flex-end" : "auto"};
  padding: ${props => props.small ? "8px 12px" : "8px 12px"};
  font-size: ${props => props.small ? "10px" : "14px"};
  color: ${props => props.border ? "#707070" : "#fff"};
  outline: none;
  font-weight:bold;
  border-radius: 5px;
  margin-left: 10px;
  

  &:hover {
    background-color: ${props => props.border ? "transparent" : "#01DF01"};
    border: ${props => props.border ? "1px solid #7620ff" : "none"}; // ȣ�� �� �׵θ� ��Ÿ��
    color: ${props => props.border ? "#7620ff" : "#fff"};
  }
`;
