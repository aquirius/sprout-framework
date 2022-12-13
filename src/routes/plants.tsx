
import React, { ReactElement} from 'react';
import { useParams } from 'react-router-dom';
import { Background } from '../components/Background';
import { Grid, GridElement } from '../components/Grid';
import { Navbar } from '../components/Navigation';
import { Plants } from '../components/Plants';

interface PlantsPageProps {
}
//Register page does import our form component and is bound to our react routing system
const PlantsPage = ({}) : ReactElement => {
    const { uuid } = useParams();
    return (
    <>
    <Grid layout={'10vw 80vw'} dimension={"'a b'"}>
        <GridElement position='a'>
            <Navbar uuid={uuid}/>
        </GridElement>
        <GridElement position='b'>
            <Plants uuid={uuid}/>
        </GridElement>
    </Grid>
    <Background/>
    </>
);
}

  
export { PlantsPage }