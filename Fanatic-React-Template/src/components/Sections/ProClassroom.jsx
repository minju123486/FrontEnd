import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Member/AuthContext";
import backbb from '../../assets/img/study2.jpg';
import isodaloding from '../../assets/img/loding/secsoda.png';

//useState로 컴포넌트 상태 관리
const ProClassroom = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('myCourses'); // 뷰 상태 추가
    const [myCourses, setMyCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loding, setLoding] = useState(false);

    const { user, isLoggedIn, cookie, user_name} = useAuth();
    

    const handleFeedback = (course_name, user_name) =>{
      console.log(course_name + "|" + user_name);
      const course_imformation = course_name + "$$" + user_name;
      navigate(`/feedback/${decodeURIComponent(course_imformation)}`);
    }
    useEffect(() => {
        checkPosition();
        fetchCourses();
        fetchMyCourses();
    }, []);

    useEffect(() => {
      if (view === 'myCourses') {
          fetchMyCourses();  
      }
  }, [view]);

    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 250);

      return () => clearTimeout(timer);
    }, []);


    const checkPosition = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_Server_IP}/position_check/`, { //백엔드 엔드포인트 수정해야함
            method: "GET",
            headers: {
              "Authorization": `Bearer ${cookie.access_token}`
            }
          });
            if (response.ok) {
                const status = response.status;
                if (status === 200) {
                    navigate("/Classroom");
                } else if (status === 201) {
                  navigate("/ProClassroom");
                } else {
                    console.error('Unexpected status code:', status);
                }
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error checking position:', error);
            navigate("/login"); // Assuming there's a login route to handle errors
        }
    };
    //모든 강의 백엔드로 가져오는 함수
    const fetchCourses = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_Server_IP}/course_view/`, {
                headers: {
                    "Authorization": `Bearer ${cookie.access_token}`
                }
            });
            const data = await response.json();
            setMyCourses(data.lecture);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        }
    };
    //백엔드로부터 내 강의 목록 가져오는 함수
    const fetchMyCourses = async () => {
      try {
          const response = await fetch(`${process.env.REACT_APP_Server_IP}/lecture_show/`, {
              headers: {
                  "Authorization": `Bearer ${cookie.access_token}`
              }
          });
          const data = await response.json();
          if (response.ok) {
              setMyCourses(data.lecture);
          } else {
              console.error('Failed to fetch my courses');
          }
      } catch (error) {
          console.error('Failed to fetch my courses:', error);
      }
  };

  const handleCreateClassroom = async (courseName) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/lecture_generate/`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${cookie.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject: courseName })
        });
        const result = await response.json();

        if (response.ok) {
            await fetchMyCourses(); // 강의 생성 후에 내 강의 목록을 다시 불러옵니다.
            setShowModal(true);
            setView('myCourses'); // 이 부분은 뷰를 변경하는 것이므로 뷰 상태를 변경할 필요가 없습니다.
        } else {
            alert(`강의 생성 실패: ${result.message}`);
        }
    } catch (error) {
        alert("네트워크 에러가 발생했습니다. 다시 시도해주세요.");
        console.error("강의 생성 중 에러 발생:", error);
    }
};


  const handleCreateQuestion = (course_name) => {
      console.log("course_name:", course_name);
      const decodedCourseName = decodeURIComponent(course_name);
      console.log("decodedCourseName:", decodedCourseName);
      navigate(`/create_question/${decodeURIComponent(course_name)}`);
  };
  
  const handleQuizEnd = (count, student_count, course_name) => {
    const confirmEnd = window.confirm(`퀴즈를 마감하시겠습니까?\n\n 퀴즈 현황 : (${student_count}명 / ${count}명)`);
    if (confirmEnd) {
        alert("퀴즈가 마감되었습니다.");
        setLoding(true);
        fetchFeedbackcheck(course_name);
    } else {
    }
  };

  const fetchFeedbackcheck = (course_name) => {
    fetch(`${process.env.REACT_APP_Server_IP}/feedback_save/`, { //피드백 생성하는 함수 엔드포인트handleFeedback 
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${cookie.access_token}`
      },
      body: JSON.stringify({ 
        professor_name: user_name,
        course_name: course_name
      })
      
    })
    .then(response => {
      if (response.ok) {
        setLoding(false);
        fetchMyCourses();
        alert("피드백이 생성 되었습니다.");
        return response.json();
      } else {
        throw new Error('네트워크 응답이 실패했습니다.');
      }
    })
    .catch(error => {
      console.error('문제 유무 체크 오류:', error);
    });
  }

  const Modal = ({ closeModal }) => {
      return (
          <ModalWrapper>
              <ModalContent>
                  <p style={{marginBottom:"15px"}}>강의실 생성에 성공했습니다!</p>
                  <Button onClick={closeModal}>확인</Button>
              </ModalContent>
          </ModalWrapper>
      );
  };

  const closeModal = async () => {
      setShowModal(false);
      setView('myCourses');
  };


  const hhh = () => {
    console.log(user);
};

return (
  <ClassroomWrapper>
    {loding ? (
        <>
          <div style={{ textAlign: "center" }}>
            <img src={isodaloding} alt={"로딩 중"} style={{marginTop:"15px"}}/>
            <h2 style={{marginTop:"25px", color:"#20C075", fontWeight:"bold"}}>피드백이 생성 중입니다...</h2>
          </div>
        </>
      ):(
        <>
        {showModal && <Modal closeModal={closeModal} />}
        {showContent && (
            <CoursesBox>
                <Nav>
                    <NavLink 
                        onClick={() => setView('myCourses')}
                        active={view === 'myCourses'}
                    >
                        <strong>내 강의</strong>
                    </NavLink>
                    <NavLink 
                        onClick={() => { setView('createClassroom'); fetchCourses(); }}
                        active={view === 'createClassroom'}
                    >
                        <strong>강의실 생성</strong>
                    </NavLink>
                </Nav>
                {(view === 'createClassroom' || view === 'myCourses') && Array.isArray(myCourses) && myCourses.map(course => (
                    <CourseCard key={course.key}>
                        <CourseInfo>
                            <CourseTitle>{course.name}</CourseTitle>
                            {view === 'myCourses' ? (
                            <ProfessorName>교수명 : {user}</ProfessorName>
                            ):(<></>)}
                        </CourseInfo>
                        <div>
                            {view === 'myCourses' ? (
                                <Button onClick={() => view === 'myCourses' ? handleFeedback(course.name, user_name) : hhh}>
                                    피드백
                                </Button>
                            ) : (<></>)}
                        
                        <Button onClick={() => {
                            if (view === 'myCourses') {
                                if (course.check === 1) {
                                  handleQuizEnd(course.count, course.student_count, course.name);
                                } 
                                else {
                                  handleCreateQuestion(course.name);
                                }
                            } 
                            else {
                              handleCreateClassroom(course.name);
                            }
                        }}
                        active={view === 'myCourses' && course.check === 1}>
                            {view === 'myCourses' ? (course.check === 1 ? '퀴즈 마감' : '문제 생성') : '생성하기'}
                        </Button>
                        </div>
                    </CourseCard>
                ))}
            </CoursesBox>
        )}
      </>
    )}
  </ClassroomWrapper>
);
 
};
export default ProClassroom;

const ClassroomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${backbb});
    background-size: cover;
    background-attachment: fixed;
    opacity: 0.2;
    z-index: -1;
  }
`;

const CoursesBox = styled.div`
  width: 40%;
  min-height: 60%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 20px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: flex-start;
  overflow: hidden;
`;

const Nav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  color: #333;
  cursor: pointer;
  border-bottom: ${props => props.active ? '3px solid #4CAF50' : 'none'};

  &:hover {
    color: #4CAF50;
  }

  &:focus {
    outline: none;
  }
`;

const CourseCard = styled.div`
  width: 100%;
  background-color: #EFF8F3;
  padding: 15px;
  margin-top: 15px;
  border: 2px solid #4CAF50;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CourseTitle = styled.h2`
  margin-bottom: 10px;
  color: #333;
`;

const ProfessorName = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const Button = styled.button`
  background: #4CAF50;
  color: white;
  border: 1px solid transparent;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.3s;

  margin-left: 10px;
  border-radius: 20px;
  border-color: #ccc;
  


  &:hover {
    background: #367c39;
    border-color: #208013;
  }

  ${({ active }) =>
    active &&
    `
    background-color: #7684F6;
    border-color: #ccc;

    &:hover {
      background: #0717F8;
      border-color: #3F54F0;
    }
  `}
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* 모달을 화면의 가장 앞으로 가져옵니다 */
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  z-index: 1001; /* 모달 내용이 모달 배경보다 위에 오도록 합니다 */
`;
