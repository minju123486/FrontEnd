import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// Assets
import LogoImg from "../../assets/svg/Logo";

export default function Contact() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <Wrapper>
      <div className="darkBg">
        <div className="container">
          <InnerWrapper className="flexSpaceCenter" style={{ padding: "30px 0" }}>
            <Link className="flexCenter animate pointer" to="home" smooth={true} offset={-80}>
              
              <h1 class="fontBold" style={{ marginLeft: "15px",color:"white" }}>
                iSoda
              </h1>
            </Link>
            
            <StyleP className="whiteColor font13"> 
              © {getCurrentYear()} - <span className="purpleColor font13">iSoda</span> All Right Reserved
              <h6 style={{color:"white"}}> 
                (주)iSoda  |   제작자 : 이민주 길상현 안승빈 김규민 | 주소 : 한림대학교 <br/>
                TEL : 010-1234-5678  |  FAX : kkkk  |   E-MAIL : kkkk@hallym.ac.kr <br/>
              </h6>
            </StyleP>

            <Link className="whiteColor animate pointer font13" to="home" smooth={true} offset={-80}>
              Back to top
            </Link>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;