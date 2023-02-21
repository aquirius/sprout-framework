import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Snack } from '../../components/Snack';

const StyledRegisterForm = styled.div`
  max-width: 500px;
  background: linear-gradient(90deg, #f9f9f9 0%, transparent 100%);
  border-radius: 25px;
  padding: 2rem 3rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; 
  margin:10vh auto;
`;

const StyledRegisterFormHeader = styled.div`
color: inherit;
`;

const StyledRegisterFormContent = styled.form`
`;

const StyledRegisterFormLabel = styled.label`
  white-space: nowrap;
`;

const StyledRegisterFormInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

const StyledRegisterFormSubmit = styled.button`
  background: #63ac20;
  color: white;
  padding: 1rem 2rem;
  font-size: 2rem;
  border-radius: 4px;
`;

const Register = () : ReactElement => {
  //initialize our form with empty states
  const [uuid, setUUID] = useState("");
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


  //build our request
  const request = new Request("/register", {
    method: "post",
    body: JSON.stringify({
      display_name: displayName,
      first_name: firstName,
      last_name: lastName,
      email: email,
      birthday: Math.floor(new Date(birthday).getTime() / 1000),
      password: password
    }),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Method": "register"
    }
  });


  //submit Handler submits our form with filled data
  //we fill out our user object with our useState hooks
  //we prevent default rendering, because we want to display a message
  const onSubmit = () => {
    if(password !== repeat){
      setMessage('passwords do not match')
      return new Error(message)
    }
    fetch(request).then(res => {
      setMessage(res.statusText)
        if(!res.ok){
          throw new Error(message);
        }
        return res.json()
    }).then(checked => {
      nav("/user/"+checked.user.UUID)
    }).catch(error => {
        console.log(error);
    });
  }

  return (
    <>
      <StyledRegisterForm>
        <StyledRegisterFormHeader>
          <h2>Register</h2>
        </StyledRegisterFormHeader>
        <StyledRegisterFormContent onSubmit={handleSubmit(onSubmit)}>

          <StyledRegisterFormLabel>Display Name</StyledRegisterFormLabel>
          <StyledRegisterFormInput {...register("displayName", {required: true})} type={"text"} onChange={(e) => setDisplayName(e.target.value)}/>
          {errors.displayName && <p>Display name is required.</p>}

          <StyledRegisterFormLabel>First Name</StyledRegisterFormLabel>
          <StyledRegisterFormInput {...register("firstName", {required: true})} type={"text"} onChange={(e) => setFirstName(e.target.value)}/>
          {errors.firstName && <p>First name is required.</p>}

          <StyledRegisterFormLabel>Last Name</StyledRegisterFormLabel>
          <StyledRegisterFormInput {...register("lastName", {required: true})} type={"text"} onChange={(e) => setLastName(e.target.value)}/>
          {errors.lastName && <p>Last name is required.</p>}

          <StyledRegisterFormLabel>Email</StyledRegisterFormLabel>
          <StyledRegisterFormInput {...register("email", {required: true})} type={"email"} onChange={(e) => setEmail(e.target.value)}/>
          {errors.email && <p>Email is required.</p>}

          <StyledRegisterFormLabel>Birthday</StyledRegisterFormLabel>
          <StyledRegisterFormInput {...register("birthday", {required: true})} type={"date"} onChange={(e) => setBirthday(e.target.value)}/>
          {errors.birthday && <p>Birthday is required.</p>}

          <StyledRegisterFormLabel>Password</StyledRegisterFormLabel>
          <StyledRegisterFormInput {...register("password", {required:true})} type={"password"} onChange={(e) => setPassword(e.target.value)}/>
          {errors.password && <p>Password is required.</p>}

          <StyledRegisterFormLabel>Repeat password</StyledRegisterFormLabel>
          <StyledRegisterFormInput {...register("repeatPassword", {required: true})} type={"password"} onChange={(e) => setRepeatPassword(e.target.value)}/>
          {errors.repeatPassword && <p>Repeat password is required.</p>}

          <StyledRegisterFormSubmit type={"submit"}>submit</StyledRegisterFormSubmit>
        </StyledRegisterFormContent>
        {message && <Snack danger message={message}/> }  
      </StyledRegisterForm>
    </>
  );
}
export { Register }
