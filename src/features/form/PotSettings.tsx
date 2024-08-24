import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Snack } from '../../components/Snack';
import { useAPIPost } from '../../api/api';
import { LightTheme } from '../../schema/color';
import { Button } from '../button/Button';


interface PotSettingsProps {
    uuid?: number
    guid?: number
    suid?: number
    puid?: number
  }

const StyledPotSettingsForm = styled.div`
  max-width: 500px;
  background: linear-gradient(90deg, #f9f9f9 0%, transparent 100%);
  border-radius: 25px;
  padding: 2rem 3rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; 
  margin:10vh auto;
`;

const StyledPotSettingsFormHeader = styled.div`
color: inherit;
`;

const StyledPotSettingsFormContent = styled.form`
`;

const StyledPotSettingsFormLabel = styled.label`
  white-space: nowrap;
`;

const StyledPotSettingsFormInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

const PotSettings = ({uuid, guid, suid, puid} : PotSettingsProps) : ReactElement => {
  //initialize our form with empty states
  const {register, handleSubmit, formState: {errors}} = useForm();
  const state = {
    "PUID" :"",
  }
  const [data, setData] = useState(state)
  const [loading, setLoading] = useState(false)

  const addPlant = useAPIPost("", "post", {});

  const postPotSettings = useAPIPost("/user/"+uuid+"/greenhouse/"+guid+"/stack/"+suid+"/pot/"+puid, "", {});

  const onSubmit = (data: any) => {
    postPotSettings.post({"payload" : 
    {
      "uuid": uuid,
      "guid": guid,
      "suid": suid,
      "puid": puid
    }}, "/user/"+uuid+"/greenhouse/"+guid+"/stack/"+suid+"/pot/"+puid, );
  }


  return (
    <>
      <StyledPotSettingsForm>
        <StyledPotSettingsFormHeader>
          <h2>PotSettings</h2>
        </StyledPotSettingsFormHeader>
        <StyledPotSettingsFormContent onSubmit={handleSubmit(onSubmit)}>
          <StyledPotSettingsFormLabel>Display Name</StyledPotSettingsFormLabel>
          {puid}
          <StyledPotSettingsFormInput placeholder={"puid"} {...register("PUID")} type={"text"} onChange={(e) => {}}/>
          {errors.displayName && <p>Display name is required.</p>}
          <Button onClick={() => addPlant.post({"payload" : {"puid": puid}}, "/user/"+uuid+"/greenhouse/"+guid+"/stack/"+suid+"/pot/" + puid + "/plant")} content='submit'></Button>
        </StyledPotSettingsFormContent>
      </StyledPotSettingsForm>
    </>
  );
}
export { PotSettings }
