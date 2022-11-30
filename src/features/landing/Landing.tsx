import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, GridElement } from '../../components/Grid';
import { Button } from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledLanding = styled.div`
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    display: flex;
    width: 100vw;
    height: 80vh;
    justify-content: center;
    align-self: center;
`;

const StyledLandingButtonFront = styled.div<{x: string; y:string; z:string}>`
    width: 50vw;
    height: 30vh;
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
    height: 80vh;
    display: grid;
    grid-template: repeat(10, 1fr) / repeat(10, 1fr);
`;

const StyledLandingProfileImage = styled.div`
    background-image: url('me.jpeg');
    height: 100%;
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
            <StyledLandingButtonFront x={position.x} y={position.y} z={position.z}></StyledLandingButtonFront>
        </StyledLanding>
    </>
  );
}

export { Landing }
