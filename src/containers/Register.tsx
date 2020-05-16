import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { register } from "../APIs/authAPI";

const Register = () => {
  const { loading, user } = useAuth0();
  const [cargaFallida, setCargaFallida] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(()=>{
        setCargaFallida(true)
    }, 2000)
  }, []);

  //Usar estos datos:
  console.log(user)
  
  if (loading || !user) {
    return <div>Cargando Datos</div>;
  }
  else 
    return (
        <div>
        <img src={user.picture} alt="Profile" />

        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <code>{JSON.stringify(user, null, 2)}</code>


        </div>
    );
};

export default Register;