import React, { useState } from "react";
import styled from "styled-components";

export default function ProjectBox({ img, title, text, action }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Wrapper>
      <ImgBtn
        className="animate pointer"
        onClick={action ? () => action() : null}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isHovered={isHovered}
      >
        <img
          className="radius8"
          src={img}
          alt="project"
          style={{ width: "200px", height: "150px", transform: isHovered ? "translateY(-13px)" : "translateY(0)" }}
        />
      </ImgBtn>
      <h3 className="font20 extraBold">{title}</h3>
      <p className="font13">{text}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-right:3px;
  margin-left:3px;
  img {
    width: 100%;
    height: auto;
    margin: 20px 0;
    transition: transform 0.3s ease-in-out;
  }
  h3 {
    padding-bottom: 10px;
  }
`;
const ImgBtn = styled.button`
  background-color: transparent;
  border: 0px;
  outline: none;
  padding: 0px;
  margin: 0px;
  :hover > img {
    opacity: 0.5;
  }
`;
