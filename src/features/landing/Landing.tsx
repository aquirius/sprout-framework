import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, GridElement } from '../../components/Grid';
import { Button } from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from '../../components/Card';

const StyledLanding = styled.div`
    position: absolute;
    top:0;
    margin-left: auto; 
    margin-right: auto;
    width: 100%;
    height: 100%;
`;

const StyledLandingButtonFront = styled.div<{x: string; y:string; z:string}>`
    width: 100%;
    height: 80%;
    transform-style: preserve-3d;
    border: solid 1px black;
    transition: all 0.3s ease;
    transform: rotateY(${props => props.x}deg) rotateX(${props => props.y}deg);
    box-shadow: 0 5rem 9rem grey;

    background-image: url('me.jpeg');
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

`;

const StyledLandingCell = styled.div<{x: number; y:number;}>`
    width: 100%;
    height: 100%;
    z-index: 2;
`;
const StyledLandingGrid = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template: repeat(10, 1fr) / repeat(10, 1fr);
`;

const StyledLandingButtonText = styled.div`
    padding: 3rem;
    font-size: 3.5rem;
    color: white;
    transform: translateZ(50px);
`;


const Landing = () : ReactElement => {
  //initialize with empty states
const [loading, setLoading] = useState(true)
const [position, setPosition] = useState({x:"0", y:"0", z: "0"});
const cells = [] 

for(var y=1;y<=10;y++){
    for(var x=1;x<=10; x++){
        cells.push(<StyledLandingCell onMouseOver={(e) => handleMouseMove(e)} x={x} y={y}/>)
    }
}

const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const x = event.currentTarget.getAttribute("x") || "0"
    const y = event.currentTarget.getAttribute("y") || "0"
    const yS = (-((parseInt(y)*100) - (5*100) - (100/2))/10).toString()
    const zS = (parseInt(y)*36).toString()
    const xS = (((parseInt(x)*100) - (5*100) - (100/2))/10).toString()
    setPosition({x:xS , y:yS, z:zS})
}

return (
    <> 
        <StyledLandingGrid>
                {cells && cells.map((cell, id) => {
                    return (cell)
                })}
        </StyledLandingGrid>
        <StyledLanding>
            <StyledLandingButtonFront x={position.x} y={position.y} z={position.z}>
                <StyledLandingButtonText>adsf</StyledLandingButtonText>
                <StyledLandingButtonText>sdfsdfdsf</StyledLandingButtonText>

            </StyledLandingButtonFront>
        </StyledLanding>
    </>
  );
}

export { Landing }
