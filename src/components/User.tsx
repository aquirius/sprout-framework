import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Snack } from './Snack';

const StyledUser = styled.div`
`;

interface ButtonProps {
  uuid?: string
}

//Button component draws us an html button with icon and size of the icon
const User = ({uuid} : ButtonProps) : ReactElement => {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")


  useEffect(() => {
    fetch("/user/"+uuid)
    .then((res) => {
      setMessage(res.statusText)
      return res.json()})
    .then((json) => setData(json.user))
    .finally(() => setLoading(false))
  }, [uuid, loading])

  return (
    <>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox direction='row' wrap='wrap'>
          <FlexboxElement align='flex-start' order={0} grow={0}>
            <Card uuid={uuid}/>
          </FlexboxElement>
            <FlexboxElement align='auto' order={1} grow={0}>
              <Card uuid={uuid}></Card>
          </FlexboxElement>
          <FlexboxElement align='auto' order={1} grow={0}>
              <Card uuid={uuid}></Card>
          </FlexboxElement>
          <FlexboxElement align='auto' order={1} grow={0}>
              <Card uuid={uuid}></Card>
          </FlexboxElement>
          <FlexboxElement align='auto' order={1} grow={0}>
              <Card uuid={uuid}></Card>
          </FlexboxElement>
          <FlexboxElement align='auto' order={1} grow={0}>
              <Card uuid={uuid}></Card>
          </FlexboxElement>
          <FlexboxElement align='auto' order={1} grow={0}>
              <Card uuid={uuid}></Card>
          </FlexboxElement>
          <FlexboxElement align='auto' order={1} grow={0}>
              <Card uuid={uuid}></Card>
          </FlexboxElement>
          <FlexboxElement align='flex-end' order={2} grow={0}>
            <Card uuid={uuid}></Card>
          </FlexboxElement>
        </Flexbox>
      </GridElement>
      <GridElement position='b'>
        <Snack danger message={message}></Snack>
      </GridElement>
    </Grid>
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
