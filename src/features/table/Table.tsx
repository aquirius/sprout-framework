import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledTable = styled.div`
  width: 100%;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  background: lightgrey;
  flex-wrap: wrap;
`;

const StyledRow = styled.div`
  display: flex;
`;

const StyledContent = styled.div`
  flex: 1;
  border: 1px solid black;
`;


const StyledColumn = styled.div`
  flex: 1;
  border: 1px solid black;
`;

interface TableProps {
  start? : number
}

const Table = ({start} : TableProps) : ReactElement => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch("http://127.0.0.1:3006/users")
    .then((res) => res.json())
    .then((data) => setData(data.rows));
  }, [])

  return (
    <>
      <StyledTable>
        <StyledHeader>
          {data && data[0] && Object.keys(data[0]).map((key) =>{
          return (
            <>
              <StyledColumn>{key}</StyledColumn>
            </>
          );
        })}
        </StyledHeader>
        <StyledContent>
        {data && data.map(({uuid, display_name, email, user_first_name, user_last_name, birthday}) =>{
          return (
            <>
            <StyledRow>
              <StyledColumn>{uuid}</StyledColumn>
              <StyledColumn>{display_name}</StyledColumn>
              <StyledColumn>{user_first_name}</StyledColumn>
              <StyledColumn>{user_last_name}</StyledColumn>
              <StyledColumn>{email}</StyledColumn>
              <StyledColumn>{birthday}</StyledColumn>
            </StyledRow>
            </>
          );
        })}
        </StyledContent>
      </StyledTable>
    </>
  );
}

export { Table }
