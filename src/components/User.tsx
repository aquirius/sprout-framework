import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledUser = styled.div`
`;

interface ButtonProps {
  uuid?: string
}

//Button component draws us an html button with icon and size of the icon
const User = ({uuid} : ButtonProps) : ReactElement => {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/user/"+uuid)
    .then((res) => res.json())
    .then((json) => setData(json.user))
    .finally(() => setLoading(false))
  }, [uuid, loading])

  return (
    <>
        <h2>{data ? uuid : "404"}</h2>
        {data && Object.keys(data).map((key, index) => {
        return (
          <div key={index}>
            <h2>
              {key}: {data[key]}
            </h2>
          </div>
        );
      })}

    </>
  );
}

export { User }
