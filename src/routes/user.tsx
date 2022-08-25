
import React, { ReactElement} from 'react';
import { useParams } from 'react-router-dom';
import { Background } from '../components/Background';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { User } from '../components/User';

interface UserPageProps {
}
//Register page does import our form component and is bound to our react routing system
const UserPage = ({}) : ReactElement => {
    const { uuid } = useParams();
    return (
    <>
    <Grid layout={'10vw 80vw'} dimension={"'a b'"}>
        <GridElement position='a'>
            <Navbar/>
        </GridElement>
        <GridElement position='b'>
            <User uuid={uuid}/>
        </GridElement>
    </Grid>
    <Background/>
    </>
);
}

  
export { UserPage }