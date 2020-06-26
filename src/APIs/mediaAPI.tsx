
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

export const sendVideo = async (media: FormData) : Promise<string> =>  {
    const mediaByIdAPI = getServerAndPort + "/saveFile";
    const response = await fetch(mediaByIdAPI, {
        method: 'POST',
        body:media
    })
    return response.json()
}

/*
export const getByFilters = async (filters: SolicitudFilterRequest, reqExtras: RequestHeaders) => {
    const response = await fetch(getURLs().SolicitudByFilter, {
        method: 'POST',
        body: JSON.stringify(filters),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + await getFreshToken(reqExtras.msalInstance)
        }
    })
    return response.json()
} */

export interface MgRequest {
    mediaId: number,
    
}


export const agregarMg = async (mediaId : MgRequest) =>  {
    const likeAPI = getServerAndPort + "/like";
    const response = await fetch(likeAPI, {
        method: 'POST',
        body: JSON.stringify(mediaId),
        headers: {
            'Content-Type': 'application/json' 
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
    const allAPI = getServerAndPort + "/videos?page=" + page

    const response = await fetch(allAPI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`
        }
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