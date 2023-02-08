
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledStack = styled.div<{expand?: boolean, height?:number, width?:number}>`
    background-color: transparent;
    perspective: 1000px;
    min-height: 300px;
    min-width: 300px;
`;

const StyledStackContainer = styled.div<{expand? : boolean}>`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;


const StyledStackFront = styled.div<{expand? : boolean, colorFront?: string}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    ${(props) => !props.colorFront ? "background-color: #f9f9f9" : "background-color: "+props.colorFront};

    color: black;
`;
const StyledStackClick = styled.div<{expand? : boolean}>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const StyledStackBack = styled.div<{expand? : boolean, colorBack?: string}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    ${(props) => !props.colorBack ? "background-color: #095a04" : "background-color: "+props.colorBack};
    transform: rotateY(180deg);
`;

interface StackProps {
    height?: number;
    width?: number;
    children: ReactElement;
    onClick : (event : any) => void
}

//User page does import our table component and is bound to our react routing system
const Stack = ({ children, onClick }:StackProps) : ReactElement => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [expand, setExpand] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)

    useEffect(() => {
  
       
    }, []);


return (
    <>
    <StyledStack onClick={onClick}>
        <StyledStackContainer expand={expand}>
            {children}
        </StyledStackContainer>
    </StyledStack>
    </>
);
}
  
  export { Stack }

  