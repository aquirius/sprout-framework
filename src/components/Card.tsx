
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LightTheme } from '../schema/color';

const StyledCard = styled.div<{expand?: boolean, height?:number, width?:number}>`
    background-color: transparent;
    perspective: 1000px;
    ${(props) => !props.height ? "height: 300px" : "height: "+props.height+"px"};
    ${(props) => !props.width ? "width: 300px" : "width: "+props.width+"px"};
`;

const StyledCardContainer = styled.div<{expand? : boolean}>`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    ${(props) => props.expand ? "transform: rotateY(180deg)" : ""};
`;

const StyledCardFront = styled.div<{expand? : boolean, colorFront?: string}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: ${(props) => !props.colorFront ? LightTheme.palette.light : props.colorFront};
    color: black;
`;

const StyledCardClick = styled.div<{expand? : boolean}>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const StyledCardBack = styled.div<{expand? : boolean, colorBack?: string}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: ${(props) => !props.colorBack ? LightTheme.palette.light : props.colorBack};
    transform: rotateY(180deg);
`;

interface CardProps {
    height?: number;
    width?: number;
    childFront: ReactElement
    childBack: ReactElement
    colorFront?: string;
    colorBack?: string;
}

//User page does import our table component and is bound to our react routing system
const Card = ({ height, width, childFront, childBack, colorFront, colorBack }:CardProps) : ReactElement => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [expand, setExpand] = useState(false)

    const onCardClick = (event : React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        setExpand(!expand)
    }
return (
    <>
    <StyledCard height={height} width={width}>
        <StyledCardContainer expand={expand}>
            <StyledCardFront colorFront={colorFront}>
                <StyledCardClick onClick={(e) => onCardClick(e)}>
                {childFront}
                </StyledCardClick>
            </StyledCardFront>
            <StyledCardBack colorBack={colorBack}>
                {childBack}
                <StyledCardClick onClick={(e) => onCardClick(e)}/>
            </StyledCardBack>
        </StyledCardContainer>
    </StyledCard>
    </>
);
}
  
  export { Card }

  