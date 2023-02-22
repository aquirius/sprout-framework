import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { LightTheme } from '../../schema/color';

interface CloudProps {
    x : number;
    y: number;
    opacity: string;
    color: string;
}


const Cloud = ({x, y, opacity, color} : CloudProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 320" preserveAspectRatio="none" shapeRendering="auto">
        <path fill={color} x={x} y={y} fillOpacity={opacity} d="M 0,320 108.37255,246.7632 C 250.3534,150.81434 289.23223,235.00033 360,261.3 c 97.92805,35.76196 198.57925,56.59361 360,26.7 115.9594,-21.4746 139.49096,-27.7518 234.63877,-50.58882 0,0 142.26773,-44.95844 281.75903,-0.35074 L 1351.8242,281.8501 1440,320 H 1380 1080 720 360 60 Z"></path>
    </svg>
)

const StyledMoveForever = keyframes`
    0% {transform: translate3d(-300px,0,0); opacity: 0;}
    50%{transform: translate3d(0,0,0); opacity: 1;}
    100%{transform: translate3d(555px,0,0); opacity: 0;}
`

const StyledCloud = styled(Cloud)`
    width: 100%;
    height: 15vh;
`;

const StyledCloudAnimator = styled.div`
`;

const StyledCloudWrapper = styled.div`
    position: absolute;
    width: 120%;
    animation: ${StyledMoveForever} 25s cubic-bezier(.55,.5,.45,.5) infinite;
    &:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
    }
    &:nth-child(2) {
        animation-delay: -6s;
        animation-duration: 10s;
    }
    &:nth-child(3) {
        animation-delay: -12s;
        animation-duration: 13s;
    }
    &:nth-child(4) {
        animation-delay: -18s;
        animation-duration: 20s;
    }
`;

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
                <StyledCloudAnimator>
                    <StyledCloudWrapper>
                        <StyledCloud color={LightTheme.palette.primary} x={48} y={0} opacity={"1"}/>
                    </StyledCloudWrapper>
                    <StyledCloudWrapper>
                        <StyledCloud color={LightTheme.palette.primary} x={48} y={3} opacity={"1"}/>
                    </StyledCloudWrapper>
                    <StyledCloudWrapper>
                        <StyledCloud color={LightTheme.palette.primary} x={48} y={5} opacity={"1"}/>
                    </StyledCloudWrapper>
                    <StyledCloudWrapper>
                        <StyledCloud color={LightTheme.palette.primary} x={48} y={7} opacity={"1"}/>
                    </StyledCloudWrapper>
                </StyledCloudAnimator>

        </StyledLanding>
    </>
  );
}

export { Landing }
