import React, { ReactElement} from 'react';
import styled from 'styled-components';
import { Background } from '../components/Background';
import { Landing } from '../features/landing/Landing';

const StyledLandingPage = styled.div`
`;


interface LandingPageProps {
}

//Landing page does import our form component and is bound to our react routing system
const LandingPage = ({} : LandingPageProps) : ReactElement => {
return (
    <>
    <Landing/>
    <Background expand/>
    </>
);
}
  
  export { LandingPage }
  