import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, GridElement } from '../../components/Grid';
import { Button } from '../button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from '../../components/Card';
import { Flexbox, FlexboxElement } from '../../components/Flexbox';

const StyledProjects = styled.div`
    background: white;
    height: 100vh;
    z-index:1;
`;

const Skills = () : ReactElement => {
  //initialize with empty states

return (
    <> 
        <StyledProjects>
        <Flexbox direction='row' wrap='wrap'>
          <FlexboxElement align='flex-start' order={1} grow={0}>
            <Card childFront={<>asdfsadf</>} childBack={<>asfdsa</>}></Card>
          </FlexboxElement>
          <FlexboxElement align='flex-start' order={1} grow={0}>
            <Card childFront={<>asdfsadf</>} childBack={<>asfdsa</>}></Card>
          </FlexboxElement>
          <FlexboxElement align='flex-start' order={1} grow={0}>
            <Card childFront={<>asdfsadf</>} childBack={<>asfdsa</>}></Card>
          </FlexboxElement>
          <FlexboxElement align='flex-start' order={1} grow={0}>
            <Card childFront={<>asdfsadf</>} childBack={<>asfdsa</>}></Card>
          </FlexboxElement>
        </Flexbox>
        </StyledProjects>
    </>
  );
}

export { Skills }
