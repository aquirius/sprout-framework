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

const StyledPots = styled.div`
`;

interface PotsProps {
  uuid?: number
  guid?: number
}

interface PotsProps {
}

//Button component draws us an html button with icon and size of the icon
const Pots = ({uuid, guid} : PotsProps) : ReactElement => {

  const [data, setData] = useState<any>()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [PotsUUID, setPotsUUID] = useState(0);
  const [stackUUID, setStackUUID] = useState(0);
  const nav = useNavigate();

  //build our request
  const getPots = new Request("/user/"+uuid+"/Pots/"+guid+"/get-pots", {
    method: "post",
    body: JSON.stringify({
      SUID: stackUUID,
    }),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Method": "add"
    }
  });

  useEffect(()=> {
    fetch(getPots).then(res => {
      console.log(res)
        setMessage(res.statusText)
        if(!res.ok){
          throw new Error(message);
        }
        if (res.status === 200) {
            return res.json()
        }
    }).then((json) => {

      console.log(json, stackUUID)
      setData(json.pots)
    }).catch(error => {
        console.log(error);
    });
  },[])

  const onSubmitPot = (stack:number) => {
       //build our request
   const addPot = new Request("/user/"+uuid+"/Pots/"+guid+"/add-pot", {
    method: "post",
    body: JSON.stringify({
      UUID: uuid,
      SUID: stack
    }),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Method": "add"
    }
  });
    fetch(addPot).then(res => {
      console.log(res)
        setMessage(res.statusText)
        if(!res.ok){
          throw new Error(message);
        }
        if (res.status === 200) {
            return res.json()
        }
    }).then((json) => {
      setData(json.pots)
    }).catch(error => {
        console.log(error);
    });
  }

  return (
    <>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
        {data && data.map((value : any, index : number) => {
        return (
          <div key={index}>
            <FlexboxElement align='flex-start' order={0} grow={0}>
              <Card childFront={<>{value.SUID}</>} childBack={<><Button icon={faPlus as IconProp} onClick={() => onSubmitPot(value.SUID)}></Button></>}/>
          </FlexboxElement>
          </div>
        );
      })}
        </Flexbox>
      </GridElement>
      <GridElement position='b'>
        <Snack danger message={message}></Snack>
      </GridElement>
    </Grid>
        

    </>
  );
}

export { Pots }
