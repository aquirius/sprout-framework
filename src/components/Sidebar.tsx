
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledSidebar = styled.div<{expand?: boolean, height?:number, width?:number}>`
    position: fixed;
    background-color: #f9f9f9;
    ${(props) => props.expand ? "right: 0%" : "right: -100%"};
    top: 0%;
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
    height: 100vh;
    width: 50vw;
    min-width: 300px;
    transition: all 0.5s ease;
    backdrop-filter: blur(7px);
`;

interface SidebarProps {
    children: ReactElement;
    expand: boolean;
    onClick? : (event : any) => void
    onStacks? : (event : any) => void

}

//User page does import our table component and is bound to our react routing system
const Sidebar = ({ children, expand, onClick, onStacks }: SidebarProps) : ReactElement => {    
    console.log(onStacks)
return (
    <>
    <StyledSidebarBlur expand={expand} onClick={onClick}></StyledSidebarBlur>
    <StyledSidebar expand={expand} onClick={onClick}>
        {children}
    </StyledSidebar>
    </>
);
}
  
  export { Sidebar }

  