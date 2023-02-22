
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Popup } from './Popup';
import { IconButton } from '../features/button/IconButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { LightTheme } from '../schema/color';

const StyledPotContainer = styled.div<{expand? : boolean}>`
    position: relative;
    width:100px;
    height:100px;
    background: ${LightTheme.palette.light};
    border-radius: 100%;
    overflow: hidden;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const StyledPotBack = styled.div<{expand? : boolean}>`
    position: absolute;
    width:100px;
    height:100px;
    transition: all 0.3s ease;
    transform: translate3d(30px, 30px, 30px);
    &:hover{
        transform: translate3d(0, 0, 0);
    }
    background-color: ${LightTheme.palette.secondary};
    color: white;
    border-radius: 100%;
`;


const StyledPotFront = styled.div<{expand? : boolean}>`
    position: absolute;
    width:100px;
    height:100px;
    left: -50px;
    transition: all 0.3s ease;
    transform: translate3d(30px, 30px, 30px);
    &:hover {
        & + ${StyledPotBack}{
            transform: translate3d(100px, 100px, 100px);
        }
        transform: translate3d(50px, 0, 30px);
    }
    background-color: lightblue;
    color: black;
    border-radius: 100%;
`;



const StyledPot = styled.div<{expand?: boolean, height?:number, width?:number}>`
    background-color: transparent;
    min-height: 100px;
    min-width: 100px;
    border-radius: 50%;
`;

interface PotProps {
    water?: number;
    fertilizer?: number;
    puid: number;
    onClick: (event : any) => void
}

//User page does import our table component and is bound to our react routing system
const Pot = ({ water, fertilizer, puid, onClick }:PotProps) : ReactElement => {

    const [data, setData] = useState()
    const [rect, setRect] = useState<DOMRect>()
    const [expandPot, setExpandPot] = useState(false)

return (
    <>
    <StyledPot onClick={onClick}>
        <StyledPotContainer expand={expandPot}>
            <StyledPotFront>
            </StyledPotFront>
            <StyledPotBack>
            </StyledPotBack>
        </StyledPotContainer>
    </StyledPot>
    </>
);
}

export { Pot }

  