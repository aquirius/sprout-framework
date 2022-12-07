import React, {ReactElement, ReactNode} from 'react';
import styled from 'styled-components';

interface FlexboxProps {
    direction: string;
    wrap: string;
    align: string;
    children: ReactNode;
}

const StyledFlexbox = styled.div<{direction : string, wrap : string, align : string}>`
    display:flex;
    flex-direction: ${(props) => props.direction};
    flex-wrap: ${(props) => props.wrap};
    justify-content: ${(props) => props.align};
`;


interface FlexboxElementProps {
    order: number;
    grow: number;
    align: string;
    children: ReactNode;
}

const StyledFlexboxItem = styled.div<{order : number, grow : number, align : string}>`
    display:flex;
    order: ${(props) => props.order};
    flex-grow: ${(props) => props.grow};
    align-self: ${(props) => props.align};
    margin: 0.5rem;

`;

const Flexbox = ({align, direction, wrap, children } : FlexboxProps) : ReactElement => {
    return (<StyledFlexbox align={align} direction={direction} wrap={wrap}>{children}</StyledFlexbox>)
}

const FlexboxElement = ({order, grow, align, children } : FlexboxElementProps) : ReactElement => {
    return (<StyledFlexboxItem order={order} grow={grow} align={align}>{children}</StyledFlexboxItem>)
}

export {Flexbox, FlexboxElement}