
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pots } from './Pots';
import { LightTheme } from '../schema/color';

const StyledStack = styled.div<{expand?: boolean, height?:number, width?:number}>`
    position: relative;
    background-color: ${LightTheme.palette.light};
    min-height: 75px;
    min-width: 150px;
    margin: 1rem;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

interface StackProps {
    uuid: number;
    guid: number;
    suid: number;
    onClick?: (event : any) => void
}

//User page does import our table component and is bound to our react routing system
const Stack = ({ uuid, guid, suid }:StackProps) : ReactElement => {

return (
    <>
    <StyledStack>
        <Pots onClick={() => {}} uuid={uuid} guid={guid} suid={suid}></Pots>
    </StyledStack>
    </>
);
}
  
  export { Stack }

  