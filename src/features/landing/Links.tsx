import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faGithub, faGolang, faInstagram, faLinkedin, faSpotify, faXing } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, GridElement } from '../../components/Grid';

const StyledLandingLinks = styled.div`
    background-color: #095a04;
    text-align:center;
    z-index: 2;
    border-radius: 25px;
    padding:10px;
    width: 50px;
    color: white;
`;

const StyledLandingLinkWrapper = styled.div`
    width: 100%;
`;

const StyledLandingLink = styled.a`
    text-decoration: none;
    color:white;
`;

const LandingLinks = () : ReactElement => {
  //initialize with empty states
return (
    <>
    <StyledLandingLinkWrapper>
    <Grid layout={"20vw 20vw 20vw 20vw"} dimension={"'a b c d'"} >
        <GridElement position='a' align={"center"}>
            <StyledLandingLinks>
                <StyledLandingLink href='https://linkedin.com/in/maximilian-g-154a6b13b'>
                    <FontAwesomeIcon size='2x' icon={faLinkedin as IconProp}></FontAwesomeIcon>
                </StyledLandingLink>
            </StyledLandingLinks>
        </GridElement>
        <GridElement position='b' align={"center"}>
            <StyledLandingLinks>
                <StyledLandingLink href='https://xing.com/profile/maximilian_guth3/cv'>
                        <FontAwesomeIcon size='2x' icon={faXing as IconProp}></FontAwesomeIcon>
                </StyledLandingLink>
            </StyledLandingLinks>
        </GridElement>
        <GridElement position='c' align={"center"}>
        <StyledLandingLinks>
                <StyledLandingLink href='https://github.com/aquirius'>
                        <FontAwesomeIcon size='2x' icon={faGithub as IconProp}></FontAwesomeIcon>
                </StyledLandingLink>
            </StyledLandingLinks>
        </GridElement>
        <GridElement position='d' align={"center"}>
        <StyledLandingLinks>
                <StyledLandingLink href='https://instagram.com/moshinima'>
                        <FontAwesomeIcon size='2x' icon={faInstagram as IconProp}></FontAwesomeIcon>
                </StyledLandingLink>
            </StyledLandingLinks>
        </GridElement>
    </Grid>
    </StyledLandingLinkWrapper>
    </>
  );
}

export { LandingLinks }
