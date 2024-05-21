import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Member/AuthContext";
import backbb from '../../assets/img/study2.jpg';
import isodaloding from '../../assets/img/loding/isodaloding.png';


//useState로 컴포넌트 상태 관리
const StudyDiary = () => {
    const navigate = useNavigate();

    const { user, isLoggedIn, cookie} = useAuth();
    

    const [dateList, setDateList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [datesPerPage] = useState(3);
    const [id,setID] = useState([]);

    useEffect(() => {
        fetchDateList();
    }, []);

    const fetchDateList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_Server_IP}/daily_view/`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${cookie.access_token}`, 
                    'Content-Type': 'application/json'
                }
                // body: JSON.stringify({ 

                // })
            });
            const result = await response.json();
          
            if (response.ok) {
                setDateList(result.title || []);
                setID(result.id || []);
            } 
            else {
                console.error(`불러오기 실패 : ${result.message}`);
            }
        } catch (error) {
            console.error('Error fetching date list:', error);
        }
    };

    const indexOfLastDate = currentPage * datesPerPage;
    const indexOfFirstDate = indexOfLastDate - datesPerPage;
    const currentDates = dateList.slice(indexOfFirstDate, indexOfLastDate);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

return (
  <ClassroomWrapper>
    <CoursesBox>
    <h2 style={{color:"#20C075", fontWeight:"bold"}}><strong class="fontMedium"><strong style={{color:"black"}}>{user} 님의</strong> '학습 일기장'</strong></h2>
    <Underline/>

      <DateList>
        {currentDates.map((date, index) => (
            <DateItem key={index}>
                <CourseInfo>
                    <DateTitle>일기 일자 : {date}</DateTitle>
                </CourseInfo>
                <Button >일기 보기</Button> 
                {/* onClick={() => studydiarylook(date, id[index])} */}
            </DateItem>
        ))}
      </DateList>

      <Pagination>
          {Array.from({ length: Math.ceil(dateList.length / datesPerPage) }, (_, index) => index + 1).map(pageNumber => (
              <PageNumber key={pageNumber} onClick={() => paginate(pageNumber)}>{pageNumber}</PageNumber>
          ))}
      </Pagination>
    </CoursesBox>
  </ClassroomWrapper>
);

};

export default StudyDiary;

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
  width: 38%;
  min-height: 65%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding: 20px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  overflow: hidden;
  margin-top:50px;
`;

const DateList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateItem = styled.div`
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

const DateTitle = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
`;

const Button = styled.button`
  background: ${props => props.disabled ? '#ccc' : '#4CAF50'};
  color: ${props => props.disabled ? '#666' : 'white'};
  border: none;
  border-radius:20px;
  padding: 10px 20px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#367c39'};
  }
`;

const ProfessorName = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 160px;
  flex: 1;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;

const PageNumber = styled.div`
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;

  &:hover {
    background-color: #367c39;
  }
`;

const Underline = styled.div`
  width: 300px;
  height: 2px;
  background-color: #20C075;
  margin-top: 12px;
`;