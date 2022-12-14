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
  suid?: number
}

interface PotsProps {
}

//Button component draws us an html button with icon and size of the icon
const Pots = ({uuid, guid, suid} : PotsProps) : ReactElement => {

  const [data, setData] = useState<any>()

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [PotsUUID, setPotsUUID] = useState(0);
  const [stackUUID, setStackUUID] = useState(0);
  const nav = useNavigate();

  //build our request
  const getPots = new Request("/user/"+uuid+"/greenhouse/"+guid+"/get-pots", {
    method: "post",
    body: JSON.stringify({
      suid: suid,
    }),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Method": "add"
    }
  });

  const onAddPot = () => {
    const addPot = new Request("/user/"+uuid+"/greenhouse/"+guid+"/add-pot", {
      method: "post",
      body: JSON.stringify({
        suid: suid,
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
      console.log(json)
    }).catch(error => {
        console.log(error);
    });
  }

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
      setLoading(false)
    }).catch(error => {
        console.log(error);
    });
  }, [suid, uuid, guid])

  return (
    <>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
          <h1>pots</h1>
        {data && data.map((value : any, index : number) => {
        return (
          <div key={index}>
            <FlexboxElement align='flex-start' order={0} grow={0}>
              <Card height={100} width={100} childFront={<>{value.SUID}</>} childBack={<><Button icon={faPlus as IconProp} onClick={() => console.log("dfd")}></Button></>}/>
          </FlexboxElement>
          </div>
        );
      })}
        </Flexbox>
      </GridElement>
      <GridElement position='b'>
        <Button icon={faPlus as IconProp} onClick={onAddPot}></Button>
      </GridElement>
    </Grid>
        

    </>
  );
}

export { Pots }
