
import React, { ReactElement} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Background } from '../components/Background';
import { Navbar } from '../components/Navigation';
import { User } from '../components/User';


const StyledUserGrid = styled.div`
    display:grid;
    grid-template-columns: 75px auto;
    height: 100vh;
`;

const StyledUser = styled.div`
    display: grid;
    grid-column:2;
    height: 100%;
    margin-left: 20vh;
`;

const StyledNav = styled.div`
    display: grid;
    height: 100%;
    grid-column:1;
`;


interface UserPageProps {
}
//Register page does import our form component and is bound to our react routing system
const UserPage = ({}) : ReactElement => {
    const { uuid } = useParams();
    return (
    <>
    <StyledUserGrid>
        <StyledNav>
            <Navbar/>
        </StyledNav>
        <StyledUser>
            <User uuid={uuid}/>
        </StyledUser>
    </StyledUserGrid>
    <Background/>
    </>
);
}

  
export { UserPage }