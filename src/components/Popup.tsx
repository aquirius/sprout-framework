
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledPopup = styled.div<{expand?: boolean, height?:number, width?:number, top?: number, left?: number}>`
    background-color: transparent;
    position: absolute;

    perspective: 1000px;
    ${(props) => !props.height ? "height: 300px" : "height: "+props.height+"px"};
    ${(props) => !props.width ? "width: 300px" : "width: "+props.width+"px"};
    ${(props) => props.expand ? "display: block" : "display: none"};

    ${(props) => props.top ? "top: "+props.top+"px":"top: 5px"};
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
    ${(props) => props.top ? "top: "+props.top+"px" : "top: 5px"};
    ${(props) => props.left ? "left: "+props.left+"px" : "left: -10px"};

    width: 20px;
    height: 20px;
    background: #f9f9f9;
    ${(props) => props.expand ? "display: block" : "display: none"};
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


return (
    <>
            {rect &&  
    <StyledPopup top={rect.bottom} left={rect.left} expand={popup} height={height} width={width}>
        <StyledPopupContainer top={rect.bottom} left={rect.left} expand={popup} onClick={(e) => {}}>

        <StyledPopupFront>

        {<>asdfasdfdsaf</>}

        </StyledPopupFront>
        <StyledPopupEdge top={rect?.top} left={rect?.left} expand={popup}></StyledPopupEdge>

        </StyledPopupContainer>
    </StyledPopup>
}
    </>
);
}
  
  export { Popup }

  