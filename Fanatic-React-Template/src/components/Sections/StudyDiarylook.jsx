import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Member/AuthContext";
import { MdReportProblem } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaRegDotCircle } from "react-icons/fa";

const StudyDiarylook = () => {
    const navigate = useNavigate();
    const { cookie, user} = useAuth();
    
    const location = useLocation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    
    const handleBack = () => {
        navigate(`/studyDiary`);
    };

    useEffect(() => {
        fetchstudydiarylook();
    }, []);


    const fetchstudydiarylook = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/daily_look/`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${cookie.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id: location.state.id
            })
        });
        const result = await response.json();
      
        if (response.ok) {
            setTitle(result.title);
            const sentences = result.content.match(/[^.!?]+[.!?]/g).map((sentence, index) => (
              <p  key={index}><strong class="fontLight">{sentence}</strong><br/><br/></p> 
          ));
            setContent(sentences);
        } 
        else {
            console.error(`불러오기 실패 : ${result.message}`);
        }
      } catch (error) {
        console.error('Error fetching date list:', error);
      }
    };

    


    return(
        <Wrapper>
            <Content>
                <Title>
                    <h2 class="fontMedium" style={{color:"#20C075", fontWeight:"bold"}}>{user}님의 ({location.state.date}) 일기</h2>
                    <Underline />
                </Title>

                    <FeedbackBox>
                        <FeedbackContent>
                            <h3 class="fontMedium">{title}</h3>
                            <Grayunderline />
                            {content}
                        </FeedbackContent>
                    </FeedbackBox>
                    <Button onClick={handleBack}><h4>확인</h4></Button>
            </Content>   
        </Wrapper>
    );
}

export default StudyDiarylook;

const Wrapper = styled.div`
  margin-top:80px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #EFF8F3;
  flex-direction: column;
`;

const Content = styled.div`
  width: 60%;
  min-height:80%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius:15px;
  margin-bottom: 40px;
  margin-top:50px;
`;

const Content_sec = styled.div`
  width: 60%;
  min-height:80%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius:15px;
  margin-bottom: 40px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Underline = styled.div`
  width: 500px;
  height: 2px;
  background-color: #20C075;
  margin-top: 12px;
  margin-bottom: 40px;
`;

const Grayunderline = styled.div`
  width: 700px;
  height: 1px;
  background-color: #ccc;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const BoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin-top: 40px;
`;

const HistBox = styled.div`
  width: 400px;
  height: 350px;
  background-color: #FBFAFA;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const FeedbackBox = styled.div`
  width: 850px;
  height: 560px;
  justify-content: center;
  background-color: #FBFAFA;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom:20px;
`;

const FeedbackContent = styled.div`
  overflow-y: auto;
  height:530px;
`;

const Button = styled.button`
  background: ${props => props.disabled ? '#ccc' : '#4CAF50'};
  color: ${props => props.disabled ? '#666' : 'white'};
  border: none;
  border-radius:7px;
  padding: 10px 20px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#367c39'};
  }
`;

const FeedbackButton = styled.div`
    width: 100px;
    height: 40px;
    background-color: ${props => props.selected ? "#8DF689" : "#FBFAFA"};
    color: ${props => props.selected ? "black" : "#ccc"};
    border: 1px solid #ccc;
    border-radius: 10px 0px 0px 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-top: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProblemButton = styled.div`
    width: 100px;
    height: 40px;
    background-color: ${props => props.selected ? "#8DF689" : "#FBFAFA"};
    color: ${props => props.selected ? "black" : "#ccc"};
    border: 1px solid #ccc;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-top: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Section = styled.div`
  margin-bottom: 20px;
  width: 100%; /* 전체 너비를 균일하게 설정 */
  border: 1px solid #ccc; /* 섹션 별 구분선 */
  padding: 20px; /* 내부 패딩 */
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1); /* 경계가 더 명확하도록 그림자 추가 */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

const QuestionContainer = styled.div`
  padding: 10px 20px;
  margin-top:5px;
  margin-bottom: 10px;
  border-left: 3px solid transparent;
  transition: border-color 0.3s, margin-left 0.3s;
  width: 99%; /* 컨테이너 너비를 균일하게 설정 */
  display: flex;
  justify-content: space-between; /* 내용을 양쪽으로 정렬 */
  border: 1px solid #ddd; /* 각 질문별 구분을 위한 경계선 */
  border-radius:15px;
  background-color: #F5FBEF; /* 배경색 추가 */

  &:hover, &.isSelected {
    width: 100%;
    border-left: 3px solid #4CAF50; /* 호버 및 선택 시 초록색 테두리로 변경 */
    background-color: #e6ffe6; /* 호버 및 선택 시 배경색 변경 */
  }
`;

const QuestionContent = styled.div`
  white-space: pre-wrap; /* 공백과 개행을 유지합니다. */
  flex: 1;
`;

const OptionH4 = styled.h4`
  font-weight: ${props => props.isCorrect ? 'bold' : '300'};
  cursor: pointer;
  background-color: ${props => props.isCorrect ? '#d4edda' : ''};
  border-radius: 10px;
  display: inline-block;
  padding-left: 5px;
`;

const OptionDiv = styled.div`
  width:100%;
`;

const OptionLabel = styled.label`
display: block;
margin-bottom: 10px;
`;

const OptionCheckbox = styled.input`
  margin-right: 5px;
`;

const QuestionInput = styled.input` /* 추가한 부분 */
  padding: 10px;
  margin: 5px 0;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const buttonStyles = css`
  padding: 10px 15px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid #4CAF50; /* 버튼 테두리 색상 추가 */
  background-color: white; /* 배경색을 흰색으로 설정 */
  color: black; /* 글자색을 검정색으로 설정 */
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s, border-radius 0.3s;

  &:hover {
    transform: scale(1.05); /* 버튼이 조금 커지는 효과 */
    box-shadow: 0px 8px 15px rgba(0,0,0,0.2); /* 그림자를 진하게 */
    background: linear-gradient(145deg, #4caf50, #66bb6a); /* 그라디언트 배경 */
    border-radius: 8px; /* 모서리가 더 둥글게 */
  }

  ${({ active }) => active && `
    background-color: #007BFF; /* 활성화됐을 때의 배경색 */
    color: white; /* 활성화됐을 때의 글자색 */
    border-color: #007BFF; /* 활성화됐을 때의 테두리 색상 */
  `}
`;

const Buttona = styled.button` /* 추가한 부분 */
  ${buttonStyles}
`;

const QuestionDivider = styled.hr`
  margin: 20px 0;
  border: 0;
  height: 1px;
  background-color: #ccc; // 문제 사이의 구별 선
`;