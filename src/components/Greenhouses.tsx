import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
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
import { Sidebar } from './Sidebar';
import { GreenhouseSettings } from '../features/form/GreenhouseSettings';
import { Greenhouse } from './Greenhouse';


const StyledGreenhouseSettings = styled.div<{expand:boolean}>`
  position: absolute;
  top: 0px;
  transition:all 0.5s ease
`;

const StyledGreenhouses = styled.div`
`;

const StyledGreenhouse = styled.div`
  position: relative;
  margin: 2rem 0;
  &:hover ${StyledGreenhouseSettings}{
    top: -50px;
  }
`;
interface GreenhousesProps {
  uuid: number
}

//Button component draws us an html button with icon and size of the icon
const Greenhouses = ({uuid} : GreenhousesProps) : ReactElement => {
  const [messageFetch, setMessage] = useState("")
  const [guid, setGuid] = useState(0)

  const [loading, setLoading] = useState(false)
  const [sidebar, setSidebar] = useState(false)


  const nav = useNavigate();
  const getGreenhouse = useAPIGet("/user/"+uuid+"/greenhouse");
  const addGreenhouse = useAPIPost("/user/"+uuid+"/greenhouse", "add", {"payload" : {"UUID": uuid}});

  const onEditGreenhouse = (guid : any, event : React.MouseEvent) => {
    setSidebar(true)
    setGuid(guid)
    console.log(guid)
  }

  useEffect(() => {
    getGreenhouse.get()
    if (loading || !getGreenhouse.data){
      return
    }
    setMessage("200")
    setLoading(false)
  }, [addGreenhouse.postVersion])

  const onAddGreenhouse = () => {
    addGreenhouse.post()
    setLoading(true)
  }

  return (
    <>
    <StyledGreenhouse>
     <Flexbox align='center' direction='row' wrap='wrap'>
        {getGreenhouse.data && getGreenhouse.data.greenhouses.map((value : any, index : number) => {
          return (
            <div key={index}>
              <FlexboxElement align='flex-start' order={0} grow={0}>
              <StyledGreenhouse>
                <StyledGreenhouseSettings expand={true}>
                  <IconButton size='2x' icon={faPen as IconProp} onClick={(e) => onEditGreenhouse(value.GUID, e)}></IconButton>
                  {value.GUID}
                </StyledGreenhouseSettings>
                <Greenhouse uuid={uuid ? uuid : 0} guid={guid ? guid : 0}/>
                </StyledGreenhouse>
            </FlexboxElement>
            </div>
          );
        })}
      <GridElement position='b' align='center'>
        <IconButton size='2x' icon={faPlus as IconProp} onClick={() => onAddGreenhouse()}></IconButton>
      </GridElement>
        </Flexbox>
    </StyledGreenhouse>
    <Sidebar onClick={() => setSidebar(!sidebar)} expand={sidebar}>
        <GreenhouseSettings guid={guid}></GreenhouseSettings>
    </Sidebar>
    </>
  );
}


export { Greenhouses }
