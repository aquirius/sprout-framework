import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faGithub, faGolang, faInstagram, faLinkedin, faSpotify, faXing } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, GridElement } from '../../components/Grid';

const StyledLandingLinks = styled.div`
    background:grey;
    text-align:center;
    z-index: 2;
    border-radius: 25px;
    padding:10px;
    width: 50px;
`;

const StyledLadingLinkWrapper = styled.div`
    width: 100%;
`;

const LandingLinks = () : ReactElement => {
  //initialize with empty states
return (
    <>
    <StyledLadingLinkWrapper>
    <Grid layout={"20vw 20vw 20vw 20vw"} dimension={"'a b c d'"} >
        <GridElement position='a' align={"center"}>
            <StyledLandingLinks onClick={() => console.log("clicked")}>
                <FontAwesomeIcon size='2x' icon={faLinkedin as IconProp}></FontAwesomeIcon>
            </StyledLandingLinks>
        </GridElement>
        <GridElement position='b' align={"center"}>
            <StyledLandingLinks onClick={() => console.log("clicked")}>
                <FontAwesomeIcon size='2x' icon={ faXing as IconProp}></FontAwesomeIcon>
            </StyledLandingLinks>
        </GridElement>
        <GridElement position='c' align={"center"}>
            <StyledLandingLinks onClick={() => console.log("clicked")}>
                <FontAwesomeIcon size='2x' icon={faGithub as IconProp}></FontAwesomeIcon>
            </StyledLandingLinks>
        </GridElement>
        <GridElement position='d' align={"center"}>
            <StyledLandingLinks onClick={() => console.log("clicked")}>
                <FontAwesomeIcon size='2x' icon={faInstagram as IconProp}></FontAwesomeIcon>
            </StyledLandingLinks>
        </GridElement>
    </Grid>
    </StyledLadingLinkWrapper>
    </>
  );
}

export { LandingLinks }
