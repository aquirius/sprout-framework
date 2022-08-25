import React, {ReactElement, ReactNode} from 'react';
import styled from 'styled-components';

interface GridProps {
    dimension: string;
    layout: string;
    children: ReactNode;
}

const StyledGrid = styled.div<{dimension : string, layout : string}>`
    display:grid;
    grid-gap: 1rem;
    grid-template-columns: ${(props) => props.layout};
    grid-template-areas: ${(props) => props.dimension};
    align-content:center;
    align-items:start;
    background: transparent;
`;



const Grid = ({dimension, layout, children } : GridProps) : ReactElement => {
    return (
        <>
        <StyledGrid layout={layout} dimension={dimension}>{children}</StyledGrid>
        </>
    );
}

const StyledGridElement = styled.div<{position : string}>`
    grid-area: ${(props) => props.position};
    grid-row-start: auto;
    grid-row-end: auto;
`;


interface GridElementProps {
    position: string;
    children: ReactNode;
}

const GridElement = ({position,children } : GridElementProps) : ReactElement => {
    return (
        <StyledGridElement position={position}>{children}</StyledGridElement>
    );
}

export {Grid, GridElement}