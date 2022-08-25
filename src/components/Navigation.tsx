
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState} from 'react';
import styled from 'styled-components';

const StyledNavbar = styled.div<{expand: boolean}>`
  left:0;
  top:0;
  background: ${(props) => props.expand ? "#f9f9f9" : "#182848"};
  width: ${(props) => props.expand ? "100%" : "33%"};
  color: ${(props) => props.expand ? "black" : "white"};

  height: 100%;
  transition: all 0.5s ease-in-out;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const StyledBurgerIcon = styled.div`
  margin: 0 auto;
  width: 20px;
  height  20px;
  padding-top: 2rem;
`;

interface NavbarProps {
}

const Navbar = ({} : NavbarProps) : ReactElement => {
  const [expand, setExpand] = useState(false)
    return (
    <>
      <StyledNavbar onClick={() => setExpand(!expand)} expand={expand}>
        <StyledBurgerIcon> 
          {expand && <FontAwesomeIcon size='2x' icon={"angle-left"}></FontAwesomeIcon>}
          {!expand && <FontAwesomeIcon size='2x' icon={"angle-right"}></FontAwesomeIcon>}
        </StyledBurgerIcon>
      </StyledNavbar>
    </>
);
}
  
  export { Navbar }