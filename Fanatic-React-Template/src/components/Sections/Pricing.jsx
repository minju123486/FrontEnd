import React from "react";
import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
// Components
import PricingTable from "../Elements/PricingTable";

export default function Pricing() {
  return (
    <Wrapper id="pricing">
      <div className="lightBg" style={{padding:"30px 0"}}>
        <div className="container">
          <HeaderInfo>
            <h1 class="fontMedium" style={{fontSize:"45px", marginBottom:"8px"}}><strong style={{color:"green"}}>'iSoda'</strong> 서비스 소개</h1>
            <p className="font13" style={{fontWeight:"bold", fontSize:"15px"}}>
              iSoda 서비스에서는 생성형 AI를 사용해 보다 원활한 학습을 도와주는 서비스를 제공합니다. 
              <br />
              iSoda의 홈페이지에서 이용할 수 있는 서비스들을 소개합니다.
            </p>
          </HeaderInfo>
          <TablesWrapper className="flexSpaceNull">
            <TableBox>
              <PricingTable
                icon="monitor"
                price="AI 학습실 서비스"
                title="Explanation"
                text="교수와 학생 간의 원활한 수업 진행을 위해 문제 생성 서비스와 퀴즈 결과에 대한 피드백과 통계를 제공해주는 서비스입니다."
                offers={[
                  { name: "교수 - AI 활용 문제생성 진행", cheked: true },
                  { name: "학생 - 퀴즈 테스트 진행", cheked: true },
                  { name: "교수 - 통계와 피드백 제공", cheked: true },
                  { name: "원활한 수업 진행 가능", cheked: true },
                  { name: "일자별 피드백 관리 가능", cheked: true },
                ]}
                to_link="home"
              />
            </TableBox>

            <TableBox>
              <PricingTable
                icon="printer"
                price="AI 일기 생성/관리"
                title="Explanation"
                text="학생들의 공부 습관을 기르기 위해 공부 / 수업 일기를 생성형 AI를 통해 자동 생성해 업로드 하여 관리할 수 있는 서비스입니다."
                offers={[
                  { name: "공부 일기 자동 생성", cheked: true },
                  { name: "공부 일기장에서 관리", cheked: true },
                  { name: "수업 일기 자동 생성", cheked: true },
                  { name: "수업 일기장에서 관리", cheked: true },
                  { name: "공부 습관 증진 효과", cheked: true },
                ]}
                to_link="projects"
              />
              
            </TableBox>
            <TableBox>
              <PricingTable
                icon="browser"
                price="GPS기반 커뮤니티"
                title="Explanation"
                text="사용자들 간의 친목과 피드백을 공유하기 위해 자유 게시판, GPS 기반 채팅방, 학년별 실시간 검색순위를 이용할 수 있습니다."
                offers={[
                  { name: "자유 게시판", cheked: true },
                  { name: "인기 검색어", cheked: true },
                  { name: "학년별 실시간 검색순위", cheked: true },
                  { name: "GPS 기반 실시간 채팅방", cheked: true },
                  { name: "사용자들 간의 친목 활성화", cheked: true },
                ]}
                to_link="blog"
              />
            </TableBox>
          </TablesWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  margin-bottom: 50px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const TablesWrapper = styled.div`
  @media (max-width: 860px) {
    flex-direction: column;
  }
`;
const TableBox = styled.div`
  width: 31%;
  @media (max-width: 860px) {
    width: 100%;
    max-width: 370px;
    margin: 0 auto
  }
`;




