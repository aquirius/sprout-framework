import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, GridElement } from '../../components/Grid';
import { Button } from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledProjects = styled.div`
    background: transparent;
    height: 100vh;
`;

const Skills = () : ReactElement => {
  //initialize with empty states

return (
    <> 
        <StyledProjects>
        </StyledProjects>
    </>
  );
}

export { Skills }
