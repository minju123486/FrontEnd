import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import QconfirmButton from "../Buttons/QconfirmButton";
import { MdQuiz } from "react-icons/md";
import { useParams } from 'react-router-dom';
import timeloding from '../../assets/img/loding/time.gif';
import isodaloding from '../../assets/img/loding/isodaloding.png';
import { useAuth } from '../Member/AuthContext';
import { useNavigate } from "react-router-dom";
import { IoBulbOutline } from "react-icons/io5";

const PageContainer = styled.div`
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SidebarSection = styled.div`
  margin: 20px 0 ;
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


const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px; /* 버튼 간격 조정 */;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ccc; /* 구분선 색상 */
  margin: 10px 0; /* 구분선 위아래 여백 */
`;

const Label = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

const buttonStyles = css`
  padding: 10px 15px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid #4CAF50; /* 버튼 테두리 색상 추가 */
  background-color: white; /* 배경색을 흰색으로 설정 */
  color: black; /* 글자색을 검정색으로 설정 */
  border-radius: 15px;
  // width: 20px;
  // height: 20px;
  transition: background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s, border-radius 0.3s;

  &:hover {
    transform: scale(1.05); /* 버튼이 조금 커지는 효과 */
    box-shadow: 0px 8px 15px rgba(0,0,0,0.2); /* 그림자를 진하게 */
    background: linear-gradient(145deg, #4caf50, #66bb6a); /* 그라디언트 배경 */
    border-radius: 50%; /* 모서리가 더 둥글게 */
  }

  ${({ active }) => active && `
    background-color: #007BFF; /* 활성화됐을 때의 배경색 */
    color: white; /* 활성화됐을 때의 글자색 */
    border-color: #007BFF; /* 활성화됐을 때의 테두리 색상 */
    border-radius: 50%;
  `}
`;

const TypeButton = styled.button`
  ${buttonStyles}
  ${({ active }) => active && `
    background-color: #007BFF; // 선택됐을 때의 배경색
    color: white; // 선택됐을 때의 글자색
    border-color: #007BFF; // 선택됐을 때의 테두리 색상
  `}
`;

const CountSelect = styled.select`
  ${buttonStyles}
  ${({ disabled }) => disabled && `
    opacity: 0.5; // 비활성화 시 투명도 조정
    pointer-events: none; // 비활성화 시 클릭 이벤트 막기
  `}
`;

const GenerateButtonContainer = styled.div`
  margin-top: 20px;
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: center; /* 버튼을 가운데로 정렬 */
`;

const GenerateButton = styled.button`
  ${buttonStyles}
  background-color: #007BFF;
  color: white;
`;


const Input = styled.input`
  width: 60%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: relative; /* 부모 위치 지정 */
`;

const InputContainer2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: relative; /* 부모 위치 지정 */
  margin-bottom:30px;
`;

const KeywordSelect = styled.select`
  padding: 5px 10px;
  margin: 0 5px;
  margin-left: 20px;
  font-size: 18px;
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

const KeywordCheck = styled.div`
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 18px;
  width: 500px;
  height:60px;
  min-height: 60px;
  word-wrap: break-word;
  border-radius: 8px;
  margin-top: 0px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .removeButton {
    margin-left: 5px;
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`${buttonStyles}`;

const DownloadButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  padding-right: 20px; /* 상단바와의 간격 조절을 위한 우측 패딩 */
`;

const DownloadButton = styled.button`
  ${buttonStyles}
  background-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
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

const Checkbox = styled.div`
  display: flex;
  align-items: center;

  /* 각 라디오 버튼 스타일 지정 */
  input[type="radio"] {
    margin-right: 5px;
  }
`;

const Button = styled.button` /* 추가한 부분 */
  ${buttonStyles}
`;

const QuestionInput = styled.input` /* 추가한 부분 */
  padding: 10px;
  margin: 5px 0;
  width: 70%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const QuestionDivider = styled.hr`
  margin: 20px 0;
  border: 0;
  height: 1px;
  background-color: #ccc; // 문제 사이의 구별 선
`;

const QuestionContent = styled.div`
  white-space: pre-wrap; /* 공백과 개행을 유지합니다. */
  flex: 1;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
`;

const OptionCheckbox = styled.input`
  margin-right: 5px;
`;

const Content_sec = styled.div`
  width: 80%;
  min-height:80%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 40px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius:15px;
  margin-bottom: 40px;
  margin-top: 40px;
`;

const OptionH4 = styled.h4`
  cursor: pointer;
  border-radius: 10px;
  display: inline-block;
  padding-left: 5px;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: all 0.3s;
  

  &:hover {
    background-color: #d4edda;
    border-color: #ccc;
  }

  ${({ active }) =>
    active &&
    ` 
    background-color: #d4edda;
    
    border-color: #208013;
  `}
`;


// 주요 컴포넌트 정의
function SolveQpage() {
  // 로딩상태, 에러상태, 선택된 옵션들, 선택된 문제 유형, 사용자 입력 질문, 서버로부터 받은 문제 데이터 상태 관리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selections, setSelections] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]); // 서버로부터 받은 문제 데이터
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({}); 


  const {course_imformation} = useParams();

  const parts = course_imformation.split("$$");
  const course_name = parts[0];
  const course_professor = parts[1];

  const {cookie} = useAuth();
  const navigate = useNavigate();

  // // 선택된 옵션 변겅 시 로그 출력을 위한 useEffect 훅 사용
  // useEffect(() => {
  //   console.log(selections);
  // }, [selections]); // selections 상태가 변경될 때마다 실행됩니다.


  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };



  // 문제 데이터를 서버로부터 가져오는 함수
  const fetchQuestions = () => {
      setLoading(true);
      fetch(`${process.env.REACT_APP_Server_IP}/student_problem/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${cookie.access_token}`
        },
        body: JSON.stringify({ 
          course_name : course_name,
          course_professor : course_professor

        })
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setQuestions(data.questions);
      })
      .catch(error => {
        console.error('문제를 받아오는중 에러:', error);
        setError(error.message);
        setLoading(true);
      });
  };



  const sendAnswer = () => {
    let answers = {"answer1":'', "answer2":'', "answer3":'', "answer4":'', "answer5":'',
                   "answer6":'', "answer7":'', "answer8":'', "answer9":'', "answer10":''};
    let num = 1;

    questions.forEach((questionType, index) => {
      // 문제 유형별로 답안을 생성합니다.
      questionType.items.forEach((item, itemIndex) => {
        const questionId = `question-${index}-${itemIndex}`;
        answers[`answer${num}`] = selectedAnswers[questionId] || '';
        num ++;
      });
    });
  
    // 생성한 답안을 쟝고로 전송합니다.
    fetch(`${process.env.REACT_APP_Server_IP}/student_answer/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${cookie.access_token}`
      },
      body: JSON.stringify({
        course_name: course_name,
        course_professor: course_professor,
        answers: answers,
      }),
    })
      .then((response) => {
        if (response.ok) {
          navigate(`/Classroom`);
          console.log("답안 보내기 성공.");
        }
        return response.json();
      })

      .catch((error) => {
        console.error('답안을 전송하는 중 에러:', error);
      });
  };




  const handleQuestionClick = (id) => {
    setSelectedQuestionId(id);
  };

    
  // 컴포넌트가 마운트 될 때 서버로부터 문제 데이터를 가져옴
  useEffect(() => {
    fetchQuestions(); // 컴포넌트가 마운트될 때 서버로부터 문제 데이터를 가져옵니다.
  }, []); // 의존성 배열이 비어 있으므로, 컴포넌트가 처음 마운트될 때만 fetchQuestions 함수가 실행됩니다





//문제 유형별로 view 설정/////////////////////////////////////////////////////////////////////////////////////////////////////////
  const renderQuestionUI = (type, item, questionId) => {
    switch (type) {
      case 1: // 객관식-빈칸
      case 2: // 객관식-단답형
      case 3: // 객관식-문장형
        return (
          <>
            {item.options.map((option, optionIndex) => (
              <OptionLabel key={optionIndex} active={selectedAnswers[questionId] === option}>
                <OptionCheckbox
                  type="radio"
                  id={`option-${optionIndex}`}
                  name={`question-${questionId}`}
                  value={option}
                  onChange={() => handleAnswerSelect(questionId, option)}
                />
                <OptionH4 active={selectedAnswers[questionId] === option}>{option}</OptionH4>
              </OptionLabel>
            ))}
          </>
        );
    
      case 4: // 단답형-빈칸
      case 5: // 단답형-문장형
      case 7: // 서술형-코딩
        return (
          <QuestionInput
            type="text"
            placeholder="답을 작성하세요."
            onChange={(e) => handleAnswerSelect(questionId, e.target.value)}
          />
        );
      case 6: // OX선택형-O/X
      return (
        <>
          <Button
            onClick={() => handleAnswerSelect(questionId, 'O')}
            active={selectedAnswers[questionId] === 'O'} // 선택된 항목에 따라 색상 변경을 위해 active 속성 추가
          >
            O
          </Button>
          /
          <Button
            onClick={() => handleAnswerSelect(questionId, 'X')}
            active={selectedAnswers[questionId] === 'X'} // 선택된 항목에 따라 색상 변경을 위해 active 속성 추가
          >
            X
          </Button>
        </>
      );
    default:
      return null;
  }
};

  return (
    <>
      {loading ? (
        <PageContainer>
          <InputContainer>
          <h1 class="fontMedium" style={{marginBottom:"25px", color:"black", fontWeight:"bold"}}><IoBulbOutline /> <strong style={{color:"#20C075"}}>{course_name}</strong> 퀴즈 시작<IoBulbOutline /></h1>
          </InputContainer>
          <InputContainer>
            <hr style={{ width: "850px", height: "2px", backgroundColor: "#20C075", border: "none" }} />
          </InputContainer>

        <img src={isodaloding} alt={"로딩 중"} style={{marginTop:"15px"}}/>
        <h2 style={{marginTop:"25px", color:"#20C075", fontWeight:"bold"}}>퀴즈가 생성 중입니다.</h2>
        </PageContainer>
      ) : (
      <PageContainer>
        <InputContainer>
          <h1 class="fontMedium" style={{marginBottom:"25px", color:"black", fontWeight:"bold"}}><IoBulbOutline /> <strong style={{color:"#20C075"}}>{course_name}</strong> 퀴즈 시작<IoBulbOutline /></h1>
        </InputContainer>
        <InputContainer>
            <hr style={{ width: "850px", height: "2px", backgroundColor: "#20C075", border: "none" }} />
        </InputContainer>

        <Content_sec>
          {questions && questions.map((questionType, index) => (
            <React.Fragment key={index}>
              <Section>
                <Label>문제 유형: {questionType.type}</Label>
                {questionType.items && questionType.items.map((item, itemIndex) => (
                  <QuestionContainer
                    key={`question-${index}-${itemIndex}`}
                    className={selectedQuestionId === `question-${index}-${itemIndex}` ? 'isSelected' : ''}
                    onClick={() => handleQuestionClick(`question-${index}-${itemIndex}`)}
                  >
                    <QuestionContent>
                      <div style={{marginBottom:"10px"}}>
                        <strong style={{fontSize:"20px"}}>문제 : {item.content}</strong>
                      </div>
                      {renderQuestionUI(questionType.type, item, `question-${index}-${itemIndex}`)}
                    </QuestionContent>
                  </QuestionContainer>
                ))}
              </Section>
              {index < questions.length - 1 && <QuestionDivider />}
            </React.Fragment>
          ))}
        </Content_sec>
        

        <QconfirmButton  title="퀴즈 마감 제출" margin_top={true} action={sendAnswer}/>

      </PageContainer>
      )}
    </>
  );
}

export default SolveQpage;