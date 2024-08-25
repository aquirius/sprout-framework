
import React, { ReactElement} from 'react';
import { useParams } from 'react-router-dom';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { Greenhouses } from '../components/Greenhouses';
import { CloudAnimation } from '../components/CloudAnimation';
import styled from 'styled-components';

interface GreenhousesPageProps {
}

const StyledGreenhousesNavbar = styled.div`
    width: 75px;
    height: 100vh;

    display: block;
    position: fixed;
    left: 0;
    top: 0;
`;

const StyledGreenhouses = styled.div`
    width: calc(100vw - 75px);
    height: 100vh;
    display: block;
    position: absolute;
    left: 75px;
    top: 0;
`;
//Register page does import our form component and is bound to our react routing system
const GreenhousesPage = ({}) : ReactElement => {
    const { uuid } = useParams();
    const { guid } = useParams();
    
    let userID : number = 0
    let greenhouseID : number = 0
    if (uuid != null){
        userID = parseInt(uuid)
    }
    if (guid != null){
        greenhouseID = parseInt(guid)
    }
    return (
    <>
    <CloudAnimation transform='' top={true}></CloudAnimation>
    <StyledGreenhousesNavbar>
        <Navbar uuid={uuid}/>
    </StyledGreenhousesNavbar>
    <StyledGreenhouses>
        <Greenhouses uuid={userID}/>
    </StyledGreenhouses>
    </>
);
}


  
export { GreenhousesPage }