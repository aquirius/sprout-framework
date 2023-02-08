
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Popup } from './Popup';

const StyledPot = styled.div<{expand?: boolean, height?:number, width?:number}>`
    background-color: transparent;
    min-height: 100px;
    min-width: 100px;
    border-radius: 50%;
`;

const StyledPotContainer = styled.div<{expand? : boolean}>`
    position: relative;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;


const StyledPotFront = styled.div<{expand? : boolean}>`
    position: absolute;
    width:100px;
    height:100px;
    border-radius:100%;
    border:20px solid;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: #f9f9f9;
    color: black;
    border-color:#f9f9f9 lightblue brown #095a04;
`;

const StyledPotBack = styled.div<{expand? : boolean}>`
    position: absolute;
    width: 50%%;
    height: 100%;
    background-color: #095a04;
    color: white;
    border-radius: 50%;
`;

interface PotProps {
    water?: number;
    fertilizer?: number;
    childFront: ReactElement
    childBack: ReactElement
    onClick: (event : any) => void
}

//User page does import our table component and is bound to our react routing system
const Pot = ({ water, fertilizer, childFront, childBack, onClick }:PotProps) : ReactElement => {

    const [data, setData] = useState()
    const [rect, setRect] = useState<DOMRect>()
    const [expandPot, setExpandPot] = useState(false)

    const onPotClick = (event : React.MouseEvent) => {
        event.stopPropagation();

        setRect(event.currentTarget.getBoundingClientRect())
        onClick(event)
        setExpandPot(!expandPot)
    }
return (
    <>
    <StyledPot>
        <StyledPotContainer expand={expandPot} onClick={(e) => onPotClick(e)}>
            <StyledPotFront>
                {childFront}
            </StyledPotFront>
            <StyledPotBack>
                {childBack}
            </StyledPotBack>
        </StyledPotContainer>
    </StyledPot>
    </>
);
}
  
export { Pot }

  