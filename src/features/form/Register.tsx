import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  background: #4b6cb7;
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

  //build our request
  const request = new Request("/register", {
    method: "post",
    body: JSON.stringify({
      uuid: uuid,
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(password !== repeat){
      setMessage('passwords do not match')
      return new Error(message)
    }
    fetch(request).then(res => {
        setMessage(res.statusText)
        if(!res.ok){
          throw new Error(message);
        }
        if (res.status === 200) {
            nav("/user/"+uuid, {replace: true})
        }
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
        <StyledRegisterFormContent onSubmit={handleSubmit}>
          <StyledRegisterFormLabel>UUID</StyledRegisterFormLabel>
          <StyledRegisterFormInput title='5 digit number user id' pattern='[0-9]{5,5}' type={"text"} required onChange={(e) => setUUID(e.target.value)}/>
          <StyledRegisterFormLabel>Display Name</StyledRegisterFormLabel>
          <StyledRegisterFormInput type={"text"} required onChange={(e) => setDisplayName(e.target.value)}/>
          <StyledRegisterFormLabel>First Name</StyledRegisterFormLabel>
          <StyledRegisterFormInput type={"text"} required onChange={(e) => setFirstName(e.target.value)}/>
          <StyledRegisterFormLabel>Last Name</StyledRegisterFormLabel>
          <StyledRegisterFormInput type={"text"} required onChange={(e) => setLastName(e.target.value)}/>
          <StyledRegisterFormLabel>Email</StyledRegisterFormLabel>
          <StyledRegisterFormInput type={"email"} required onChange={(e) => setEmail(e.target.value)}/>
          <StyledRegisterFormLabel>Birthday</StyledRegisterFormLabel>
          <StyledRegisterFormInput type={"date"} required onChange={(e) => setBirthday(e.target.value)}/>
          <StyledRegisterFormLabel>Password</StyledRegisterFormLabel>
          <StyledRegisterFormInput type={"password"} required onChange={(e) => setPassword(e.target.value)}/>
          <StyledRegisterFormLabel>Repeat password</StyledRegisterFormLabel>
          <StyledRegisterFormInput type={"password"} required onChange={(e) => setRepeatPassword(e.target.value)}/>
          <StyledRegisterFormSubmit type={"submit"}>submit</StyledRegisterFormSubmit>
        </StyledRegisterFormContent>
        {message}
      </StyledRegisterForm>
    </>
  );
}

export { Register }
