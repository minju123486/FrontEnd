import React from "react";
import styled from "styled-components";
// Components
import FullyButton from "../Buttons/FullyButton";
// Assets
import RollerIcon from "../../assets/svg/Services/RollerIcon";
import MonitorIcon from "../../assets/svg/Services/MonitorIcon";
import BrowserIcon from "../../assets/svg/Services/BrowserIcon";
import PrinterIcon from "../../assets/svg/Services/PrinterIcon";
import CheckMark from "../../assets/svg/Checkmark";
import { Link as ScrollLink } from "react-scroll";

export default function PricingTable({ icon, price, title, text,  offers, action, to_link }) {
  let getIcon;

  switch (icon) {
    case "roller":
      getIcon = <RollerIcon />;
      break;
    case "monitor":
      getIcon = <MonitorIcon />;
      break;
    case "browser":
      getIcon = <BrowserIcon />;
      break;
    case "printer":
      getIcon = <PrinterIcon />;
      break;
    default:
      getIcon = <RollerIcon />;
      break;
  }

  return (
    <Wrapper className="whiteBg radius8 shadow">
      <div className="flexSpaceCenter">
        {getIcon}
        <p className="font30 extraBold" >{price}</p>
      </div>
      <div style={{ margin: "30px 0" }}>
        <h4 className="font30 extraBold" style={{marginBottom:"6px"}}>{title}</h4>
        <p className="font13">{text}</p>
      </div>
      <div>
        {offers
          ? offers.map((item, index) => (
              <div className="flexNullCenter" style={{ margin: "15px 0" }} key={index}>
                <div style={{ position: "relative", top: "-1px", marginRight: "15px" }}>
                  {item.cheked ? (
                    <div style={{ minWidth: "20px" }}>
                      <CheckMark />
                    </div>
                  ) : (
                    <div style={{ minWidth: "20px" }}></div>
                  )}
                </div>
                <p className="font20 extraBold">{item.name}</p>
              </div>
            ))
          : null}
      </div>
      <GoDiv>
        <InnerContent>
          <ScrollLink activeClass="active" style={{ padding: "10px 15px 5px", fontSize:"17px"}} to={to_link} spy={true} smooth={true} offset={-80}>
            <strong style={{color:"white"}}>바로가기 &gt;</strong>
          </ScrollLink>
        </InnerContent>
      </GoDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 95%;
  text-align: left;
  padding: 20px 30px;
  margin-top: 30px;
  
`;

const GoDiv = styled.div`
  width: 120px;
  height: 40px;
  border-radius: 20px;
  background: green;
  margin: 40px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* Add this to make it clickable */
`;

const InnerContent = styled.div`
  width: 100%; /* Optional: Adjust as needed */
  height: 100%; /* Optional: Adjust as needed */
  display: flex;
  justify-content: center;
  align-items: center;
`;