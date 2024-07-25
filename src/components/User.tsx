import React, { ReactElement, useEffect, useState } from 'react';
import { Grid, GridElement } from './Grid';
import { Snack } from './Snack';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  uuid?: string
}

//Button component draws us an html button with icon and size of the icon
const User = ({uuid} : UserProps) : ReactElement => {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const nav = useNavigate();

  if(!uuid || uuid === ""){
    nav("/login", {replace: true})
  }

  useEffect(() => {
    fetch("/user/"+uuid)
    .then((res) => {
      setMessage(res.statusText)
      return res.json()})
    .then((json) => setData(json.user))
    .finally(() => setLoading(false))
  }, [uuid, loading])

  return (
    <>
    <Grid layout={"80% 20%"} dimension={"'a b'"} >
      <GridElement position='b'>
        <Snack danger message={message}></Snack>
      </GridElement>
    </Grid>
        <h2>{data ? uuid : "404"}</h2>
        {data && Object.keys(data).map((key, index) => {
        return (
          <div key={index}>
            <h2>
              {key}: {data[key]}
            </h2>
          </div>
        );
      })}

    </>
  );
}

export { User }
