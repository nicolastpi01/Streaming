import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import logo from '../logo.svg'; //error de dominio
//import { Stream } from 'stream';
import {Toast} from 'react-bootstrap';
import API from '../utils/api';
import axios from 'axios';
import { VideosResult } from '../types/VideosResult';
import Paginacion from '../components/Pagination';

const Home : React.FC = () => {
    const [idvideo, setidvideo] = React.useState<number|undefined>()
    const [reproductor,setreproductor] = React.useState<any|undefined>()
    const [catalogo, setCatalogo] = React.useState<VideosResult[]>([]);
    //const [fuente, setfuente] = React.useState<ReadableStream>()

    const [show, setShow] = React.useState(false);

    useEffect(() => {//TODO:refactor y delegacion de responsabilidad
      console.log("fuera")
      axios.get("https:\\localhost:5001/api/Video/videos",	{ headers: {
        'Access-Control-Allow-Origin': '*' //,
        //'Vary': 'Origin'
        }
      }).then( response => response.data ).then( (response: VideosResult[])=>{
          console.log("dentro")
          console.log(response)
          
          /*if (response.status !== 200) {
            console.table(response);
            return;
          }*/
          setCatalogo( response );
      }
    )
    .catch(function(err) {
      setShow(true);
      console.log(err);
    });
      
    }, []);

    function sourceurl(id:string){
        return "https://localhost:5001/api/Video/getFileById?fileId="+ id
    }
    
    function onCambioVideo(newNumber:number) {
        setidvideo(newNumber);
        //reproductor.load();
    }

    return <div>
      <header className="App-header">
        <h1>Streaming App</h1>
        
        <select value={idvideo} defaultValue={0} onChange={e => onCambioVideo( parseInt((e.currentTarget.value)) ) }>
            {catalogo.length > 0? catalogo.map(el=><option value={el.indice}>{el.nombre}</option>): <option value={0}>Sin datos</option>}
        </select>

        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src={logo}
              className="rounded mr-2"
              alt="Icono Nuestra App"
            />
            <strong className="mr-auto">StreamingApp</strong>
            <small>Ahora</small>
          </Toast.Header>
          <Toast.Body>Error de conexion!</Toast.Body>
        </Toast>

        <Paginacion>
          {[1,2,3]}
        </Paginacion>

        <div>
        <ReactPlayer
          ref={ (player:any) => setreproductor(player) }
          fluid={true}
          url={idvideo !==undefined?sourceurl(idvideo.toString()):""}
          controls={true}
          >
        </ReactPlayer>
        </div>
        
      </header>
      </div>
}

/*          <ControlBar autoHide={true}>
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <BigPlayButton position="center" order={4.3}/>
            <LoadingSpinner order={4.4}/>
          </ControlBar>
          
          */
export default Home