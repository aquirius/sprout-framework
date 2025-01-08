
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navigation';
import { Crops } from '../components/Crops';
import { CloudAnimation } from '../components/CloudAnimation';
import styled from 'styled-components';

// interface CropsPageProps {
// }

const StyledCropsNavbar = styled.div`
    width: 75px;
    height: 100vh;

    display: block;
    position: fixed;
    left: 0;
    top: 0;
`;

const StyledCrops = styled.div`
    width: calc(100vw - 75px);
    height: 100vh;
    display: block;
    position: absolute;
    left: 75px;
    top: 0;
    overflow-x: hidden;

`;
//Register page does import our form component and is bound to our react routing system
const CropsPage = () : ReactElement => {
    const { uuid } = useParams();
    
    let userID : number = 0
    if (uuid != null){
        userID = parseInt(uuid)
    }
    return (
    <>
    <CloudAnimation transform='' top={true}></CloudAnimation>
    <StyledCropsNavbar>
        <Navbar uuid={uuid}/>
    </StyledCropsNavbar>
    <StyledCrops>
        <Crops uuid={userID}/>
    </StyledCrops>
    </>
);
}


  
export { CropsPage }