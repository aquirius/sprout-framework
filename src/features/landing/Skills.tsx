import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Grid, GridElement } from '../../components/Grid';
import { Button } from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from '../../components/Card';
import { Flexbox, FlexboxElement } from '../../components/Flexbox';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const StyledProjects = styled.div`
    background: white;
    height: fit-content;
    z-index:1;
`;

const StyledProjectCoverImage = styled.div<{url: string}>`
    background-image: url("${props => props.url}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
`;
const StyledProjectBack = styled.div`
    padding: 2rem;
    height: 100%;
    width: 100%;
`;
const StyledProjectBackText = styled.div`
    padding: 2rem 0 2rem 0;
    height: 50%;
`;

const StyledProjectBackLink = styled.a`
    text-decoration: none;
    color: white;
`;


const Skills = () : ReactElement => {
  //initialize with empty states
  const nav = useNavigate()
return (
    <> 
        <StyledProjects>
        <Flexbox align='center' direction='row' wrap='wrap'>
          <FlexboxElement align='flex-start' order={1} grow={0}>
            <Card childFront={<StyledProjectCoverImage url='register-sprout.png'></StyledProjectCoverImage>} childBack={<StyledProjectBack><FontAwesomeIcon size='4x' icon={faReact as IconProp}></FontAwesomeIcon><StyledProjectBackText>Login/Register component for webapp services. Built with React/Typescript styled with styled-components. Login/Register handler with built in session token</StyledProjectBackText><StyledProjectBackLink onClick={() => nav("users")}><FontAwesomeIcon size='4x' icon={faAngleRight as IconProp}></FontAwesomeIcon></StyledProjectBackLink></StyledProjectBack>}></Card>
          </FlexboxElement>
          <FlexboxElement align='flex-center' order={1} grow={0}>
            <Card childFront={<StyledProjectCoverImage url='band-prev.png'></StyledProjectCoverImage>} childBack={<StyledProjectBack><FontAwesomeIcon size='4x' icon={faReact as IconProp}></FontAwesomeIcon><StyledProjectBackText>Band template for upcoming music artists. Built with React/Typescript styled with styled-components</StyledProjectBackText><StyledProjectBackLink href='http://band.guth.io'><FontAwesomeIcon size='4x' icon={faAngleRight as IconProp}></FontAwesomeIcon></StyledProjectBackLink></StyledProjectBack>}></Card>
          </FlexboxElement>
        </Flexbox>
        </StyledProjects>
    </>
  );
}

export { Skills }
