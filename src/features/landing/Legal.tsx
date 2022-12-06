import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, GridElement } from '../../components/Grid';
import { Button } from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledLegal = styled.div`
    font-size: 1.5rem;
    display: grid;
    justify-items: center;
`;

const Legal = () : ReactElement => {
  //initialize with empty states

return (
    <> 
        <StyledLegal>
            legal
        </StyledLegal>
    </>
  );
}

export { Legal }
