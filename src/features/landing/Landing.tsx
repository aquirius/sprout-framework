import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { LightTheme } from '../../schema/color';
import { CloudAnimation } from '../../components/CloudAnimation';

const StyledLanding = styled.div`
    position:relative;
`;

const StyledLandingButtonText = styled.div`
    padding: 3rem;
    font-size: 5rem;
    color: black;
    width: fit-content;
`;

const StyledButtonFront = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;


const Landing = () : ReactElement => {
  //initialize with empty states
const [loading, setLoading] = useState(true)
const [position, setPosition] = useState({x:"0", y:"0", z: "0"});
const nav = useNavigate();

return (
    <> 
        <StyledLanding>
                <StyledLandingButtonText>order.</StyledLandingButtonText>
                <StyledLandingButtonText>plant.</StyledLandingButtonText>
                <StyledLandingButtonText>harvest.</StyledLandingButtonText>
                <StyledButtonFront>
                    <Button onClick={() => nav("/login")} content={"login"}></Button>
                    <Button onClick={() => nav("/register")} content={"register"}></Button>
                </StyledButtonFront>
                <CloudAnimation transform='' top={false}></CloudAnimation>
        </StyledLanding>
    </>
  );
}

export { Landing }
