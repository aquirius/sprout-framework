import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
//routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserPage } from './routes/user';
import { LoginPage } from './routes/login';
import { UsersPage } from './routes/users';
import { RegisterPage } from './routes/register';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faPen, faBan, faAngleDown, faAngleUp, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
//add fontawesome icons on top level for button component
library.add(faCheckSquare, faCoffee, faPen, faBan, faAngleDown, faAngleUp, faAngleRight, faAngleLeft)

const container = document.getElementById('root')!;
const root = createRoot(container);

//Routes do import our pages which hold our components
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App/>}></Route>
    <Route path='/register' element={<RegisterPage/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path="/user/:uuid" element={<UserPage/>}></Route>
    <Route path='/users' element={<UsersPage/>}></Route>
  </Routes>
  </BrowserRouter>
);

