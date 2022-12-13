import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../features/button/Button';
import { Card } from './Card';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Snack } from './Snack';

const StyledUser = styled.div`
`;

interface PlantsProps {
  uuid?: string
}

interface GreenhouseProps {
}

//Button component draws us an html button with icon and size of the icon
const Plants = ({uuid} : PlantsProps) : ReactElement => {

  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [greenhouseUUID, setGreenhouseUUID] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    fetch("/user/"+uuid+"/greenhouse")
    .then((res) => {
      setMessage(res.statusText)
      return res.json()})
    .then((json) => {
      console.log(json)
      setData(json.greenhouse)
    })
    .finally(() => setLoading(false))
  }, [uuid, loading])

  //build our request
  const request = new Request("/user/"+uuid+"/greenhouse", {
    method: "post",
    body: JSON.stringify({
      UUID: uuid
    }),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Method": "add"
    }
  });


  //submit Handler submits our form with filled data
  //we fill out our user object with our useState hooks
  //we prevent default rendering, because we want to display a message
  const onSubmit = () => {
    fetch(request).then(res => {
      console.log(res)
        setMessage(res.statusText)
        if(!res.ok){
          throw new Error(message);
        }
        if (res.status === 200) {
            return res.json()
        }
    }).then((json) => {
      setGreenhouseUUID(json.greenhouse.guid)
      nav("/user/"+uuid+"/greenhouse/"+json.greenhouse.guid)
    }).catch(error => {
        console.log(error);
    });
  }

  return (
    <>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
        {data && Object.keys(data).map((key, index) => {
        return (
          <div key={index}>
            <FlexboxElement align='flex-start' order={0} grow={0}>
              <Card childFront={<>{data[key].GUID}</>} childBack={<>{data[key].Address} : {data[key].Zip}</>}/>
          </FlexboxElement>
          </div>
        );
      })}
          
          <FlexboxElement align='auto' order={1} grow={0}>
              <Card childFront={<><Button icon={faPlus as IconProp} onClick={onSubmit}></Button></>} childBack={<>asfdsa</>}></Card>
          </FlexboxElement>
        </Flexbox>
      </GridElement>
      <GridElement position='b'>
        <Snack danger message={message}></Snack>
      </GridElement>
    </Grid>
        

    </>
  );
}

export { Plants }
