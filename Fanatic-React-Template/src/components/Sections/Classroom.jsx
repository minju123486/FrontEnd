import React from 'react';
import styled from "styled-components";

const Classroom = () => {
    return (
        <Wrapper>
            <div>강의실 페이지 입니다.</div>
        </Wrapper>
    );
  };
   
  export default Classroom;



  const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  display: flex;
  @media (max-width: 960px) {
    flex-direction: column;
  }
  background:#EFF8F3;
`;