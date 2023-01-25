import React, { ReactElement} from 'react';
import styled from 'styled-components';
import { Background } from '../components/Background';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { Contact } from '../features/landing/Contact';
import { Landing } from '../features/landing/Landing';
import { Legal } from '../features/landing/Legal';
import { LandingLinks } from '../features/landing/Links';
import { Projects } from '../features/landing/Projects';
import { Skills } from '../features/landing/Skills';
import { Slogan } from '../features/landing/Slogan';

const StyledLandingPage = styled.div`
    width: 100%;
`;

const StyledLandingSection = styled.div`
    position: relative;
    justify-content: center;
    height: 100vh;
    background: white;
    overflow: hidden;
`;

const StyledLandingPageSection = styled.div`
    padding: 3rem 0 3rem 0rem;
    border-bottom: 3px solid black;
`;


interface LandingPageProps {
}

//Landing page does import our form component and is bound to our react routing system
const LandingPage = ({} : LandingPageProps) : ReactElement => {
return (
    <>
    <StyledLandingPage>
        <StyledLandingSection>
        <StyledLandingPageSection>
            <Landing/>
        </StyledLandingPageSection>
        </StyledLandingSection>
        <StyledLandingPageSection>
            <Legal/>
        </StyledLandingPageSection>
    </StyledLandingPage>
    </>
);
}

  
  export { LandingPage }
  