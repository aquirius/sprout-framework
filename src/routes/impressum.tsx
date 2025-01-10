import React, { ReactElement} from 'react';


interface ImpressumPageProps {
}

//Landing page does import our form component and is bound to our react routing system
const ImpressumPage = ({} : ImpressumPageProps) : ReactElement => {
return (
    <> 
        <div><h1>Impressum</h1></div>
    </>

);
}

  
  export { ImpressumPage }
  