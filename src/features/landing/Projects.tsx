import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledProjects = styled.div`
    background: url("me.jpeg");
    height: 60vh;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const Projects = () : ReactElement => {
  //initialize with empty states

return (
    <> 
        <StyledProjects>
        </StyledProjects>
    </>
  );
}

export { Projects }
