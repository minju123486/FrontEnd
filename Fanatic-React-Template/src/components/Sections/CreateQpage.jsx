import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled, { css } from 'styled-components';
import Sidebar from './Sidebar'; // 사이드바 컴포넌트를 임포트합니다.
import QconfirmButton from "../Buttons/QconfirmButton";
import {GiBookmarklet} from 'react-icons/gi';
import { useParams } from 'react-router-dom';
import { useAuth } from "../Member/AuthContext";
import timeloding from '../../assets/img/loding/time.gif';
import isodaloding from '../../assets/img/loding/secsoda.png';


const PageContainer = styled.div`
  padding-top: 120px;
  margin-left: 250px; /* 사이드바 너비만큼 여백 추가 */
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
  margin-right: 10px;
`;

const buttonStyles2 = css`
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
  ${buttonStyles2}
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
  width: 95%;
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
function CreateQPage() {
  // 로딩상태, 에러상태, 선택된 옵션들, 선택된 문제 유형, 사용자 입력 질문, 서버로부터 받은 문제 데이터 상태 관리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selections, setSelections] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]); // 서버로부터 받은 문제 데이터
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedKeywords, setSelectedKeywords] = useState([]); //선택된 키워드 배열 
  const [check, setCheck] = useState(0);

  const {cookie, user} = useAuth(); 

  const { course_name } = useParams();
  console.log("course_name:", course_name);

  
  const navigate = useNavigate();


  useEffect(() => {
    fetchQcheck();
}, [loading]);

const fetchQcheck = () => {
    fetch(`${process.env.REACT_APP_Server_IP}/problem_check/`, { //문제 유무 체크하는 함수 엔드포인트 작성
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${cookie.access_token}`
      },
      body: JSON.stringify({ 
        professor_name: user,
        course_name: course_name
      })
      
    })
    .then(response => response.json())
    .then(data => {
      setCheck(1);
    })
    .catch(error => {
      console.error('문제 유무 체크 오류:', error);
    });
  }


  const handleSolveQpage = () => {
    sendQuertions();
    alert(`${user} 교수님의 ${course_name} 강의 문제 생성 완료`);
    navigate("/proClassroom");
  };


  const sendQuertions = async () => {
    if (Object.keys(selections).some(key => selections[key] > 0 && selectedTypes.includes(key))) {
      try {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/problem_save/`, {
          method: 'POST',
          headers: {
              "Authorization": `Bearer ${cookie.access_token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            questions: questions,
            course_name: course_name,
            username: user
          })
      });

      const result = await response.json();

      if (response.ok) {
        console.log("문제 보내기 성공");
        console.log(user);
        console.log(course_name);
      } 
      else {
          alert(`신청 실패: ${result.message}`);
      }
    }catch (error) {
        console.error('문제 보내는 중 에러 :', error);
        setError(error.message);
      }
    }
    else{
      console.log("selections 데이터 없음.");
    }
  };



  // 선택된 옵션 변겅 시 로그 출력을 위한 useEffect 훅 사용
  useEffect(() => {
    console.log(selections);
  }, [selections]); // selections 상태가 변경될 때마다 실행됩니다.


  const toggleSelection = (key) => {
    setSelectedTypes(prev => 
      prev.includes(key) ? prev.filter(type => type !== key) : [...prev, key]
    );
    if (selections[key] === undefined) {
      setSelections(prev => ({
        ...prev,
        [key]: 0
      }));
    }
  };
  //특정 문제 유형에 대해 원하는 문제의 개수를 선택할 때 호출
  // 문제의 개수를 선택하면, 해당 문제 유형(key)과 선택된 개수(count)를
  //selections 객체에 저장하거나 업데이트
  const handleSelectionChange = (key, count) => {
    // if (selectedTypes.includes(key)) {
      setSelections(prev => ({
        ...prev,
        [key]: count
      }));
    // } else {
    //   alert("먼저 문제 유형을 선택해주세요.");
    // }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // 문제 데이터를 서버로부터 가져오는 함수
  const fetchQuestions = () => {
    if (Object.keys(selections).some(key => selections[key] > 0 && selectedTypes.includes(key))) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_Server_IP}/GenerateQuestion/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${cookie.access_token}`
        },
        body: JSON.stringify({ 
          selections: selections,
          selectedKeywords: selectedKeywords,
          course_name: course_name
        })
        
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setQuestions(data.questions);
      })
      .catch(error => {
        console.error('Fetching questions failed:', error);
        setError(error.message);
        setLoading(false);
      });
    }
  };


  const kkkk = () => {
    // 활성화된 문제 유형 가져오기
    const activeTypes = selectedTypes.filter(type => selections[type]);
  
    // 활성화된 문제 유형이 없다면 selections 객체 초기화
    if (activeTypes.length === 0) {
      setSelections({});
      return;
    }
  
    // 활성화된 문제 유형이 있을 때 selections 객체 업데이트
    const updatedSelections = { ...selections };
  
    // 활성화되지 않은 문제 유형에 대한 key 삭제
    Object.keys(selections).forEach(key => {
      if (!activeTypes.includes(key)) {
        delete updatedSelections[key];
      }
    });
  
    // 업데이트된 selections로 설정
    setSelections(updatedSelections);
  
    // 선택된 문제 유형과 개수 출력
    alert(Object.entries(updatedSelections).map(([key, value]) => `${key}: ${value}`).join('\n'));
  };

  const handleGenerateButtonClick = () => {
    kkkk();
    fetchQuestions();
  };

  const handleKeywordSelect = (e) => {
    const selectedKeyword = e.target.value; // 선택된 키워드 값
    // 이미 선택된 키워드인지 확인 후 선택 배열에 추가
    if (!selectedKeywords.includes(selectedKeyword)) {
      setSelectedKeywords([...selectedKeywords, selectedKeyword]);
    }
  };

  const handleRemoveKeyword = (indexToRemove) => {
    setSelectedKeywords((prevKeywords) => {
      // 선택된 키워드 배열에서 특정 인덱스의 키워드를 제외한 새 배열 반환
      return prevKeywords.filter((_, index) => index !== indexToRemove);
    });
  };


  let keyword_list = [];

  if (course_name == "파이썬프로그래밍"){
    keyword_list = [' ', '인터프리터실행하기', '인자전달', '대화형모드', '인터프리터와환경', '소스코드인코딩', '파이썬을계산기로사용하기', 
    '숫자', 'Text', '리스트', '프로그래밍으로의첫걸음', 'if문', 'for문', 'range()함수', '루프의break와continue문,그리고else절', 'pass문', 
    'matchStatements', '함수정의하기', '함수정의더보기', '기본인자값', '키워드인자', '특수매개변수', '임의의인자목록', '인자목록언패킹', '람다표현식', 
    '도큐멘테이션문자열', '함수어노테이션', '막간극:코딩스타일', '리스트더보기', '리스트를스택으로사용하기', '리스트를큐로사용하기', '리스트컴프리헨션',
     '중첩된리스트컴프리헨션', 'del문', '튜플과시퀀스', '집합', '딕셔너리', '루프테크닉', '조건더보기', '시퀀스와다른형들을비교하기', '모듈더보기',
      '모듈을스크립트로실행하기', '모듈검색경로', '“컴파일된”파이썬파일', '표준모듈들', 'dir()함수', '패키지', '패키지에서*임포트하기', 
      '패키지내부간의참조', '여러디렉터리에있는패키지', '장식적인출력포매팅', '포맷문자열리터럴', '문자열format()메서드', '수동문자열포매팅',
       '예전의문자열포매팅', '파일을읽고쓰기', '파일객체의매소드', 'json으로구조적인데이터를저장하기', '문법에러', '예외', '예외처리하기', 
       '예외일으키기', '예외연쇄', '사용자정의예외', '뒷정리동작정의하기', '미리정의된뒷정리동작들', 'RaisingandHandlingMultipleUnrelatedExceptions', 
       'EnrichingExceptionswithNotes', '이름과객체에관한한마디', '파이썬스코프와이름공간', '스코프와이름공간예', '클래스와의첫만남', '클래스정의문법', 
       '클래스객체', '인스턴스객체', '메서드객체', '클래스와인스턴스변수', '기타주의사항들', '상속', '다중상속', '비공개변수', '잡동사니', '이터레이터',
        '제너레이터', '제너레이터표현식', '운영체제인터페이스', '파일와일드카드', '명령행인자', '에러출력리디렉션과프로그램종료', '문자열패턴매칭', 
        '수학', '인터넷액세스', '날짜와시간', '데이터압축', '성능측정', '품질관리', '배터리가포함됩니다', '출력포매팅', '템플릿', 
        '바이너리데이터레코드배치작업', '다중스레딩', '로깅', '약한참조', '리스트작업도구', '진부동소수점산술', '소개', '가상환경만들기', 
        'pip로패키지관리하기', '탭완성및히스토리편집', '대화형인터프리터대안', '표현오류', '대화형모드', '에러처리', '실행가능한파이썬스크립트', 
        '대화형시작파일', '커스터마이제이션모듈'];
  }
  else if(course_name == "C++프로그래밍"){
    keyword_list = [' ', '토큰 및 문자 집합', '식별자', '숫자-부울 및 포인터 리터럴', '문자열 및 문자 리터럴', '사용자 정의 리터럴', 'C++ 형식 시스템', 
    'Lvalue 및 Rvalue', '표준 변환', '기본 제공 형식', '데이터 형식 범위', '선언 및 정의', 'const', 'constexpr', '이니셜라이저',
     '기본 제공 연산자, 우선 순위 및 결합성', '할당 연산자', '비트 연산자(&,^,|)', '캐스트 연산자()', '쉼표,조건,delete 연산자', 
     '관계형 연산자(==, !=,>,<,<=,>=)', '시프트 연산자(<<,>>)', '논리 연산자(&&,!,||)', '산술 연산자(+,-,*,/)', 'new 연산자', 
     '포인터 연산자(.*, ->*)', '증감 연산자(++,--)', '캐스팅', '선택문(if-else문)', '선택문(switch)', '반복문', '범위기반for문', 
     '네임스페이스', '열거형', 'union', '함수', '함수 오버로드', '연산자 오버로드', '클래스 및 구조체', '멤버 액세스 제어', '생성자', '소멸자', 
     '상속', '멤버에 대한 포인터', 'this 포인터', '람다식', '원시 포인터', 'const 및 volatile 포인터', '포인터 new 및 delete 연산자', '스마트 포인터',
      'unique_ptr', 'shared_ptr', 'weak_ptr', '예외처리'];
  }
  else if(course_name == "자바프로그래밍"){
    keyword_list = [' ', '자료형', '배열', '연산자', '조건문', '반복문', '제어문', '클래스 정의', '생성자', '객체 생성', '객체 사용', 
    '클래스 심화1', '클래스 심화2', '인터페이스', '상속', '오버라이딩', '상속', '포맷팅 기초1', '포맷팅 기초2',
    '문자열 숫자변환', '문자열 문자처리', '문자열 심화'];
  };


  const handleQuestionClick = (id) => {
    setSelectedQuestionId(id);
  };


  // 컴포넌트가 마운트 될 때 서버로부터 문제 데이터를 가져옴
  useEffect(() => {
    fetchQuestions(); // 컴포넌트가 마운트될 때 서버로부터 문제 데이터를 가져옵니다.
  }, []); // 의존성 배열이 비어 있으므로, 컴포넌트가 처음 마운트될 때만 fetchQuestions 함수가 실행됩니다

  const questionTypes = {
    '객관식': ['빈칸', '단답형', '문장형'],
    '단답형': ['빈칸', '문장형'],
    'OX선택형': ['O/X'],
    '서술형': ['코딩']
  };

  const typeDividers = ['객관식', '단답형']; // 구분선을 추가할 질문 유형

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
      <Sidebar>
        {Object.keys(questionTypes).map((type) => (
          <React.Fragment key={type}>
            <SidebarSection>
              <Label><p class="fontBold">{type}</p></Label>
              {questionTypes[type].length > 0 ? (
                questionTypes[type].map(subType => {
                  const subTypeKey = `${type}-${subType}`;
                  const isActive = selectedTypes.includes(subTypeKey);
                  return (
                    <ButtonContainer key={subType}>
                      <TypeButton
                        active={isActive}
                        onClick={() => {toggleSelection(subTypeKey);
                                        handleSelectionChange(subTypeKey, 1);
                        }}
                      >
                        <p class="fontMedium">{subType}</p>
                      </TypeButton>
                      <CountSelect
                        value={isActive ? (selections[subTypeKey] || 1) : ''}
                        onChange={(e) => handleSelectionChange(subTypeKey, parseInt(e.target.value))}
                        disabled={!isActive}
                      >
                        {[1, 2, 3, 4, 5].map(count => (
                          <option class="fontLight" key={count} value={count}>{count}개</option>
                        ))}
                      </CountSelect>
                    </ButtonContainer>
                  );
                })
              ) : (
                <ButtonContainer>
                  <Label style={{visibility: 'hidden'}}>O/X</Label>
                  <CountSelect
                    value={selections['OX선택형'] || 1}
                    onChange={(e) => handleSelectionChange('OX선택형', parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(count => (
                      <option class="fontLight" key={count} value={count}>{count}개</option>
                    ))}
                  </CountSelect>
                </ButtonContainer>
              )}
            </SidebarSection>
            {type !== '서술형' && <Divider />}
          </React.Fragment>
        ))}
        <GenerateButtonContainer>
          <GenerateButton onClick={handleGenerateButtonClick}><p class="fontMedium">문제 생성</p></GenerateButton>
        </GenerateButtonContainer>
      </Sidebar>



      <PageContainer>
      {loading ? (
        <>
          <InputContainer>
            <h1 class="fontMedium" style={{marginBottom:"25px", color:"black", fontWeight:"bold"}}><GiBookmarklet />&nbsp;<strong style={{color:"#20C075"}}>{course_name}</strong> &nbsp; 문제 생성 페이지&nbsp;<GiBookmarklet /></h1>
          </InputContainer>
          <img src={isodaloding} alt={"로딩 중"} style={{marginTop:"15px"}}/>
          <h2 style={{marginTop:"25px", color:"#20C075", fontWeight:"bold"}}>퀴즈가 생성 중입니다.</h2>
        </>
      ):(
        <>
          <InputContainer>
          <h1 class="fontMedium" style={{marginBottom:"25px", color:"black", fontWeight:"bold"}}><GiBookmarklet />&nbsp;<strong style={{color:"#20C075"}}>{course_name}</strong> &nbsp; 문제 생성 페이지&nbsp;<GiBookmarklet /></h1>
        </InputContainer>
        <InputContainer>
        <h2>Keyword 선택  - </h2>
          <KeywordSelect onChange={handleKeywordSelect}>
            {keyword_list.map((keyword, index) => (
              <option key={index} value={keyword}>
                {keyword}
              </option>
            ))}
          </KeywordSelect>
        </InputContainer>
          
        <InputContainer2>
          <KeywordCheck>
            {selectedKeywords.map((keyword, index) => (
              <span key={index} style={{background:"#20C075", marginRight:"15px", borderRadius:"15px", padding:"3px", color:"white", fontSize:"14px"}}>
                #{keyword} 
                <span
                  className="removeButton"
                  onClick={() => handleRemoveKeyword(index)} // 삭제 함수 호출
                  style={{color:"black", fontSize:"16px", fontWeight:"bold"}}
                >
                  x
                </span>
              </span>
            ))}
          </KeywordCheck>
        </InputContainer2>

        
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
        <QconfirmButton title="확정 및 퀴즈 시작" action={handleSolveQpage} disabled={check !== 1}/>
        </>
      )}
      </PageContainer>
    </>
  );
}

export default CreateQPage;