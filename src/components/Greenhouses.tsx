import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAPIGet, useAPIPost } from '../api/api';
import { Button } from '../features/button/Button';
import { Card } from './Card';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Snack } from './Snack';
import { IconButton } from '../features/button/IconButton';

const StyledGreenhouse = styled.div`
`;

interface GreenhousesProps {
  uuid: number
}

//Button component draws us an html button with icon and size of the icon
const Greenhouses = ({uuid} : GreenhousesProps) : ReactElement => {
  const [messageFetch, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const nav = useNavigate();
  const getGreenhouse = useAPIGet("/user/"+uuid+"/greenhouse");
  const {postVersion, postSuccess, postBusy, data, post} = useAPIPost("/user/"+uuid+"/greenhouse", "add", {"payload" : {"UUID": uuid}});

  useEffect(() => {
    getGreenhouse.get()
    if (loading || !postSuccess || postBusy || !data){
      return
    }
    setMessage("200")
    setLoading(false)
  }, [postVersion])

  const onAddGreenhouse = () => {
    post()
    setLoading(true)
  }

  return (
    <StyledGreenhouse>
     <Flexbox align='center' direction='row' wrap='wrap'>
        {getGreenhouse.data && Object.keys(getGreenhouse.data.greenhouses).map((key, index) => {
          return (
            <div key={index}>
              <FlexboxElement align='flex-start' order={0} grow={0}>
                <Card 
                  childFront={<><IconButton icon={faBuilding as IconProp} onClick={() => nav("/user/"+uuid+"/greenhouse/"+getGreenhouse.data.greenhouses[index].GUID)}></IconButton></>}
                  childBack={<>{getGreenhouse.data.greenhouses[index].Address} : {getGreenhouse.data.greenhouses[index].Zip}</>}
                />
            </FlexboxElement>
            </div>
          );
        })}
          <FlexboxElement align='auto' order={1} grow={0}>
              <Card childFront={<><IconButton icon={faPlus as IconProp} onClick={() => onAddGreenhouse()}></IconButton></>} childBack={<>asfdsa</>}></Card>
          </FlexboxElement>
        </Flexbox>
    </StyledGreenhouse>
  );
}

export { Greenhouses }
