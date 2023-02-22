import styled, { keyframes } from "styled-components";
import { LightTheme } from "../schema/color";
import React, {ReactElement, ReactNode} from 'react';

interface CloudProps {
    x : number;
    y: number;
    opacity: string;
    transform: string;
    color: string;
}


const Cloud = ({x, y, opacity, transform, color} : CloudProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 320" preserveAspectRatio="none" shapeRendering="auto">
        <path fill={color} x={x} y={y} transform={transform} fillOpacity={opacity} d="M 0,320 108.37255,246.7632 C 250.3534,150.81434 289.23223,235.00033 360,261.3 c 97.92805,35.76196 198.57925,56.59361 360,26.7 115.9594,-21.4746 139.49096,-27.7518 234.63877,-50.58882 0,0 142.26773,-44.95844 281.75903,-0.35074 L 1351.8242,281.8501 1440,320 H 1380 1080 720 360 60 Z"></path>
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

const StyledCloudWrapper = styled.div<{top: boolean}>`
    position: fixed;
    bottom: ${(props) => props.top ? "-100px" : "0px"};
    transform: rotate(${(props) => props.top ? "180deg" : "0deg"});

    z-index: -1;
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

type CloudAnimationProps = {
    top: boolean;
    transform: string;
}

const CloudAnimation = ({top, transform}: CloudAnimationProps) : ReactElement => {
  return (

    <StyledCloudAnimator>
        <StyledCloudWrapper top={top}>
            <StyledCloud transform={transform} color={LightTheme.palette.primary} x={48} y={0} opacity={"1"}/>
        </StyledCloudWrapper>
        <StyledCloudWrapper top={top}>
            <StyledCloud transform={transform} color={LightTheme.palette.secondary} x={48} y={3} opacity={"1"}/>
        </StyledCloudWrapper>
        <StyledCloudWrapper top={top}>
            <StyledCloud transform={transform} color={LightTheme.palette.primary} x={48} y={5} opacity={"1"}/>
        </StyledCloudWrapper>
        <StyledCloudWrapper top={top}>
            <StyledCloud transform={transform} color={LightTheme.palette.secondary} x={48} y={7} opacity={"1"}/>
        </StyledCloudWrapper>
    </StyledCloudAnimator>
    );
  }
  
  export { CloudAnimation }