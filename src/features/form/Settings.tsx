import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Snack } from '../../components/Snack';


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

const StyledSettingsFormSubmit = styled.button`
  background: #63ac20;
  color: white;
  padding: 1rem 2rem;
  font-size: 2re m;
  border-radius: 4px;
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
    "DisplayName" :"",
    "FirstName" :"",
    "LastName" :"",
    "Email" :""
  }
  const [data, setData] = useState(state)
  const [loading, setLoading] = useState(false)

  var cookie: string;
  var recipes: string[];
  var sessionIDRecipe: string | undefined;
  cookie = document.cookie
  recipes = cookie.split('; ')

  sessionIDRecipe = recipes.find(row => row.startsWith('session-id='))

  useEffect(() => {
    if (typeof sessionIDRecipe === 'undefined'){
        nav("/login", {replace: true})
        return
    }
    
    fetch("/user/"+uuid)
    .then((res) => {
      setMessage(res.statusText)
      return res.json()
    })
    .then((json) => setData(json.user))
    .finally(() => setLoading(false))
  }, [uuid, loading])

  //edit Handler calls our backend with edited data
  //our db updates the user with given uuid
  //we set our loading to true and let our useEffect hook change is as soon as it is done fetching our modified user list again
  const handleEdit = () => {
    //return empty request
    if(!displayName && !firstName && !lastName && !email){
      return 
    }

    setLoading(true)
    const request = new Request("/users", {
        method: "put",
        body: JSON.stringify({
          uuid: uuid,
          displayName: displayName,
          firstName: firstName,
          lastName: lastName,
          email: email
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request).then(res => {
        if (res.status === 200) {
            nav("/user/"+uuid)
            return
        }
    }).catch(error => {
        console.log(error);
    });
  }

  return (
    <>
      <StyledSettingsForm>
        <StyledSettingsFormHeader>
          <h2>Settings</h2>
        </StyledSettingsFormHeader>
        <StyledSettingsFormContent onSubmit={handleSubmit(handleEdit)}>
          <StyledSettingsFormLabel>Display Name</StyledSettingsFormLabel>
          <StyledSettingsFormInput placeholder={data && data["DisplayName"]} {...register("displayName")} type={"text"} onChange={(e) => setDisplayName(e.target.value)}/>
          {errors.displayName && <p>Display name is required.</p>}

          <StyledSettingsFormLabel>First Name</StyledSettingsFormLabel>
          <StyledSettingsFormInput placeholder={data && data["FirstName"]} {...register("firstName")} type={"text"} onChange={(e) => setFirstName(e.target.value)}/>
          {errors.firstName && <p>First Name is required.</p>}

          <StyledSettingsFormLabel>Last Name</StyledSettingsFormLabel>
          <StyledSettingsFormInput placeholder={data && data["LastName"]} {...register("lastName")} type={"text"} onChange={(e) => setLastName(e.target.value)}/>
          {errors.lastName && <p>Last name is required.</p>}

          <StyledSettingsFormLabel>Email</StyledSettingsFormLabel>
          <StyledSettingsFormInput placeholder={data && data["Email"]} {...register("email")} type={"email"} onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && <p>Email is required.</p>}

          <StyledSettingsFormLabel>Password</StyledSettingsFormLabel>
          <StyledSettingsFormInput {...register("password")} type={"password"} onChange={(e) => setPassword(e.target.value)}/>
          {errors.password && <p>Password is required.</p>}

          <StyledSettingsFormLabel>Repeat password</StyledSettingsFormLabel>
          <StyledSettingsFormInput {...register("repeatPassword")} type={"password"} onChange={(e) => setRepeatPassword(e.target.value)}/>
          {errors.repeatPassword && <p>Repeat password is required.</p>}

          <StyledSettingsFormSubmit type={"submit"}>submit</StyledSettingsFormSubmit>
        </StyledSettingsFormContent>
        {message && <Snack danger message={message}/>}
      </StyledSettingsForm>
    </>
  );
}
export { Settings }
