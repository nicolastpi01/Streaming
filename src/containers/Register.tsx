import React, { Fragment, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";

/*
  const Register = () => {
    const [showResult, setShowResult] = useState(false);
    const [apiMessage, setApiMessage] = useState("");
    const { getTokenSilently } = useAuth0();
  
    const callApi = async () => {
      try {
        const token = await getTokenSilently();
        localStorage.setItem('access_token', token);
        //const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qUkZNVVV4TVRreVF6Y3dOREU1UVVJNE5UZEZSRVZCT1VSR05UUkZPVVF3UkRSQ1JEUTNOdyJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUtc2VjdXJlLWFwaS5hdXRoMC5jb20vIiwic3ViIjoiYUExUndhVnRUYjNuM3RhUUVId3IyNDlya1JxcmU2V29AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbWVkaWEuY29tIiwiaWF0IjoxNTkwNDU2MDE2LCJleHAiOjE1OTA1NDI0MTYsImF6cCI6ImFBMVJ3YVZ0VGIzbjN0YVFFSHdyMjQ5cmtScXJlNldvIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.kb-Mn4TtU56t-3Jt1UPY_X8JL8__RxHmd0Cxg-KcYi-YOfDo_14LZ-RIpLh5vVROlW03rvX17i1MQ2cVW2XhKS-qOR0_W47oICBdrFct1ZPe2i0BcyyaC89HUpOnnqoVjDNKK3LXHUahatgG0dzORLgFhtTpDxjBqUBX8vfnIUXx_6p9-AIywp_6COOKbsxIV07-Lom5WcDTclOmSmw4NzBdAOb42_n6nrtRtUC1s8qb5Qb5d7EC9_LBU59gfLZm60VsmBp2V-RxWWUncLQqB80OSZqGRFPdugadQZzLD4LGcbv8Jb10F5OBAKQ8xmx6N29yZ9EUPuLw2A1u9H_D2g'
        console.log ("El token es : " + token);
  
        const response = await fetch("https://localhost:5001/api/video/videos?page=0", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        const responseData = await response.json();
  
        setShowResult(true);
        setApiMessage(responseData);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>
        <h1>External API</h1>
        <button onClick={callApi}>Ping API</button>
        {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
      </>
    );
  };
  
  export default Register;
  */