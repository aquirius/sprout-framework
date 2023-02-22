import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Snack } from '../../components/Snack';
import { json } from 'stream/consumers';
import { LightTheme } from '../../schema/color';
import { Button } from '../button/Button';


const StyledLoginForm = styled.div`
  max-width: 500px;
  background: linear-gradient(90deg, ${LightTheme.palette.light} 0%, transparent 100%);
  border-radius: 2.5rem;
  padding: 2rem 3rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; 
  margin:75px auto;
`;

const StyledLoginFormHeader = styled.div`
color: inherit;
`;

const StyledLoginFormContent = styled.form`
`;

const StyledLoginFormLabel = styled.label`
  white-space: nowrap;
`;

const StyledLoginFormInput = styled.input`
  width: 100%;
  padding: 1rem 2rem;
  margin: 0.5rem 0;
  box-sizing: border-box;
`;

const Login = () : ReactElement => {
  //initialize our form with empty states
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const nav = useNavigate();

  var cookie: string;
  var recipes: string[];
  var sessionIDRecipe: string | undefined;
  var uuidRecipe: string | undefined;
  var sessionID: string;
  var cookieUUID: string;

  const {register, handleSubmit, formState: {errors}} = useForm();

  cookie = document.cookie
  recipes = cookie.split('; ')

  sessionIDRecipe = recipes.find(row => row.startsWith('session-id='))
  uuidRecipe = recipes.find(row => row.startsWith('uuid='))

  if (sessionIDRecipe !== undefined){
    sessionID = sessionIDRecipe.split('=')[1];
  }

  if (uuidRecipe !== undefined && uuidRecipe !== ""){
    cookieUUID = uuidRecipe.split('=')[1];
  }

  //submit Handler submits our form with filled data
  //we fill out our user object with our useState hooks
  //we prevent default rendering, because we want to display a message
  const onSubmit = () => {
    const request = new Request("/login", {
      method: "post",
      body: JSON.stringify({
        display_name: displayName,
        password: password
      }),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Method": "login"
      }
    });

    fetch(request)
    .then(res => {
      setMessage(res.statusText)
      if(!res.ok){
        throw new Error(message);
      }
      setStatus(res.status)
      return res
    })
    .then(x => {
      var json = x.json()
      return json
    })
    .then(res => {
        console.log(res)
        nav("/user/"+res.uuid, {replace: true})
    }).catch(error => {
        console.log(error);
    });
  }

  return (
    <>
      <StyledLoginForm>
        <StyledLoginFormHeader>
          <h2>Login</h2>
        </StyledLoginFormHeader>
        <StyledLoginFormContent onSubmit={handleSubmit(onSubmit)}>
          <StyledLoginFormLabel>Display Name</StyledLoginFormLabel>
          <StyledLoginFormInput {...register("displayName", {required : true})} type={"text"} onChange={(e) => setDisplayName(e.target.value)}/>
          {errors.displayName && <p>Display name is required.</p>}
          <StyledLoginFormLabel>Password</StyledLoginFormLabel>
          <StyledLoginFormInput  {...register("password", {required : true})} type={"password"} onChange={(e) => setPassword(e.target.value)}/>
          {errors.password && <p>Password is required.</p>}
          <Button type={"submit"} content="submit"></Button>
        </StyledLoginFormContent>
        {message && <Snack danger message={message}/>}
      </StyledLoginForm>
    </>
  );
}

export { Login }
