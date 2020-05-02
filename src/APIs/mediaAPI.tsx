
export const searchSugestions = async (sugestions: string) => {
    const sugestionsAPI = "https:\\localhost:5001/api/video/sugerencias?sugerencia=" + sugestions

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
    const searchAPI = "https:\\localhost:5001/api/video/search?busqueda=" + search

    const response = await fetch(searchAPI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.json()
}

