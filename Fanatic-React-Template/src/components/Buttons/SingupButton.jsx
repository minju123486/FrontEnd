import React from "react";
import styled from "styled-components";

export default function SingupButton({ title, action, border, small,margin_top, margin_left }) {
  return (
    <Wrapper
      onClick={action ? () => action() : null}
      border={border}
      small={small} // small prop�� Wrapper�� ����
      margin_top={margin_top}
      margin_left={margin_left}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: ${props => props.border ? "1px solid #01DF01" : "none"}; // border prop�� ���� ���Ǻ� ��Ÿ��
  background-color: ${props => props.border ? "transparent" : "#20C075"};
  width: 220px; // ��ư�� �ʺ� ���Դϴ�.
  height: 40px;
  margin-top: ${props => props.margin_top ? "45px" : "20px"};
  align-self: ${props => props.small ? "flex-end" : "auto"};
  padding: ${props => props.small ? "8px 12px" : "15px 30px"};
  font-size: ${props => props.small ? "14px" : "16px"};
  color: ${props => props.border ? "#707070" : "#fff"};
  outline: none;
  font-weight:bold;
  border-radius: 20px;
  display: flex; /* ��Ҹ� �÷��� �ڽ��� ���� */
  flex-direction: column; /* �������� ��ҵ��� ��ġ */
  justify-content: center; /* ���� �߾� ���� */
  align-items: center; /* ���� �߾� ���� */
  

  &:hover {
    background-color: ${props => props.border ? "transparent" : "#01DF01"};
    border: ${props => props.border ? "1px solid #7620ff" : "none"}; // ȣ�� �� �׵θ� ��Ÿ��
    color: ${props => props.border ? "#7620ff" : "#fff"};
  }
`;
