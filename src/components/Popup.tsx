
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledPopup = styled.div<{expand?: boolean, height?:number, width?:number, top?: number, left?: number}>`
    background-color: transparent;
    position: absolute;

    perspective: 1000px;
    height: 60vh;
    width: 50vw;
    ${(props) => props.expand ? "display: block" : "display: none"};

    ${(props) => props.top ? "top: "+props.left+"px" : "top: 5px"};
    ${(props) => props.left ? "left: "+props.left+"px" : "left: -10px"};

    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const StyledPopupContainer = styled.div<{expand? : boolean, top?: number, left?: number}>`
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
`;

const StyledPopupEdge = styled.div<{expand? : boolean, top?: number, left?: number}>`
    position: absolute;
    left: 0;
    top: 0;

    width: 20px;
    height: 20px;
    background: #f9f9f9;
    content: '';
    transform: rotate(45deg);
`;


const StyledPopupFront = styled.div<{expand? : boolean}>`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    color: black;
`;

interface PopupProps {
    popup?: boolean;
    height?: number;
    width?: number;
    rect?: DOMRect;
}

//User page does import our table component and is bound to our react routing system
const Popup = ({ rect, popup, height, width }:PopupProps) : ReactElement => {

    const [data, setData] = useState()
    const [rectTop, setRectTop] = useState(0)
    const [rectLeft, setRectLeft] = useState(0)
    const [rectRight, setRectRight] = useState(0)
    const [rectHeight, setRectHeight] = useState(0)

    const [expandPopup, setExpandPopup] = useState(false)
    const [rectBottom, setRectBottom] = useState(0)

    var wd = window.innerWidth;
    var ht = window.innerHeight;
        
    var halfWindowWidth = wd / 2
    var halfWindowHeight = ht / 2

    var leftCenter
    var topCenter


    if (rect !== undefined) {
        leftCenter = halfWindowWidth - (rect.width / 2)
        topCenter = halfWindowHeight - (rect.height / 2)
    }

return (
    <>
            {rect &&  
    <StyledPopup top={topCenter} left={leftCenter} expand={popup} height={height} width={width}>
        <StyledPopupContainer top={topCenter} left={leftCenter} expand={popup} onClick={(e) => {}}>

        <StyledPopupFront>

        {<>asdfasdfdsaf</>}
        <StyledPopupEdge top={topCenter} left={leftCenter} expand={popup}></StyledPopupEdge>

        </StyledPopupFront>
        </StyledPopupContainer>
    </StyledPopup>
}
    </>
);
}
  
  export { Popup }

  