
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Popup } from './Popup';
import { IconButton } from '../features/button/IconButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { LightTheme } from '../schema/color';

const StyledPotContainer = styled.div<{expand? : boolean}>`
    position: relative;
    width:${(props) => props.expand ? "50px" : "100px"};
    height:${(props) => props.expand ? "50px" : "100px"};
    background: ${LightTheme.palette.light};
    font-size: ${LightTheme.font.size.small};
    border-radius: 100%;
    overflow: hidden;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const StyledPotFertilizerLabel = styled.div<{expand? : boolean}>`
    position: relative;
    color: white;
    opacity:0;
    transition: all 0.3s ease;

    transform: translate3d(${(props) => props.expand ? "15px" : "30px"}, ${(props) => props.expand ? "15px" : "30px"}, ${(props) => props.expand ? "15px" : "30px"});
`;

const StyledPotWaterLabel = styled.div<{expand? : boolean}>`
    position: relative;
    color: black;
    opacity: 0;
    transition: all 0.3s ease;
    transform: translate3d(${(props) => props.expand ? "15px" : "30px"}, ${(props) => props.expand ? "15px" : "30px"}, ${(props) => props.expand ? "15px" : "30px"});
`;

const StyledPotFertilizer = styled.div<{expand? : boolean}>`
    position: absolute;
    width:${(props) => props.expand ? "50px" : "100px"};
    height:${(props) => props.expand ? "50px" : "100px"};
    transition: all 0.3s ease;
    transform: translate3d(${(props) => props.expand ? "15px" : "30px"}, ${(props) => props.expand ? "15px" : "30px"}, ${(props) => props.expand ? "15px" : "30px"});
    &:hover {
        ${StyledPotFertilizerLabel}{
            opacity: 1;
        }
        transform: translate3d(0, 0, 0);
    }
    
    background-color: ${LightTheme.palette.secondary};
    border-radius: 100%;
`;


const StyledPotWater = styled.div<{expand? : boolean}>`
    position: absolute;
    width:${(props) => props.expand ? "50px" : "100px"};
    height:${(props) => props.expand ? "50px" : "100px"};
    left: ${(props) => props.expand ? "-25px" : "-50px"};
    transition: all 0.3s ease;
    transform: translate3d(${(props) => props.expand ? "15px" : "30px"}, ${(props) => props.expand ? "15px" : "30px"}, ${(props) => props.expand ? "15px" : "30px"});
    &:hover {
        ${StyledPotWaterLabel}{
            opacity: 1;
        }
        & + ${StyledPotFertilizer}{
            transform: translate3d(${(props) => props.expand ? "50px" : "100px"}, ${(props) => props.expand ? "50px" : "100px"}, ${(props) => props.expand ? "50px" : "100px"});
        }
        transform: translate3d(${(props) => props.expand ? "25px" : "50px"}, 0, ${(props) => props.expand ? "15px" : "30px"});
    }
    background-color: lightblue;
    color: black;
    border-radius: 100%;
`;



const StyledPot = styled.div<{expand?: boolean, height?:number, width?:number}>`
    background-color: transparent;
    min-height: 50px;
    min-width: 50px;
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
    const [expandPot, setExpandPot] = useState(true)

    water = Math.floor(Math.random() * (100 - 0 + 1) + 0)
    fertilizer = Math.floor(Math.random() * (100 - 0 + 1) + 0)


return (
    <>
    <StyledPot onClick={onClick}>
        <StyledPotContainer expand={expandPot}>
            <StyledPotWater expand={expandPot}>
                <StyledPotWaterLabel expand={expandPot}>
                    {water}
                </StyledPotWaterLabel>
            </StyledPotWater>
            <StyledPotFertilizer expand={expandPot}>
                <StyledPotFertilizerLabel expand={expandPot}>
                    {fertilizer}
                </StyledPotFertilizerLabel>
            </StyledPotFertilizer>
        </StyledPotContainer>
    </StyledPot>
    </>
);
}

export { Pot }

  