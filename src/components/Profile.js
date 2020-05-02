// src/components/Profile.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Button } from "react-bootstrap";
import axios from "axios";

const Profile = () => {
  const { loading, user } = useAuth0();
  console.log(user)
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />
      <Button onClick={ ()=> axios.get("https://localhost:5001/api/Auth/register").then(console.log) }>
          Mandar
      </Button>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </Fragment>
  );
};

export default Profile;