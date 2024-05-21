import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Member/AuthContext";
import { MdReportProblem } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useParams } from 'react-router-dom';

const Feedback = () => {
    const navigate = useNavigate();
    const { cookie } = useAuth();
    const { course_imformation } = useParams();

    const parts = course_imformation.split("$$");
    const course_name = parts[0];
    const course_professor = parts[1];
    

    const [dateList, setDateList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [datesPerPage] = useState(3);
    const [id,setID] = useState([]);

    useEffect(() => {
        fetchDateList();
    }, []);

    const fetchDateList = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_Server_IP}/feedback_view/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${cookie.access_token}`, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    course_name: course_name,
                    course_professor: course_professor 
                })
            });
            const result = await response.json();
          
            if (response.ok) {
                setDateList(result.date || []);
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

    const feedbacklook = (date, thisid) =>{
      navigate(`/feedbacklook/${decodeURIComponent(course_imformation)}`, { state: { date: `${date}`, id: `${thisid}`} });
  };



    

    return(
        <Wrapper>
            <Content>
                <Title>
                    <h2 class="fontMedium" style={{color:"black", fontWeight:"bold"}}><strong style={{color:"#20C075"}}>{course_name}</strong> 피드백</h2>
                    <Underline />
                </Title>

                <DateList>
                    {currentDates.map((date, index) => (
                        <DateItem key={index}>
                            <CourseInfo>
                                <DateTitle>피드백 일자 : {date}</DateTitle>
                                <ProfessorName>교수명 : {course_professor}</ProfessorName>
                            </CourseInfo>
                            <Button onClick={() => feedbacklook(date, id[index])}>피드백 보기</Button>
                        </DateItem>
                    ))}
                </DateList>

                <Pagination>
                    {Array.from({ length: Math.ceil(dateList.length / datesPerPage) }, (_, index) => index + 1).map(pageNumber => (
                        <PageNumber key={pageNumber} onClick={() => paginate(pageNumber)}>{pageNumber}</PageNumber>
                    ))}
                </Pagination>

            </Content>
        </Wrapper>
    );
}

export default Feedback;

const Wrapper = styled.div`
  margin-top:30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #EFF8F3;
`;

const Content = styled.div`
  width: 38%;
  min-height: 73%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;