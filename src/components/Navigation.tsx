
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState} from 'react';
import styled from 'styled-components';

const StyledNavbar = styled.div<{expand: boolean}>`
  left:0;
  top:0;
  background: ${(props) => props.expand ? "#f9f9f9" : "transparent"};
  width: ${(props) => props.expand ? "20vh" : "5vh"};
  transition: all 0.5s ease-in-out;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  margin-right: 1rem;
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
          {expand && <FontAwesomeIcon size='lg' icon={"angle-left"}></FontAwesomeIcon>}
          {!expand && <FontAwesomeIcon size='lg' icon={"angle-right"}></FontAwesomeIcon>}
        </StyledBurgerIcon>
      </StyledNavbar>
    </>
);
}
  
  export { Navbar }