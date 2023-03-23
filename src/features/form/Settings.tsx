import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Snack } from '../../components/Snack';
import { LightTheme } from '../../schema/color';
import { Button } from '../button/Button';
import { useAPIPut } from '../../api/api';


interface SettingsProps {
    uuid?: string
  }

const StyledSettingsForm = styled.div`
  max-width: 500px;
  background: linear-gradient(90deg, #f9f9f9 0%, transparent 100%);
  border-radius: 25px;
  padding: 2rem 3rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; 
  margin:10vh auto;
`;

const StyledSettingsFormHeader = styled.div`
color: inherit;
`;

const StyledSettingsFormContent = styled.form`
`;

const StyledSettingsFormLabel = styled.label`
  white-space: nowrap;
`;

const StyledSettingsFormInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

const Settings = ({uuid} : SettingsProps) : ReactElement => {
  //initialize our form with empty states
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  const {register, handleSubmit, formState: {errors}} = useForm();
  const state = {
    "uuid": uuid,
    "display_name" :"",
    "first_name" :"",
    "last_name" :"",
    "email" :""
  }
  const [data, setData] = useState(state)
  const [loading, setLoading] = useState(false)
  const editUser = useAPIPut("/users", "put", payload)


  var cookie: string;
  var recipes: string[];
  var sessionIDRecipe: string | undefined;
  var payload: any;
  cookie = document.cookie
  recipes = cookie.split('; ')

  sessionIDRecipe = recipes.find(row => row.startsWith('session-id='))

  if (!uuid) {
    nav("/login", {replace: true})
  }
  if (typeof sessionIDRecipe === 'undefined' || sessionIDRecipe === '' ){
    nav("/login", {replace: true})
  }

  useEffect(() => {    
    fetch("/user/"+uuid)
    .then((res) => {
      setMessage(res.statusText)
      if(res.status === 401){
        throw new Error(res.statusText);
      }
      return res.json()
    })
    .then((json) => setData(json.user))
    .catch(() => nav("/login", {replace: true}))
    .finally(() => setLoading(false))
  }, [uuid, loading])



  const useSettings = function(){
    if(!displayName && !firstName && !lastName && !email){
      return 
    }

    payload = {"payload": {
      "uuid": uuid,
      "display_name": displayName,
      "first_name":firstName,
      "last_name":lastName,
      "email": email
    }}


    setLoading(true)

    nav("/user/"+uuid)
  }

  //edit Handler calls our backend with edited data
  //our db updates the user with given uuid
  //we set our loading to true and let our useEffect hook change is as soon as it is done fetching our modified user list again
  const handleEdit = () => {
    //return empty request
    if(!displayName && !firstName && !lastName && !email){
      return 
    }

    payload = {"payload": {
      "uuid": uuid,
      "display_name": displayName,
      "first_name":firstName,
      "last_name":lastName,
      "email": email
    }}

    console.log(editUser.putPayload)
    editUser.put()

    nav("/user/"+uuid)
  }

  return (
    <>
      <StyledSettingsForm>
        <StyledSettingsFormHeader>
          <h2>Settings</h2>
        </StyledSettingsFormHeader>
        <StyledSettingsFormContent onSubmit={handleSubmit(handleEdit)}>
          <StyledSettingsFormLabel>Display Name</StyledSettingsFormLabel>
          <StyledSettingsFormInput placeholder={data && data["display_name"]} {...register("displayName")} type={"text"} onChange={(e) => setDisplayName(e.target.value)}/>
          {errors.displayName && <p>Display name is required.</p>}

          <StyledSettingsFormLabel>First Name</StyledSettingsFormLabel>
          <StyledSettingsFormInput placeholder={data && data["first_name"]} {...register("firstName")} type={"text"} onChange={(e) => setFirstName(e.target.value)}/>
          {errors.firstName && <p>First Name is required.</p>}

          <StyledSettingsFormLabel>Last Name</StyledSettingsFormLabel>
          <StyledSettingsFormInput placeholder={data && data["last_name"]} {...register("lastName")} type={"text"} onChange={(e) => setLastName(e.target.value)}/>
          {errors.lastName && <p>Last name is required.</p>}

          <StyledSettingsFormLabel>Email</StyledSettingsFormLabel>
          <StyledSettingsFormInput placeholder={data && data["email"]} {...register("email")} type={"email"} onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && <p>Email is required.</p>}

          <StyledSettingsFormLabel>Password</StyledSettingsFormLabel>
          <StyledSettingsFormInput {...register("password")} type={"password"} onChange={(e) => setPassword(e.target.value)}/>
          {errors.password && <p>Password is required.</p>}

          <StyledSettingsFormLabel>Repeat password</StyledSettingsFormLabel>
          <StyledSettingsFormInput {...register("repeatPassword")} type={"password"} onChange={(e) => setRepeatPassword(e.target.value)}/>
          {errors.repeatPassword && <p>Repeat password is required.</p>}
          <Button type={"submit"} content='submit'></Button>
        </StyledSettingsFormContent>
        {message && <Snack danger message={message}/>}
      </StyledSettingsForm>
    </>
  );
}
export { Settings }
