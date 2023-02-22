
import exp from 'constants';
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LightTheme } from '../schema/color';

const StyledSidebar = styled.div<{expand?: boolean, height?:number, width?:number}>`
    position: fixed;
    background-color: ${LightTheme.palette.light};
    ${(props) => props.expand ? "right: 0%" : "right: -100%"};
    top: 0%;
    z-index: 9999;
    height: 100vh;
    width: 50vw;
    min-width: 300px;
    transition: all 0.5s ease;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const StyledSidebarBlur = styled.div<{expand?: boolean}>`
    position: fixed;
    background-color: transparent;
    ${(props) => props.expand ? "left: 0%" : "left: -100%"};
    top: 0%;
    z-index: 9999;
    height: 100vh;
    width: 50vw;
    min-width: 300px;
    transition: all 0.5s ease;
    backdrop-filter: blur(7px);
`;

interface SidebarProps {
    children: ReactElement;
    expand: boolean;
    onClick: () => void;
}

//User page does import our table component and is bound to our react routing system
const Sidebar = ({ children, expand, onClick }: SidebarProps) : ReactElement => {    

return (
    <>
    <StyledSidebarBlur onClick={onClick} expand={expand}></StyledSidebarBlur>
    <StyledSidebar expand={expand}>
        {children}
    </StyledSidebar>
    </>
);
}
  
  export { Sidebar }

  