
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div<{expand?: boolean}>`
    background-color: transparent;
    width: 300px;
    height: 300px;
    perspective: 1000px;
`;

const StyledCardContainer = styled.div<{expand? : boolean}>`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    ${(props) => props.expand ? "transform: rotateY(180deg)" : ""};
`;


const StyledCardFront = styled.div<{expand? : boolean}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: #f9f9f9;
    color: black;
`;

const StyledCardBack = styled.div<{expand? : boolean}>`
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background-color: #182848;
    color: white;
    transform: rotateY(180deg);
`;

interface CardProps {
    uuid?: string;
    childFront: ReactElement
    childBack: ReactElement
}

//User page does import our table component and is bound to our react routing system
const Card = ({ uuid, childFront, childBack }:CardProps) : ReactElement => {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [expand, setExpand] = useState(false)


  useEffect(() => {
    fetch("/user/"+uuid)
    .then((res) => res.json())
    .then((json) => setData(json.user))
    .finally(() => setLoading(false))
  }, [uuid, loading])

return (
    <>
    <StyledCard>
        <StyledCardContainer expand={expand} onClick={() => setExpand(!expand)}>
            <StyledCardFront>
                {childFront}
            </StyledCardFront>
            <StyledCardBack>
                {childBack}
            </StyledCardBack>
        </StyledCardContainer>
    </StyledCard>
    </>
);
}
  
  export { Card }

  