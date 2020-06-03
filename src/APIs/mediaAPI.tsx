
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

export const searchAllVideos = async (page: number) =>  {
    const allAPI = getServerAndPort + "/videos"

    const response = await fetch(allAPI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

export const sendVideo = async (media:FormData) : Promise<string> =>  {
    const mediaByIdAPI = getServerAndPort + "/saveFile";
    const response = await fetch(mediaByIdAPI, {
        method: 'POST',
        body:media
    })
    return response.json()
}

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

export const getVideo = (id: string) => 
    getServerAndPort + "/getFileById?fileId=" + id;
export const getImagen = (id: string) =>
    getServerAndPort + "/getImagenById?fileId=" + id;
