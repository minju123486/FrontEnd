import styled from "styled-components";
import logo from '../../assets/img/Loginout/greenlogo.png';
import React, { useState, useEffect } from 'react';
import Join from "../Buttons/Join";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const StudentSingout = () => {

    const [id, setid] = useState('');
    const [password, setpassword] = useState('');
    const [passwordcheack, setpasswordcheack] = useState('');
    const [name, setname] = useState('');
    const [studentid, setstudentid] = useState('');
    const [grade, setgrade] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');



    const idUpdate = (event) => {
        setid(event.target.value); // 입력한 아이디로 상태 업데이트
      };
    const passwordUpdate = (event) => {
        setpassword(event.target.value); // 입력한 아이디로 상태 업데이트
    };
    const passwordcheackUpdate = (event) => {
        setpasswordcheack(event.target.value); // 입력한 아이디로 상태 업데이트
    };
    const nameUpdate = (event) => {
        setname(event.target.value); // 입력한 아이디로 상태 업데이트
    };
    const studentidUpdate = (event) => {
        setstudentid(event.target.value); // 입력한 아이디로 상태 업데이트
    };
    const gradeUpdate = (event) => {
      setgrade(event.target.value); // 입력한 아이디로 상태 업데이트
  };
    const emailUpdate = (event) => {
        setemail(event.target.value); // 입력한 아이디로 상태 업데이트
    };
    const phoneUpdate = (event) => {
        setphone(event.target.value); // 입력한 아이디로 상태 업데이트
    };




    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };
    const handleDayChange = (event) => {
        setDay(event.target.value);
    };



    const [gender, setGender] = useState('');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const [agreement1, setAgreement1] = useState(false);

    const agreementChange1 = () => {
        setAgreement1(!agreement1);
    };

    const [agreement2, setAgreement2] = useState(false);

    const agreementChange2 = () => {
        setAgreement2(!agreement2);
    };

    const [agreement3, setAgreement3] = useState(false);

    const agreementChange3 = () => {
        setAgreement3(!agreement3);
    };

    const navigate = useNavigate();

    const Singout = () => {
        navigate("/");
    };

    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const handlePasswordCheck = (event) => {
        const { value } = event.target;
        setpasswordcheack(value);
        setIsPasswordMatch(value === password);
    };

    const isAllAgreed = agreement1 && agreement2 && agreement3;

    // 입력 상태를 확인하는 상태 변수 추가
    const [isInputValid, setInputValid] = useState(false);

    // 각 입력 요소에 대한 입력 유효성 검사 함수 정의
    const validateInputs = () => {
        // 필수 입력 요소에 대한 상태를 확인하여 유효성 검사 수행
        const isValid = id !== '' && password !== '' && passwordcheack !== '' && name !== '' && studentid !== '' && grade !== '' && email !== '' && year !== '' && month !== '' && day !== '' && gender !== '' && isAllAgreed && isPasswordMatch;
        // 입력 상태를 변경
        setInputValid(isValid);
    };

    useEffect(() => {
        validateInputs();
    }, [id, password, passwordcheack, name, studentid, grade, email, phone, year, month, day, gender, agreement1, agreement2, agreement3]);
    
    const usertype = "student";

    // 회원가입을 위해 django로 넘겨줄 데이터들
    const registerUser = async (id, password, passwordcheack, name, studentid, grade, email, phone, year, month, day, gender, usertype) => {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/sign_up/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id, 
            password, 
            passwordcheack, 
            name, 
            studentid, 
            grade,
            email, 
            phone,
            year,
            month,
            day,
            gender,
            usertype
          })
        });
        if (response.status === 200) {  
          navigate("/login");
        } 
        else {
          console.error('가입 에러');
          alert("가입 실패");
        }
      };

      // 사용자 정보 서버로 전달할거임 가입하기 버튼 누르면 
      const handleJoin = () => {
        registerUser(id, password, passwordcheack, name, studentid, grade, email, phone, year, month, day, gender, usertype);
      };




      // 아이디 중복 확인
      const checkDuplicateId = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/id_check/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id
            })
        });
        // 중복 여부에 따라 메시지 표시
        if (response.status === 201) {
          setIdCheckResult("사용 가능한 아이디입니다.");
        } 
        else if (response.status === 409) {
          setIdCheckResult("이미 사용 중인 아이디입니다.");
        } 
        else {
            console.error('중복 확인 에러');
            setIdCheckResult("중복 확인에 실패했습니다.");
        }
      };
      
      // 사용자 id 서버로 전달할거임 중복확인 버튼 누르면
      const handlecheck = () => {
        checkDuplicateId(id);
      };
    
      const [idCheckResult, setIdCheckResult] = useState(''); //중복확인 텍스트임.


      const displayFormattedPhoneNumber = (numbers) => {
        if (numbers.length <= 3) {
          return numbers;
        } else if (numbers.length <= 7) {
          return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else {
          return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
            7
          )}`;
        }
      };

      const PHONE_NUMBER_LENGTH = 11;

      const handleChange = (e) => {
        const numbersOnly = e.target.value.replace(/\D/g, "");
        if (numbersOnly.length <= PHONE_NUMBER_LENGTH) {
          setphone(numbersOnly);
        }
      };

      //////////////////////////////////////////////////////
      function useTimer(initialSeconds) {
        const [timer, setTimer] = useState(initialSeconds);
        const [isActive, setIsActive] = useState(false);
       
        useEffect(() => {
          let interval;
          if (isActive) {
            interval = setInterval(() => {
              setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
            }, 1000);
          }
          return () => clearInterval(interval);
        }, [isActive]);
       
        const resetTimer = () => {
          setTimer(initialSeconds);
          setIsActive(true);
        };
       
        const stopTimer = () => {
          setIsActive(false);
        };
       
        return { timer, resetTimer, stopTimer };
      }

      const INITIAL_TIMER_SECONDS = 180;
      const { timer, resetTimer, stopTimer } = useTimer(INITIAL_TIMER_SECONDS);

      const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      };





    return (
        <Wrapper>
            <LoginBox>
                <Link to="/">
                  <img src={logo} alt="로고 이미지"  style={{marginLeft:"250px",marginTop:"20px",marginBottom:"15px", width:"100px", height:"40px"}}/>
                </Link>
                <h1 style={{ textAlign:"center", fontSize:"25px"}} className="font25 extraBold">회원가입 (학생)</h1>
                <Separator />

                <div style={{marginBottom:"2px"}}>
                    <strong style={{ fontSize:"15px", fontWeight:"bold", marginLeft:"25px"}} className="font15 extraBold">아이디</strong> 
                <InputBox3 
                    type="text" 
                    value={id} 
                    onChange={idUpdate} 
                    placeholder="아이디를 입력해주세요." 
                    isInvalid={idCheckResult !== "" && idCheckResult !== "사용 가능한 아이디입니다."}
                />
                <CheckButton onClick={handlecheck}>중복확인</CheckButton>
                </div>

                <div className="idcheck_result" style={{marginBottom:"7px", marginLeft:"165px"}}>
                  {idCheckResult && <span style={{color:"red", fontSize:"13px"}}>{idCheckResult}</span>}
                </div>

                <div style={{marginBottom:"7px"}}>
                    <strong style={{ fontSize:"15px", fontWeight:"bold", marginLeft:"25px"}} className="font15 extraBold">비밀번호</strong> 
                <InputBox4 
                    type="password" 
                    value={password} 
                    onChange={passwordUpdate} 
                    placeholder="비밀번호를 입력해주세요." 
                />
                </div>

                <div style={{marginBottom:"7px"}}>
                    <strong style={{ fontSize:"15px", fontWeight:"bold", marginLeft:"25px"}} className="font15 extraBold">비밀번호 확인</strong> 
                <InputBox6 
                    type="password" 
                    value={passwordcheack} 
                    onChange={handlePasswordCheck} 
                    style={{borderColor: isPasswordMatch ? '#000' : 'red'}}
                    placeholder="비밀번호를 한번 더 입력해주세요." 
                />
                </div>

                <div style={{marginBottom:"7px"}}>
                    <strong style={{ fontSize:"15px", fontWeight:"bold", marginLeft:"25px"}} className="font15 extraBold">이름</strong> 
                <InputBox2 
                    type="text" 
                    value={name} 
                    onChange={nameUpdate} 
                    placeholder="이름을 입력해주세요." 
                />
                </div>

                <div style={{marginBottom:"7px"}}>
                    <strong style={{ fontSize:"15px", fontWeight:"bold", marginLeft:"25px"}} className="font15 extraBold">학번</strong> 
                <InputBox2 
                    type="text" 
                    value={studentid} 
                    onChange={studentidUpdate} 
                    placeholder="학번을 입력해주세요." 
                />
                </div>

                <div style={{marginBottom:"7px"}}>
                    <strong style={{ fontSize:"15px", fontWeight:"bold", marginLeft:"25px"}} className="font15 extraBold">학년</strong> 
                <InputBox2 
                    type="text" 
                    value={grade} 
                    onChange={gradeUpdate} 
                    placeholder="학년을 입력해주세요." 
                />
                </div>

                <div style={{marginBottom:"7px"}}>
                    <strong style={{ fontSize:"15px", fontWeight:"bold", marginLeft:"25px"}} className="font15 extraBold">이메일</strong> 
                <InputBox3 
                    type="text" 
                    value={email} 
                    onChange={emailUpdate} 
                    placeholder="ex.) rlftkdgus0621@hallym.ac.kr" 
                />
                </div>

                <div style={{marginBottom:"7px"}}>
                    <strong style={{ fontSize:"15px", fontWeight:"bold", marginLeft:"25px"}} className="font15 extraBold">휴대폰</strong> 
                <InputBox3
                    type="text" 
                    value={displayFormattedPhoneNumber(phone)} 
                    onChange={handleChange} 
                    placeholder="숫자만 입력해주세요." 
                />
                </div>



                <div style={{marginTop:"7px"}}> 
                    <GenderContainer>
                    <GenderLabel>성별</GenderLabel>
                        <div>
                            <GenderCheckbox
                                type="radio"
                                id="male"
                                value="male"
                                checked={gender === "male"}
                                onChange={handleGenderChange}
                            />
                            <GenderCheckboxLabel htmlFor="male">남자</GenderCheckboxLabel>
                        </div>
                        <div>
                            <GenderCheckbox
                                type="radio"
                                id="female"
                                value="female"
                                checked={gender === "female"}
                                onChange={handleGenderChange}
                            />
                            <GenderCheckboxLabel htmlFor="female">여자</GenderCheckboxLabel>
                        </div>
                    </GenderContainer>
                </div>

                <BirthDateContainer>
                    <BirthDateLabel>생년월일</BirthDateLabel>
                    <BirthDateInput
                        type="text"
                        placeholder="YYYY"
                        value={year}
                        onChange={handleYearChange}
                    />
                    <Separatorr>/</Separatorr>
                    <BirthDateInput
                        type="text"
                        placeholder="MM"
                        value={month}
                        onChange={handleMonthChange}
                    />
                    <Separatorr>/</Separatorr>
                    <BirthDateInput
                        type="text"
                        placeholder="DD"
                        value={day}
                        onChange={handleDayChange}
                    />
                </BirthDateContainer>
                <Separator />
                <div style={{marginBottom:"7px"}}>
                    <strong style={{ fontSize:"15px", fontWeight:"bold", marginLeft:"29px"}} className="font15 extraBold">이용약관 동의</strong> 
                    <Checkbox2 type="checkbox" checked={agreement1} onChange={() => agreementChange1(!agreement1)}/> <strong style={{fontSize:"20px"}}>개인정보 수집 동의</strong>
                    <div><Checkbox type="checkbox" checked={agreement2} onChange={() => agreementChange2(!agreement2)}/> <strong style={{fontSize:"20px"}}>개인정보 이용 동의</strong></div>
                    <div><Checkbox type="checkbox" checked={agreement3} onChange={() => agreementChange3(!agreement3)}/> <strong style={{fontSize:"20px"}}>GPS 사용 동의</strong></div>
                </div>
                <Join title="가입하기" action={handleJoin} margin_left={true} margin_top={true} disabled={idCheckResult !== "사용 가능한 아이디입니다." || !isInputValid}/>
            </LoginBox>
        </Wrapper>
    );
  };
   
  export default StudentSingout;



  const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 1300px;
  display: flex;
  @media (max-width: 960px) {
    flex-direction: column;
  }
  background:#EFF8F3;
`;

const Timer = styled.div`
		position: absolute;
		right: 120px;
		top: 50%;
		transform: translate(0, -50%);
		color: #1273e4;
		font-weight: bold;
	`;

const LoginBox = styled.div`
margin-top: 330px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width:600px;
height:1140px;
background: #FFFFFF;
bottom: 0;
border-radius: 3px;
`;

const Separator = styled.div`
  width: 550px;
  height: 1px;
  background-color: #000;
  margin-top: 40px; /* 구분선 위 간격 조정 */
  margin-bottom: 20px; /* 구분선 아래 간격 조정 */
  margin-left:25px;
`;

const InputBox2 = styled.input`
margin-top:10px;
margin-left:105px;
width:280px;
height:40px;
border: 1px solid #000000;
padding-left: 10px;
border-radius: 3px;
margin-right:10px;
`;

const InputBox3 = styled.input`
margin-top:10px;
margin-left:90px;
width:280px;
height:40px;
border: 1px solid ${props => props.isInvalid ? 'red' : '#000000'};
// border: 1px solid #000000;
padding-left: 10px;
border-radius: 3px;
margin-right:10px;
`;

const InputBox4 = styled.input`
margin-top:10px;
margin-left:76px;
width:280px;
height:40px;
border: 1px solid #000000;
padding-left: 10px;
border-radius: 3px;
margin-right:10px;
`;

const InputBox6 = styled.input`
margin-top:10px;
margin-left:42px;
width:280px;
height:40px;
border: 1px solid #000000;
padding-left: 10px;
border-radius: 3px;
margin-right:10px;
`;

const CheckButton = styled.button`
  background-color: #fff;
  color: #20C075;
  fontWeight:"bold";
  border: 3px solid #20C075;
  border-radius: 3px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    border-width:4px;
  }
`;

const GenderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 25px;
`;

const GenderLabel = styled.label`
  margin-right: 30px;
  font-size: 15px;
  font-weight: bold;
`;

const GenderCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const GenderCheckbox = styled.input`
  margin-right: 5px;
  margin-left: 10px;
  width: 17px;
  height: 17px;
  appearance: none;
  border: 2px solid #20C075;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin-left:80px;


  &:checked {
    background-color: #20C075;
  }
`;

const GenderCheckboxLabel = styled.span`
  font-size: 15px;
`;

const BirthDateContainer = styled.div`
  margin-top: 20px;
  margin-left: 25px;
  display: flex;
  align-items: center;
`;

const BirthDateLabel = styled.label`
  font-size: 15px;
  font-weight: bold;
  margin-right: 76px;
`;

const BirthDateInput = styled.input`
  width: 60px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 5px;
  text-align: center;
  margin-right: 5px;
  
`;

const Separatorr = styled.span`
  font-size: 15px;
  margin-right: 5px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
  margin-left: 10px;
  width: 20px;
  height: 20px;
  appearance: none;
  border: 2px solid #20C075;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin-left:140px;


  &:checked {
    background-color: #20C075;
  }
`;

const Checkbox2 = styled.input`
  margin-right: 5px;
  width: 20px;
  height: 20px;
  appearance: none;
  border: 2px solid #20C075;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin-left:20.5px;

  &:checked {
    background-color: #20C075;
  }
`;