import React, { ReactElement} from 'react';
import styled from 'styled-components';
import { Background } from '../components/Background';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { Landing } from '../features/landing/Landing';
import { Legal } from '../features/landing/Legal';
import { LandingLinks } from '../features/landing/Links';
import { Projects } from '../features/landing/Projects';
import { Skills } from '../features/landing/Skills';
import { Slogan } from '../features/landing/Slogan';

const StyledLandingPage = styled.div`
    display: grid;
    justify-content: center;
    height: 100vh;
    background:white;
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
        <StyledLandingPageSection>
            <Landing/>
        </StyledLandingPageSection>
        <StyledLandingPageSection>
            <LandingLinks/>
        </StyledLandingPageSection>
        <StyledLandingPageSection>
            <Slogan angle={45} offset={500} headContentString={"Hi nice to meet you! I am Max, full stack!"} bodyContentString={"do you wanna see front ends ?"} footerContentString={""}/>
        </StyledLandingPageSection>
        <StyledLandingPageSection>
            <Skills/>
        </StyledLandingPageSection>
        <StyledLandingPageSection>
            <Slogan angle={125} offset={500} headContentString={"I told you I am full stack !"} bodyContentString={"so here are some backends"} footerContentString={""}/>
        </StyledLandingPageSection>
        <StyledLandingPageSection>
            <Projects/>
        </StyledLandingPageSection>
        <StyledLandingPageSection>
            <Legal/>
        </StyledLandingPageSection>
    </StyledLandingPage>
    </>
);
}
  
  export { LandingPage }
  