import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from 'react-router-dom';

// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";

import logoo from '../../assets/img/Loginout/isodagreen_nonback.png';
import { useAuth } from '../Member/AuthContext';
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Buttons/LogoutButton";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false); // 회원가입 모달 상태
  const [loginButtonPosition, setLoginButtonPosition] = useState({});
  const [signupButtonPosition, setSignupButtonPosition] = useState({}); // 회원가입 버튼 위치 상태
  const loginButtonRef = useRef();
  const signupButtonRef = useRef(); // 회원가입 버튼에 대한 ref

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLoginModal = (e) => {
    e.preventDefault();
    const rect = loginButtonRef.current.getBoundingClientRect();
    setLoginButtonPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    setLoginModalOpen(true);
  };

  const openSignupModal = (e) => {
    e.preventDefault();
    const rect = signupButtonRef.current.getBoundingClientRect(); // 회원가입 버튼 위치 계산
    setSignupButtonPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    setSignupModalOpen(true); // 회원가입 모달을 열기
  };


  const { user, usertype, isLoggedIn, logout, cookie} = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg fontMedium" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <ScrollLink className="pointer flexNullCenter" to="home" smooth={true} >
            {/* <LogoIcon /> */}
          </ScrollLink>
          <RouterLink to="/">
            <img src={logoo} alt="로고 이미지"  style={{marginLeft:"-100px", width:"95px", height:"45px"}}/>
          </RouterLink>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            {/* 메뉴 항목들을 여기에 포함 */}
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px 5px", fontSize:"17px"}} to="home" spy={true} smooth={true} offset={-80}>
                학습실
              </ScrollLink>
            </li>
            {/* <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px" }} to="services" spy={true} smooth={true} offset={-80}>
                일기
              </ScrollLink>
            </li> */}
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px 5px", fontSize:"17px" }} to="projects" spy={true} smooth={true} offset={-80}>
                일기
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px 5px", fontSize:"17px" }} to="blog" spy={true} smooth={true} offset={-80}>
                커뮤니티
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px 5px", fontSize:"17px" }} to="pricing" spy={true} smooth={true} offset={-80}>
                서비스 소개
              </ScrollLink>
            </li>
            <li className="semiBold font15 pointer">
              <ScrollLink activeClass="active" style={{ padding: "10px 15px 5px", fontSize:"17px" }} to="contact" spy={true} smooth={true} offset={-80}>
                1:1 상담
              </ScrollLink>
            </li>
          </UlWrapper>
          
          <UlWrapperRight className="flexNullCenter">
            {cookie.access_token ?(<li className="semiBold font15 pointer">
              환영합니다. {user} {usertype}님! 
              <LogoutButton title="로그아웃" action={handleLogout}/>
              </li>)
            :
            (<>
              <li className="semiBold font15 pointer">
                <a href="./login" className="radius8 lightBg" style={{ padding: "10px 15px"}}>로그인</a>
              </li>
              <li className="semiBold font15 pointer flexCenter">
                <a href="./membership" className="radius8 lightBg" style={{ padding: "10px 15px" , marginLeft:"10px"}}>회원가입</a>
              </li>
            </>)}
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
      <LoginModal isOpen={loginModalOpen} position={loginButtonPosition} onClose={() => setLoginModalOpen(false)} />
      <SignupModal isOpen={signupModalOpen} position={signupButtonPosition} onClose={() => setSignupModalOpen(false)} /> {/* 회원가입 모달 컴포넌트 추가 */}
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background:#F5FBEF;
  border-bottom:4px solid #0ab867;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;


