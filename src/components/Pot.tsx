
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Popup } from './Popup';

const StyledPot = styled.div<{expand?: boolean, height?:number, width?:number}>`
    background-color: transparent;
    perspective: 1000px;
    ${(props) => !props.height ? "height: 300px" : "height: "+props.height+"px"};
    ${(props) => !props.width ? "width: 300px" : "width: "+props.width+"px"};
`;

const StyledPotContainer = styled.div<{expand? : boolean}>`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    ${(props) => props.expand ? "transform: rotateY(180deg)" : ""};
`;


const StyledPotFront = styled.div<{expand? : boolean}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: #f9f9f9;
    color: black;
`;

const StyledPotBack = styled.div<{expand? : boolean}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: #182848;
    color: white;
    transform: rotateY(180deg);
`;

interface PotProps {
    height?: number;
    width?: number;
    childFront: ReactElement
    childBack: ReactElement
}

//User page does import our table component and is bound to our react routing system
const Pot = ({ height, width, childFront, childBack }:PotProps) : ReactElement => {

    const [data, setData] = useState()
    const [rect, setRect] = useState<DOMRect>()
    const [expandPot, setExpandPot] = useState(false)


    const onPotClick = (event : React.MouseEvent) => {
        setRect(event.currentTarget.getBoundingClientRect())
        setExpandPot(!expandPot)
    }
return (
    <>
    <StyledPot height={height} width={width}>
        <StyledPotContainer expand={expandPot} onClick={(e) => onPotClick(e)}>
            <StyledPotFront>
                {childFront}
            </StyledPotFront>
            <StyledPotBack>
                {childBack}
            </StyledPotBack>
        </StyledPotContainer>
    </StyledPot>
    {expandPot && <Popup rect={rect || undefined} popup={expandPot} height={200} width={200}></Popup>}
    </>
);
}
  
export { Pot }

  