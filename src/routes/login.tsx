
import React, { ReactElement} from 'react';
import styled from 'styled-components';
import { Background } from '../components/Background';
import { Login } from '../features/form/Login';

const StyledLoginPage = styled.div`
`;


interface LoginPageProps {
}

//Register page does import our form component and is bound to our react routing system
const LoginPage = ({} : LoginPageProps) : ReactElement => {
return (
    <>
    <Login/>
    <Background expand/>
    </>
);
}
  
  export { LoginPage }
  