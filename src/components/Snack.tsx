
import React, { ReactElement, useState } from 'react';
import styled,{ keyframes } from 'styled-components';
import { LightTheme } from '../schema/color';

const fadeIn = keyframes`
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
`;

const fadeOut = keyframes`
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
`;


const StyledSnack = styled.div<{show?: boolean; danger: boolean}>`
    visibility: ${(props) => props.show ? "visible;" : "hidden"};
    color: ${(props) => props.danger ? "red" : "blue"};
    opacity: 
    transition: all 2s linear;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: ${LightTheme.font.size.big};
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    animation-name: ${(props) => props.show ? fadeIn : fadeOut};
    animation-duration: 2s;
    animation-iteration-count: 1;
`;

const StyledSnackContainer = styled.div<{show? : boolean; danger: boolean}>`
`;

interface SnackProps {
    message: string;
    danger: boolean;
}

//User page does import our table component and is bound to our react routing system
const Snack = ({ message, danger }:SnackProps) : ReactElement => {
    const [show, setShow] = useState(true)
    return (
        <>
        <StyledSnack danger={danger} onClick={() => setShow(!show)} show={show}>
            <StyledSnackContainer danger={danger} show={show} >
                {message}
            </StyledSnackContainer>
        </StyledSnack>
        </>
);
}
  
  export { Snack }

  