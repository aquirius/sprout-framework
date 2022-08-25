
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Background } from '../components/Background';
import {Table} from "../features/table/Table"


//User page does import our table component and is bound to our react routing system
const UsersPage = () : ReactElement => {

return (
    <>
    <h2>Users Table</h2>
    <Table/>
    <Background/>
    </>
);
}
  
  export { UsersPage }