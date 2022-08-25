import { faMasksTheater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../button/Button';

const StyledTable = styled.div`
  min-width: 1750px;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  border-radius: 25px;
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(8,1fr);
  border-radius:25px 25px 0px 0px;
  background-color:#fff;
  flex-wrap: wrap;
  font-size: 2rem;
  font-weight: 400;
  border-bottom: 1px solid black;
`;

const StyledRow = styled.div`
  display:grid;
  grid-template-columns: repeat(8,1fr);
`;

const StyledContent = styled.div`
  border: 1px solid lightgrey;
  background: #fff;
`;

const StyledColumn = styled.div`
  height: 50px;
  padding-top: 10px;
  text-align:center;
  border-top: 0;
  border-left: solid 1px black;
  &:first-child{
    border-left: 0;
  };
  &:last-child{
    border-right: 1px solid black;
  };
`;

const StyledAction = styled.div`
  position: absolute;
  right: 0;
`;

const StyledColumnInput = styled.input`
  border: 1px solid lightgrey;
  height: 50px;
  &:focus{
    outline: none;
  }
`;

const StyledFooter = styled.div`
  background: #182848;
  border-top: 1px solid lightgrey;
  height: 25px;
  border-radius:0px 0px 20px 20px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
`

interface UserProps {
  uuid: string,
  display_name: string,
  email: string,
  user_first_name: string,
  user_last_name: string
}

const Table = () : ReactElement => {
  //initialize states of our data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [direction, setDirection] = useState(true);
  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams] = useSearchParams()
  const [message, setMessage] = useState("");
  const nav = useNavigate();


  //after the initial render with our empty states, we fetch our users list from the backend
  //useEffect is triggered again if we set our loading to true
  //we need this to make sure, if we delete a user to refresh our state and fetch a new user list
  useEffect(() => {
    fetch("/users"+window.location.search)
    .then((res) => {
      if (res.status === 401) {
        nav("/login", {replace: true})
      }
      return res
    })
    .then((nav) => nav.json())
    .then((json) => setData(json.users))
    .finally(() => setLoading(false))
    .catch(error => {
      console.log(error);
    });
  }, [nav, loading])

  //edit Handler calls our backend with edited data
  //our db updates the user with given uuid
  //we set our loading to true and let our useEffect hook change is as soon as it is done fetching our modified user list again
  const handleEdit = (user: UserProps) => {
    //return empty request
    if(!displayName && !firstName && !lastName && !email){
      return 
    }

    setLoading(true)
    const request = new Request("/users", {
        method: "put",
        body: JSON.stringify({
          uuid: user.uuid,
          displayName: displayName,
          firstName: firstName,
          lastName: lastName,
          email: email
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request).then(res => {
        if (res.status === 200) {
            return res.json()
        }
    }).catch(error => {
        console.log(error);
    });
  }

  //delete Handler calls our backend with uuid
  //db deletes the user with given uuid
  const handleDelete = (uuid: string) => {
    setLoading(true)
    const request = new Request("/users", {
        method: "delete",
        body: JSON.stringify({
          uuid: uuid
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request).then(res => {
        setMessage(res.statusText)
        if(!res.ok){
          throw new Error(message);
        }
        if (res.status === 200) {
            nav("/user/"+uuid, {replace: true})
            return res.json()
        }
    }).catch(error => {
        console.log(error);
    });
  }

  //handle our sorting params when we click a column
  const handleQueryParams = (key: string) => {
    setSort(key)
    setSearchParams({"sort": key, "dir": direction ? "asc" : "desc"});
    setDirection(!direction)
    setLoading(true)
  }

  //redirect to users page with given uuid
  const handleRedirect = (uuid: string) =>{ 
    let path = "/user/"+uuid; 
    nav(path);
  }

  return (
      <StyledTable>
        <StyledHeader>
          
          {data && data[0] && Object.keys(data[0]).map((key, idx) =>{
          return (
            <>
              <StyledColumn key={idx} onClick={() => handleQueryParams(key)}>{key ? <FontAwesomeIcon icon={direction ? "angle-up" : "angle-down"}/> : null}{key}</StyledColumn>
            </>
          );
        })}
        </StyledHeader>
        <StyledContent>
        {data && data.map(({UUID, TS, DisplayName, FirstName, LastName, Email, Birthday}, index) => {
          var formattedTime
          var formattedBirthday
          //looks ugly but does the job of momentjs
          if(!TS){
            formattedTime = ""
          } else {
            var date = new Date(TS * 1000);
            var day = date.getDay();
            var month = date.getMonth();
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            formattedTime = day+'.'+month+'.'+year+' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          }

          if(!Birthday){
            formattedBirthday = ""
          } else {
            var birthdate = new Date(Birthday * 1000);
            var birth = birthdate.getDay();
            var birthmonth = birthdate.getMonth();
            var birthyear = birthdate.getFullYear();
            formattedBirthday = birth+'.'+birthmonth+'.'+birthyear
          }
          return (
            <>
            <StyledRow key={index}>
              <StyledColumnInput defaultValue={UUID} disabled/>
              <StyledContent>{formattedTime}</StyledContent>
              <StyledColumnInput type={"text"} defaultValue={DisplayName} onChange={(e) => setDisplayName(e.target.value)}/>
              <StyledColumnInput type={"text"} defaultValue={FirstName} onChange={(e) => setFirstName(e.target.value)}/>
              <StyledColumnInput type={"text"} defaultValue={LastName} onChange={(e) => setLastName(e.target.value)}/>
              <StyledColumnInput type={"email"} defaultValue={Email} onChange={(e) => setEmail(e.target.value)}/>
              <StyledContent>{formattedBirthday}</StyledContent>
              <StyledAction>
                <Button icon={"pen"} size={"2x"} onClick={() => handleEdit({uuid: UUID, display_name:displayName, email:email, user_first_name:firstName, user_last_name:lastName})}/>
                <Button icon={"ban"} size={"2x"} onClick={() => handleDelete(UUID)}/>
                <Button icon={"angle-right"} size={"2x"} onClick={() => handleRedirect(UUID)}/>
              </StyledAction>
            </StyledRow>
            </>
          );
        })}
        </StyledContent>
        <StyledFooter>
          {message}
        </StyledFooter>
      </StyledTable>
  );
}

export { Table }
