
import React, { ReactElement} from 'react';
import { useParams } from 'react-router-dom';
import { Background } from '../components/Background';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { User } from '../components/User';
import { Settings } from '../features/form/Settings';

interface UserSettingsProps {
}
//Settings page does import our form component and is bound to our react routing system
const UserSettingsPage = ({}) : ReactElement => {
    const { uuid } = useParams();
    return (
    <>
    <Grid layout={'75px auto'} dimension={"'a b'"}>
        <GridElement position='a'>
            <Navbar uuid={uuid}/>
        </GridElement>
        <GridElement position='b'>
            <Settings uuid={uuid}/>
        </GridElement>
    </Grid>
    <Background/>
    </>
);
}

  
export { UserSettingsPage }