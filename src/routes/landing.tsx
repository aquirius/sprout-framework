import React, { ReactElement} from 'react';
import styled from 'styled-components';
import { Background } from '../components/Background';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { Landing } from '../features/landing/Landing';
import { LandingLinks } from '../features/landing/Links';
import { Projects } from '../features/landing/Projects';
import { Skills } from '../features/landing/Skills';

const StyledLandingPage = styled.div`
`;


interface LandingPageProps {
}

//Landing page does import our form component and is bound to our react routing system
const LandingPage = ({} : LandingPageProps) : ReactElement => {
return (
    <>
        <Landing/>
        <LandingLinks/>
        <Skills/>
        <Projects/>

    </>
);
}
  
  export { LandingPage }
  