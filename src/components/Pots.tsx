import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPen, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAPIGet, useAPIPost } from '../api/api';
import { Button } from '../features/button/Button';
import { Flexbox, FlexboxElement } from './Flexbox';
import { Grid, GridElement } from './Grid';
import { Pot } from './Pot';
import { IconButton } from '../features/button/IconButton';

const StyledAddPotButton = styled.div`
  align-self: center;
`;

interface PotsProps {
  uuid?: number
  guid?: number
  suid?: number
  onClick: (event : any) => void
}

interface PotsProps {
}

//Button component draws us an html button with icon and size of the icon
const Pots = ({uuid, guid, suid, onClick} : PotsProps) : ReactElement => {
  const [loading, setLoading] = useState(false)
  const nav = useNavigate();

  const getPots = useAPIPost("/user/"+uuid+"/greenhouse/"+guid+"/get-pots", "add", {"payload" : {"suid": suid}});
  const addPots = useAPIPost("/user/"+uuid+"/greenhouse/"+guid+"/add-pot", "add", {"payload" : {"suid": suid}});

  const onAddPot = () => {
    addPots.post()
    setLoading(true)
  }

  const onEditStack = () => {
    setLoading(true)
  }

  useEffect(() => {
    getPots.post()
    if (loading || !getPots.postData){
      return
    }
    setLoading(false)
  }, [addPots.postVersion, loading])

  var water = 100;
  var fertilizer = 100;

  return (
    <>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='a'>
        <Flexbox align='center' direction='row' wrap='wrap'>
        {getPots.postData && getPots.postData.pots.map((value : any, index : number) => {
        return (
          <div key={index}>
            <FlexboxElement align='flex-start' order={0} grow={0}>
              <Pot onClick={onClick} water={water} fertilizer={fertilizer} childFront={<>{value.SUID}</>} childBack={<><IconButton size='2x' icon={faPlus as IconProp} onClick={() => console.log("dfd")}></IconButton></>}/>
          </FlexboxElement>
          </div>
        );
      })}
        </Flexbox>
      </GridElement>
      <GridElement position='b' align='center'>
        <IconButton size='4x' icon={faPlus as IconProp} onClick={() => onAddPot()}></IconButton>
        <IconButton size='3x' icon={faPen as IconProp} onClick={() => onEditStack()}></IconButton>
      </GridElement>
    </Grid>
        

    </>
  );
}

export { Pots }
