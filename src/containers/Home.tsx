import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { VideosResult } from '../types/VideosResult';
import { searchSugestions, searchVideos } from '../APIs/mediaAPI';

const Home : React.FC = () => {
    const [idvideo, setidvideo] = React.useState<number|undefined>()
    const [reproductor,setreproductor] = React.useState<any|undefined>()
    const [catalogo, setCatalogo] = React.useState<VideosResult[]>([]);
    const [search, setSearch] = useState<string>("")
    const [searchSugestion, setSearchSugestion] = useState<string[]>([])

    useEffect(() => {//TODO:refactor y delegacion de responsabilidad
      console.log("fuera")
      axios.get("https:\\localhost:5001/api/video/videos",	{ headers: {
        'Access-Control-Allow-Origin': '*' 
        
      }
      }).then(response => response.data ).then( (response: VideosResult[])=>{
          setCatalogo(response);
      }
    )
    .catch(function(err) { //TODO:Reemplazar por componente visual
      console.log(err);
    });
      
    }, []);

    function sourceurl(id:string){
        return "https://localhost:5001/api/Video/getFileById?fileId="+ id
    }
    
    function onCambioVideo(newNumber:number) {
        setidvideo(newNumber);
        
    }

    // Llama a la API que busca las sugerencias
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      setSearch(event.target.value);
      getSugestions();
    }

    const getSugestions = async () => {
      searchSugestions(search).then(sugestions =>{
        setSearchSugestion(sugestions)
        console.log(sugestions)
      }).catch(e => console.log("ERROR BUSCANDO LAS SUGERENCIAS" + e))
    }
  
    // Llama a la API que busca los videos
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      searchVideos(search).then(videos =>{
        setCatalogo(videos)
        onCambioVideo(parseInt(videos[0].indice)) // Despues se tiene que sacar !!!!
        console.log(videos)
      }).catch(e => console.log("ERROR BUSCANDO LOS VIDEOS" + e))
      event.preventDefault();
    }


    return <div>
      <header className="App-header">
        
        
        <form onSubmit={handleSubmit}>
          <input type="text" value={search} onChange={handleChange}/>
          <input type="submit" value="&#128269;"/>
        </form>
        
        <br></br>
        
        <select value={search} defaultValue="" onSelect={e => console.log(e.currentTarget.value)}>
            {searchSugestions.length > 0 ? searchSugestion.map(s => <option value={s}>{s}</option>) : <option value={""}>Sin datos</option>}
        </select>
         
        
        <br></br>
        {/* 
        <select value={idvideo} defaultValue={0} onClick={e => onCambioVideo(parseInt(e.currentTarget.value)) }>
            {catalogo.length > 0? catalogo.map(el=><option value={el.indice}>{el.nombre}</option>): <option value={0}>Sin datos</option>}
        </select>
          */}

        <div className="container-fluid">
          {
            catalogo.length > 0 ? 
              catalogo.map(video =>    
              <div>
                <ReactPlayer
                  ref={(player:any) => setreproductor(player) }
                  fluid={true}
                  url={sourceurl(video.indice.toString())}
                  controls={true}
                  >
                </ReactPlayer>
              </div> )
             : <h1>No hay resultados para su busqueda</h1>

          }
          

        </div>

          {/* 
        <div>
        <ReactPlayer
          ref={(player:any) => setreproductor(player) }
          fluid={true}
          url={idvideo !==undefined?sourceurl(idvideo.toString()) :""}
          controls={true}
          >
        </ReactPlayer>
        </div>
        */}
        
      </header>
      </div>
}


export default Home