import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.div`
  max-width: 500px;
`;

const StyledFormHeader = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  background: lightgrey;
  flex-wrap: wrap;
`;


const StyledFormContent = styled.form`
    max-width: 300px;
`;

const StyledLabel = styled.label`
  color: blue;
  white-space: nowrap;
`;


const StyledFormInput = styled.input`
  background: lightgrey;
  color: red;
`;

interface FormProps {
}

const Form = ({} : FormProps) : ReactElement => {
  const [uuid, setUUID] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const request = new Request("/users", {
        method: "post",
        body: JSON.stringify({
          uuid: uuid,
          displayName: displayName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          birthday: birthday
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });

    fetch(request).then(res => {
        if (res.status === 200) {
            return res.json()
        }
        console.log(res)
    }).catch(error => {
        console.log(error);
    });

    console.log(request)
    console.log(event)
  }


  return (
    <>
      <StyledForm>
        <StyledFormHeader>
          Register
        </StyledFormHeader>
        <StyledFormContent onSubmit={handleSubmit}>
          <StyledLabel>uuid</StyledLabel>
          <StyledFormInput type={"text"} onChange={(e) => setUUID(e.target.value)}></StyledFormInput>
          <StyledLabel>Display Name</StyledLabel>
          <StyledFormInput type={"text"} onChange={(e) => setDisplayName(e.target.value)}></StyledFormInput>
          <StyledLabel>First Name</StyledLabel>
          <StyledFormInput type={"text"} onChange={(e) => setFirstName(e.target.value)}></StyledFormInput>
          <StyledLabel>Last Name</StyledLabel>
          <StyledFormInput type={"text"} onChange={(e) => setLastName(e.target.value)}></StyledFormInput>
          <StyledLabel>Email</StyledLabel>
          <StyledFormInput type={"text"} onChange={(e) => setEmail(e.target.value)}></StyledFormInput>
          <StyledLabel>Birthday</StyledLabel>
          <StyledFormInput type={"text"} onChange={(e) => setBirthday(e.target.value)}></StyledFormInput>
          <StyledFormInput type={"submit"}></StyledFormInput>
        </StyledFormContent>
      </StyledForm>
    </>
  );
}

export { Form }
