
import React, { ReactElement} from 'react';
import {Table} from "../features/table/Table"

interface UserPageProps {
}
  
const UserPage = ({} : UserPageProps) : ReactElement => {

return (
    <>
    <h2>Users Table</h2>
    <Table/>
    </>
);
}
  
  export { UserPage }
  