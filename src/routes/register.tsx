
import React, { ReactElement} from 'react';
import { Form } from '../features/form/Form'

interface RegisterPageProps {
}
  
const RegisterPage = ({} : RegisterPageProps) : ReactElement => {

return (
    <>
    <h2>Register User Form</h2>
    <Form/>
    </>
);
}
  
  export { RegisterPage }
  