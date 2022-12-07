import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, GridElement } from '../../components/Grid';
import { Button } from '../button/Button';

const StyledContact = styled.div`
    background:black;
    height: 100%;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: 1s all ease;
    padding: 4rem;
    &:hover{
        background: white;
    }
`;

const StyledContactLink = styled.a`
    text-decoration: none;
    color: white;
    font-size: 5rem;
    border: 1px solid white;
    text-align:center;
    transition: 1s all ease;
    &:hover{
        text-decoration: none;
        color: black;
        border: 1px solid black;

    }
`;

const Contact = () : ReactElement => {
  //initialize with empty states

return (
    <> 
        <StyledContact>
            <Grid layout={"100vw"} dimension={"'a'"} >
                <GridElement position='a' align={"center"}>
                <StyledContactLink href='mailto:maxi.guth@gmx.net'>
                    Contact
                </StyledContactLink>
                </GridElement>
            </Grid>
        </StyledContact>
    </>
  );
}

export { Contact }
