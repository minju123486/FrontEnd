import React from "react";
import styled from "styled-components";
// Assets
import ContactImg1 from "../../assets/img/contact-1.png";
import ContactImg2 from "../../assets/img/contact-2.png";
import ContactImg3 from "../../assets/img/contact-3.png";
import consulting3 from "../../assets/img/consulting3.jpg";
export default function Contact() {
  return (
    <WhiteBg id="contact">
      <Wrapper>
          <div className="container">
            <HeaderInfo>
              <h1 class="fontMedium" style={{fontSize:"40px", marginBottom:"18px"}}>1 : 1 상담</h1>
              <p className="font13" style={{fontWeight:"bold"}}>
                사용하면서 불편하거나 개선 사항을 말씀해 주시면 좋은 서비스를 개발하는데 더욱 도움이 됩니다.<br />
                문의는 메일을 통해 제출해 주시면 감사하겠습니다.
                <br /><br />
                <h3 class="fontMedium" style={{marginBottom:"4px"}}>고객센터</h3> 
                대표번호 : 1234 - 5678<br />
                이메일 : iSodaCS@hallym.ac.kr<br />
                운영시간 : 10:00 ~ 17:30 (주말 및 공휴일 휴무)<br />
                점심시간 : 12:00 ~ 13:00
              </p>
            </HeaderInfo>
            {/* <div className="row" style={{ paddingBottom: "30px" }}>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <Form>
                  <label className="font13">First name:</label>
                  <input type="text" id="fname" name="fname" className="font20 extraBold" />
                  <label className="font13">Email:</label>
                  <input type="text" id="email" name="email" className="font20 extraBold" />
                  <label className="font13">Subject:</label>
                  <input type="text" id="subject" name="subject" className="font20 extraBold" />
                  <textarea rows="4" cols="50" type="text" id="message" name="message" className="font20 extraBold" />
                </Form>
                <SumbitWrapper className="flex">
                  <ButtonInput type="submit" value="Send Message" className="pointer animate radius8" style={{ maxWidth: "220px" }} />
                </SumbitWrapper>

              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex">
                <div style={{ width: "50%" }} className="flexNullCenter flexColumn">
                  <ContactImgBox>
                    <img src={ContactImg1} alt="office" className="radius6" />
                  </ContactImgBox>
                  <ContactImgBox>
                    <img src={ContactImg2} alt="office" className="radius6" />
                  </ContactImgBox>
                </div>
                <div style={{ width: "50%" }}>
                  <div style={{ marginTop: "100px" }}>
                    <img src={ContactImg3} alt="office" className="radius6" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
      </Wrapper>
    </WhiteBg>
  );
}


const WhiteBg = styled.div`
  background-color: white;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.section`
  width: 100%;
  min-height: 370px; //840px
  display: flex;
  // background-image: url(${consulting3});
  background-size: cover;
  background-attachment: fixed;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Form = styled.form`
  padding: 70px 0 30px 0;
  input,
  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;
const ButtonInput = styled.input`
  border: 1px solid #7620ff;
  background-color: #7620ff;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  :hover {
    background-color: #580cd2;
    border: 1px solid #7620ff;
    color: #fff;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;
const ContactImgBox = styled.div`
  max-width: 180px; 
  align-self: flex-end; 
  margin: 10px 30px 10px 0;
`;
const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;









