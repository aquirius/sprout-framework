import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAPIGet } from '../api/api';
import { LightTheme } from '../schema/color';
import { Stacks } from './Stacks';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHouse, faSeedling, faXmark } from '@fortawesome/free-solid-svg-icons';

const StyledGreenhouse = styled.div`
  position: relative;
  background-color: ${LightTheme.palette.light};
  min-height: 300px;
  min-width: 300px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

interface GreenhouseProps {
  uuid?: number
  guid?: number
  children?: React.ReactNode
  onClick?: (event : any) => void
}

interface GetGreenhouseProps {
  GUID: number;
  Address: string;
  Zip: number;
}

//Button component draws us an html button with icon and size of the icon
const Greenhouse = ({uuid, guid, onClick} : GreenhouseProps) : ReactElement => {

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const nav = useNavigate()

  const getGreenhouse = useAPIGet("/user/"+uuid+"/greenhouse/"+guid);

  useEffect(() => {
    getGreenhouse.get()
    if (loading || !getGreenhouse.data){
      return
    }
    setMessage("200")
    setLoading(false)
  }, [])

  return (
    <StyledGreenhouse onClick={onClick}>
      {getGreenhouse.data && (
        <>
        {getGreenhouse.data.greenhouse.Type === "indoor" ?
          <FontAwesomeIcon onClick={() => nav("/user/"+uuid+"/greenhouses")} size='1x' icon={faHouse as IconProp}/> : 
          <FontAwesomeIcon onClick={() => nav("/user/"+uuid+"/greenhouses")} size='1x' icon={faSeedling as IconProp}/>}
         {getGreenhouse.data.greenhouse.Status === "active" ?
          <FontAwesomeIcon onClick={() => nav("/user/"+uuid+"/greenhouses")} size='1x' icon={faCheck as IconProp}/> : 
          <FontAwesomeIcon onClick={() => nav("/user/"+uuid+"/greenhouses")} size='1x' icon={faXmark as IconProp}/>}
        </>
      )}
      <Stacks uuid={uuid} guid={guid} onClick={() => {}}></Stacks>
    </StyledGreenhouse>
  );
}

export { Greenhouse }
