import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAPIPost } from '../api/api';
import { Button } from '../features/button/Button';
import { Card } from './Card';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Snack } from './Snack';

const StyledGreenhouse = styled.div`
`;

interface GreenhousesProps {
  uuid: number
}

//TODO api interfaces in new folder /api for each system
interface GreenhouseAPI {
  GUID: number;
  Address: string;
  Zip: number;
}

interface Greenhouses {
  message: string
  greenhouses : GreenhouseAPI[]
  get: () => void
}

const useGreenhouses = (uuid : number) => {
    const [greenhouses, setGreenhouses] = useState<Array<GreenhouseAPI>>()
    const [message, setMessage] = useState("")

    var get = useCallback(() => {
      fetch("/user/"+uuid+"/greenhouse")
      .then((res) => {
        setMessage(res.statusText)
        return res.json()})
      .then((json) => {
        setGreenhouses(json.greenhouses)
      })
  }, [])

    return {
      message,
      greenhouses,
      get:get
    }
};

//Button component draws us an html button with icon and size of the icon
const Greenhouses = ({uuid} : GreenhousesProps) : ReactElement => {

  const [greenhousesState, setGreenhousesState] = useState<any>()
  const [messageFetch, setMessage] = useState("")

  const [loading, setLoading] = useState(false)
  const [guid, setGUID] = useState(0)

  const nav = useNavigate();
  const {message, greenhouses, get} = useGreenhouses(uuid);
  const {version, success, busy, data, post} = useAPIPost("/user/"+uuid+"/greenhouse", "add", {"payload" : {"UUID": uuid}});

  useEffect(() => {
    get()
    if (loading || !success || busy || !data){
      return
    }
    setGreenhousesState(greenhouses)
    setMessage(message)
    setLoading(false)
  }, [version])

  const onAddGreenhouse = () => {
    console.log("add")
    post()
    setLoading(true)
  }

  return (
    <>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
        {greenhouses && Object.keys(greenhouses).map((key, index) => {
          return (
            <div key={index}>
              <FlexboxElement align='flex-start' order={0} grow={0}>
                <Card childFront={<><Button icon={faBuilding as IconProp} onClick={() => nav("/user/"+uuid+"/greenhouse/"+greenhouses[index].GUID)}></Button></>} childBack={<>{greenhouses[index].Address} : {greenhouses[index].Zip}</>}/>
            </FlexboxElement>
            </div>
          );
        })}
          <FlexboxElement align='auto' order={1} grow={0}>
              <Card childFront={<><Button icon={faPlus as IconProp} onClick={() => onAddGreenhouse()}></Button></>} childBack={<>asfdsa</>}></Card>
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

export { Greenhouses }
