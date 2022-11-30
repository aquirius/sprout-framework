
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, GridElement } from './Grid';

const StyledNavbar = styled.div<{expand: boolean}>`
  background: ${(props) => props.expand ? "#f9f9f9" : "#182848"};
  width: ${(props) => props.expand ? "10vw" : "3vw"};
  color: ${(props) => props.expand ? "black" : "white"};
  min-width: 75px;
  position: fixed;
  height: 100%;
  transition-property: background, width, color;
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const StyledNavbarContent = styled.div<{expand: boolean}>`

`;

const StyledBurgerIcon = styled.div`
  margin: 2rem auto;
  width: 20px;
  height  20px;
`;

const StyledActionIcons = styled.p<{expand: boolean}>`
  padding: 2rem;

`;

const StyledActionIconLabel = styled.span<{expand: boolean}>`
  display: ${(props) => props.expand ? "inline" : "none"};
  transition: display 1s ease-in-out;

  position: absolute;
  vertical-align: super;
  padding-left: 1rem;
  `;


interface NavbarProps {
  uuid? : string
}

const Navbar = ({uuid} : NavbarProps) : ReactElement => {
  const [expand, setExpand] = useState(false)
  const nav = useNavigate();

  return (
  <>
    <StyledNavbar onClick={() => setExpand(!expand)} expand={expand}>
      <StyledBurgerIcon> 
        {expand && <FontAwesomeIcon size='2x' icon={"angle-left"}></FontAwesomeIcon>}
        {!expand && <FontAwesomeIcon size='2x' icon={"angle-right"}></FontAwesomeIcon>}
      </StyledBurgerIcon>
      <StyledNavbarContent expand={expand}>
        <Grid rows='80%' layout={"100%"} dimension={"'a'"} >
          <GridElement position='a'>
            <StyledActionIcons expand={expand}>
              <FontAwesomeIcon onClick={() => nav("/user/"+uuid)} size='2x' icon={"user"}></FontAwesomeIcon>
            </StyledActionIcons>
          </GridElement>
          <GridElement row='' position="a">
            <StyledActionIcons expand={expand}>
              <FontAwesomeIcon onClick={() => nav("/user/"+uuid+"/settings")} size='2x' icon={"cog"}></FontAwesomeIcon>
              <StyledActionIconLabel expand={expand}>settings</StyledActionIconLabel>
            </StyledActionIcons>
          </GridElement>
        </Grid>
      </StyledNavbarContent>
    </StyledNavbar>
  </>
  );
}
  
  export { Navbar }