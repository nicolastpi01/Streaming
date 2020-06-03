
export const getServerAndPort = "https:\\localhost:5001/api/video";


export const searchSugestions = async (sugestions: string) => {
    const sugestionsAPI =  getServerAndPort + "/sugerencias?sugerencia=" + sugestions

    const response = await fetch(sugestionsAPI, {
        method: 'GET',
        //body: JSON.stringify({ idSolicitud: id }),
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': "Bearer " + await getFreshToken(reqExtras.msalInstance)
        }
    })
    return response.json()
}


export const searchVideos = async (search: string) => {
    const searchAPI = getServerAndPort + "/search?busqueda=" + search

    const response = await fetch(searchAPI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            
        }
    })
    return response.json()
}

//  token: string
export const searchAllVideos = async (page: number) =>  {
    const allAPI = getServerAndPort + "/videos"

    const response = await fetch(allAPI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`
        }
    })
    return response.json()
}

/*

export const traerBandejas = async (reqExtras: RequestHeaders) => {
    const api = getURLs().BandejaMS

    const detalles = await fetch(api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + await getFreshToken(reqExtras.msalInstance)
        }
    })
    return detalles.json()
}
*/


export const searchVideo = async (id: string) : Promise<string> =>  {
    const mediaByIdAPI = getServerAndPort + "/getFileById?fileId=" + id

    const response = await fetch(mediaByIdAPI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

