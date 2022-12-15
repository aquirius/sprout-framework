
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledPopup = styled.div<{expand?: boolean, height?:number, width?:number}>`
    background-color: transparent;
    perspective: 1000px;
    ${(props) => !props.height ? "height: 300px" : "height: "+props.height+"px"};
    ${(props) => !props.width ? "width: 300px" : "width: "+props.width+"px"};
    ${(props) => props.expand ? "display: none" : "display: block"};

`;

const StyledPopupContainer = styled.div<{expand? : boolean}>`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    ${(props) => props.expand ? "visibility: hidden" : "visibility: visible"};
`;

const StyledPopupEdge = styled.div<{expand? : boolean}>`
    position: absolute;
    top: 5px;
    left: -10px;
    width: 20px;
    height: 20px;
    background: #f9f9f9;
    ${(props) => props.expand ? "visibility: hidden" : "visibility: visible"};
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
    uuid?: string;
    height?: number;
    width?: number;
}

//User page does import our table component and is bound to our react routing system
const Popup = ({ uuid, height, width }:PopupProps) : ReactElement => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [expandPopup, setExpandPopup] = useState(false)

    const onPopupClick = (event : React.MouseEvent) => {
        event.preventDefault();
        setExpandPopup(!expandPopup)
    }
return (
    <>
    <StyledPopup expand={expandPopup} height={height} width={width}>
        <StyledPopupContainer expand={expandPopup} onClick={(e) => onPopupClick(e)}>

            <StyledPopupFront>

            {<>asdfasdfdsaf</>}

            </StyledPopupFront>
            <StyledPopupEdge expand={expandPopup}>

</StyledPopupEdge>

        </StyledPopupContainer>
    </StyledPopup>
    </>
);
}
  
  export { Popup }

  