// src/components/Profile.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Button } from "react-bootstrap";
import axios from "axios";
import logo from "../logo.svg";


const Profile = () => {
  const { loading, user } = useAuth0();
  console.log(user)

  const register = () => 
    axios.get("https://localhost:5001/api/Auth/register?nombre="+user.name //,
    //JSON.stringify({nombre:user.name}) //, pass:"user.email" 
    ).then(console.log)
  if (loading || !user) {
    return <div>Loading...</div>;
  }
  //,given_name email_verified 
  return (
    <Fragment>
      <img width={64} height={64} src={logo} alt="Profile" />
      <Button onClick={ register }>
          Mandar
      </Button>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      
    </Fragment>
  );
};
//Muestra todo el codigo en pantalla
//<code>{JSON.stringify(user, null, 2)}</code>
export default Profile;