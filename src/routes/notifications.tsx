
import React, { ReactElement} from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navigation';
import { Notifications } from '../components/Notifications';
import { CloudAnimation } from '../components/CloudAnimation';
import styled from 'styled-components';

const StyledNotificationsNavbar = styled.div`
    width: 75px;
    height: 100vh;

    display: block;
    position: fixed;
    left: 0;
    top: 0;
`;

const StyledNotifications = styled.div`
    width: calc(100vw - 75px);
    height: 100vh;
    display: block;
    position: absolute;
    left: 75px;
    top: 0;
    overflow-x: hidden;

`;
//Register page does import our form component and is bound to our react routing system
const NotificationsPage = () : ReactElement => {
    const { uuid } = useParams();
    
    let userID : number = 0
    if (uuid != null){
        userID = parseInt(uuid)
    }
    return (
    <>
    <CloudAnimation transform='' top={true}></CloudAnimation>
    <StyledNotificationsNavbar>
        <Navbar uuid={uuid}/>
    </StyledNotificationsNavbar>
    <StyledNotifications>
        <Notifications uuid={userID}/>
    </StyledNotifications>
    </>
);
}


  
export { NotificationsPage }