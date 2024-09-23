import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
//routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserPage } from './routes/user';
import { LoginPage } from './routes/login';
import { UsersPage } from './routes/users';
import { RegisterPage } from './routes/register';

import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faPen, faBan, faAngleDown, faAngleUp, faAngleRight, faAngleLeft, faGear, faUser, faCog, faSpa, faSeedling, faSignOut, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faGolang, faReact, faNodeJs } from "@fortawesome/free-brands-svg-icons"

import { UserSettingsPage } from './routes/settings';
import { LandingPage } from './routes/landing';
import { ImpressumPage } from './routes/impressum';
import { GreenhousesPage } from './routes/greenhouses';
import { NotificationsPage } from './routes/notifications';

import { GreenhousePage } from './routes/greenhouse';
import { CropsPage } from './routes/crops';


library.add(
  faCheckSquare as IconDefinition,
  faCoffee as IconDefinition,
  faPen as IconDefinition,
  faBan as IconDefinition,
  faAngleDown as IconDefinition,
  faAngleUp as IconDefinition,
  faAngleRight as IconDefinition,
  faAngleLeft as IconDefinition,
  faGear as IconDefinition,
  faUser as IconDefinition,
  faSignOut as IconDefinition,

  faGolang as IconDefinition,
  faInstagram as IconDefinition,
  faGithub as IconDefinition,
  faReact as IconDefinition,
  faNodeJs as IconDefinition,
  faSpa as IconDefinition,
  faCog as IconDefinition,
  faSeedling as IconDefinition,
  faCheck as IconDefinition,
  faXmark as  IconDefinition
)

const container = document.getElementById('root')!;
const root = createRoot(container);

//Routes do import our pages which hold our components
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<LandingPage/>}></Route>
    <Route path='/register' element={<RegisterPage/>}></Route>
    <Route path='/impressum' element={<ImpressumPage/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path="/user/:uuid" element={<UserPage/>}></Route>
    <Route path="/user/:uuid/greenhouses" element={<GreenhousesPage/>}></Route>
    <Route path="/user/:uuid/greenhouse/:guid" element={<GreenhousePage/>}></Route>
    <Route path="/user/:uuid/settings" element={<UserSettingsPage/>}></Route>
    <Route path='/user/:uuid/notifications' element={<NotificationsPage/>}></Route>
    <Route path='/user/:uuid/crops' element={<CropsPage/>}></Route>
    <Route path='/users' element={<UsersPage/>}></Route>
  </Routes>
  </BrowserRouter>
);