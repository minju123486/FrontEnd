import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// Components
import BlogBox from "../Elements/BlogBox";
import Fully2Button from "../Buttons/Fully2Button";
import TestimonialSlider from "../Elements/TestimonialSlider";
import community1 from '../../assets/img/community4.jpg';

import { useAuth } from "../Member/AuthContext";

export default function Blog() {

  const navigate = useNavigate(); // navigate 함수 사용

  const { cookie } = useAuth();

  const goToCommunity = () => {
    if (cookie.access_token) {
      navigate("/community");
    } else {
      navigate("/login");
    }
  };

  return (
    <WhiteBg>
    <Wrapper id="blog">
        <div className="container">
          <HeaderInfo>
            <h1 class="fontMedium" style={{color:"white", marginTop:"60px", fontSize:"45px"}}>위치 기반 <strong style={{color:"#B9F6C7"}}>'커뮤니티'</strong></h1>
            <p style={{color:"white", fontSize:"15px", fontWeight:"bold", marginTop:"10px"}}>
              자유게시판, 인기 게시물, 학년별 실시간 검색어, 위치기반 채팅방 등의 서비스를 이용할 수 있습니다.
              <br />
              선후배 간의 친목 활성화를 위한 위치 기반으로 한 커뮤니티 서비스 제공.
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="New Office!"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                tag="company"
                author="Luke Skywalker, 2 days ago"
                action={() => alert("clicked")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="New Office!"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                tag="company"
                author="Luke Skywalker, 2 days ago"
                action={() => alert("clicked")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="New Office!"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                tag="company"
                author="Luke Skywalker, 2 days ago"
                action={() => alert("clicked")}
              />
            </div>
          </div>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="New Office!"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                tag="company"
                author="Luke Skywalker, 2 days ago"
                action={() => alert("clicked")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="New Office!"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                tag="company"
                author="Luke Skywalker, 2 days ago"
                action={() => alert("clicked")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="New Office!"
                text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
                tag="company"
                author="Luke Skywalker, 2 days ago"
                action={() => alert("clicked")}
              />
            </div>
          </div>
          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <Fully2Button title="커뮤니티 바로가기 &gt;" action={goToCommunity} background={"white"} color={"black"}/> {/* 커뮤니티 바로가기 버튼 추가 */}
            </div>
          </div>
        </div>
    </Wrapper>
    </WhiteBg>
  );
}

const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const WhiteBg = styled.div`
  background-color: white;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.section`
  width: 100%;
  min-height: 840px;
  display: flex;
  background-image: url(${community1});
  background-size: cover;
  background-attachment: fixed;
  @media (max-width: 960px) {
    flex-direction: column;
  }

`;