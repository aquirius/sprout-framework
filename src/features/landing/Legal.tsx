import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, GridElement } from '../../components/Grid';
import { Button } from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const StyledLegal = styled.div`
    font-size: 1.5rem;
    display: grid;
    justify-items: center;
`;

const Legal = () : ReactElement => {
  //initialize with empty states
    const nav = useNavigate()
return (
    <StyledLegal onClick={() => nav("/impressum")}>
        legal
    </StyledLegal>
  );
}

export { Legal }
