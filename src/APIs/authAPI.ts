
const getServerAndPort = "https:\\localhost:5001/api/auth";

export const register = async (alias : string, pass : string, mail : string) => {
    const sugestionsAPI =  getServerAndPort + "/register"

    const response = await fetch(sugestionsAPI, {
        method: 'POST',
        body: JSON.stringify({Alias : alias, Pass : pass, Mail : mail  }),
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': "Bearer " + await getFreshToken(reqExtras.msalInstance)
        }
    })
    return response.json()
}