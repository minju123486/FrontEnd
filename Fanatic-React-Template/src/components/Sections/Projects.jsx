import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Member/AuthContext";
// Components
import ProjectBox from "../Elements/ProjectBox";
import FullButton from "../Buttons/FullButton";
import FullyButton from "../Buttons/FullyButton";
// Assets
import ProjectImg1 from "../../assets/img/projects/1.png";
import ProjectImg2 from "../../assets/img/projects/2.png";
import ProjectImg3 from "../../assets/img/projects/3.png";
import ProjectImg4 from "../../assets/img/projects/4.png";
import ProjectImg5 from "../../assets/img/projects/5.png";
import ProjectImg6 from "../../assets/img/projects/6.png";
import AddImage2 from "../../assets/img/add/add2.png";

import gil1 from "../../assets/img/diaryimg/gill1.png";
import gil2 from "../../assets/img/diaryimg/gill2.png";
import gil3 from "../../assets/img/diaryimg/gill3.png";
import gil4 from "../../assets/img/diaryimg/gill4.png";
import gil5 from "../../assets/img/diaryimg/gill5.png";
import gil6 from "../../assets/img/diaryimg/gill6.png";


export default function Projects() {
  const [slideIndex] = useState(0);
  const navigate = useNavigate();
  const { cookie } = useAuth();

  const [dateList, setDateList] = useState([]);
  const [id, setID] = useState([]);
  const [content, setContent] = useState([]);
  const gil = [gil1,gil2,gil3,gil4,gil5,gil6];

  const handleCreateDiary = () => {
    if (cookie.access_token) {
      navigate("/diary");
    } else {
      navigate("/login");
    }
  };
  const handlegoStudyDiary = () => {
    if (cookie.access_token) {
      navigate("/studyDiary");
    } else {
      navigate("/login");
    }
  };
  const handlegoClassDiary = () => {
    if (cookie.access_token) {
      navigate("/classDiary");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchDiarylist();
}, []);

  const fetchDiarylist = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_Server_IP}/mock_diary/`, {
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
            setContent(result.content || []);
        } 
        else {
            console.error(`불러오기 실패 : ${result.message}`);
        }
    } catch (error) {
        console.error('Error fetching date list:', error);
    }
};

  return (
    <Wrapper id="projects">
      <div className="lightBg" style={{padding:"30px 0"}}>
        <div className="container">
          <HeaderInfo>

            <h1 class="fontMedium" style={{fontSize:"45px", marginTop:"10px"}}>생성형 AI를 통한 <strong style={{color:"green"}}>'학습 일기'</strong></h1>
            <p className="font13" style={{fontSize:"15px", fontWeight:"bold", marginTop:"7px"}}>
              학생들의 자가 학습에 도움을 주기 위한 서비스 입니다.
              <br />
              생성형 AI를 사용해 학습 일기를 자동으로 생성하고 관리할 수 있습니다.
            </p>
          </HeaderInfo>

          <ProjectsContainer slideIndex={slideIndex}>
          {dateList.map((date, index) => (
              <ProjectBox img={gil[index]} title={`일자 : ${date}`}
              text={content[index]}
              action={() => alert("clicked")} />
          ))}
            
          </ProjectsContainer>

          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" , marginRight: "15px" }}>
              <FullyButton title="학습 일기 생성 &gt;" action={handleCreateDiary} />
            </div>
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullyButton title="학습 일기장 &gt;" action={handlegoStudyDiary} border/>
            </div>
          </div>
        </div>
      </div>
      <div className="lightBg">
        <div className="container">
          <Advertising className="flexSpaceCenter">
            <AddRight>
  
              <h2 class="fontMedium" style={{fontSize:"45px"}}>생성형 AI를 통한 <strong style={{color:"green"}}>'수업 일기'</strong></h2>
              <p style={{fontSize:"15px", fontWeight:"bold", marginTop:"7px"}}>
                수업에서 다루었던 내용을 작성하면 자동으로 피드백이 들어간 수업 일기를 생성합니다.
              </p>
              <ButtonsRow className="flexNullCenter" style={{ margin: "30px 0" }}>
                <div style={{ width: "190px" }}>
                  <FullyButton title="수업 일기 생성 &gt;" action={() => alert("수업 일기 생성")} />
                </div>
                <div style={{ width: "190px", marginLeft: "15px" }}>
                  <FullyButton title="수업 일기장 &gt;" action={handlegoClassDiary} border />
                </div>
              </ButtonsRow>
            </AddRight>
          </Advertising>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const ProjectsContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${props => `translateX(-${props.slideIndex * 376}px)`}; // 376px은 각 ProjectBox의 너비입니다.
`;


const Advertising = styled.div`
  padding: 15px 0;
  margin: 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0px 0;
  }
`;
const ButtonsRow = styled.div`
  @media (max-width: 860px) {
    justify-content: space-between;
  }
`;
const AddLeft = styled.div`
  position: relative;
  width: 50%;
  p {
    max-width: 475px;
  }
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
    h2 {
      line-height: 3rem;
      margin: 15px 0;
    }
    p {
      margin: 0 auto;
    }
  }
`;
const AddRight = styled.div`
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
  }
`;
const AddLeftInner = styled.div`
  width: 100%;
  position:absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    order: 1;
    position: relative;
    top: -60px;
    left: 0;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 400px) {
    padding: 0;
  }
`;
