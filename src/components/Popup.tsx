
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledPopup = styled.div<{expand?: boolean, height?:number, width?:number}>`
    background-color: transparent;
    perspective: 1000px;
    ${(props) => !props.height ? "height: 300px" : "height: "+props.height+"px"};
    ${(props) => !props.width ? "width: 300px" : "width: "+props.width+"px"};
    ${(props) => props.expand ? "display: none" : "display: block"};
    position: absolute;
`;

const StyledPopupContainer = styled.div<{expand? : boolean, top?: number, left?: number}>`
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    ${(props) => props.expand ? "display: none" : "display: block"};

    ${(props) => props.top ? "top: 5px": "top: "+props.top+"px"};
    ${(props) => props.left ? "left: -10px": "left: "+props.left+"px"};
`;

const StyledPopupEdge = styled.div<{expand? : boolean, top?: number, left?: number}>`
    position: absolute;
    ${(props) => props.top ? "top: 5px": "top: "+props.top+"px"};
    ${(props) => props.left ? "left: -10px": "left: "+props.left+"px"};

    width: 20px;
    height: 20px;
    background: #f9f9f9;
    ${(props) => props.expand ? "display: none" : "display: block"};
    content: '';
    transform: rotate(45deg);
`;


const StyledPopupFront = styled.div<{expand? : boolean}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
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
    const [rectBottom, setRectBottom] = useState(0)
    const [rectHeight, setRectHeight] = useState(0)

    const [expandPopup, setExpandPopup] = useState(false)

    if (rect != undefined) {
        setRectTop(rect.top)
        setRectLeft(rect.left)
        setRectRight(rect.right)
        setRectBottom(rect.bottom)
        setRectHeight(rect.height)
    }
    

    console.log(rect)

return (
    <>
    <StyledPopup expand={popup} height={height} width={width}>
        <StyledPopupContainer top={rectTop} left={rectLeft} expand={popup} onClick={(e) => {}}>

            <StyledPopupFront>

            {<>asdfasdfdsaf</>}

            </StyledPopupFront>
            <StyledPopupEdge top={rectTop} left={rectLeft} expand={popup}></StyledPopupEdge>

        </StyledPopupContainer>
    </StyledPopup>
    </>
);
}
  
  export { Popup }

  