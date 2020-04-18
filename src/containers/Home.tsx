import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
//import logo from '../logo.svg';
//import { Stream } from 'stream';
//import {Button} from 'react-bootstrap';
import API from '../utils/api';
import axios from 'axios';
import { VideosResult } from '../types/VideosResult';

const Home : React.FC = () => {
    const [idvideo, setidvideo] = React.useState<number>(0)
    const [reproductor,setreproductor] = React.useState<any|undefined>()
    const [catalogo, setCatalogo] = React.useState<VideosResult[]>([]);
    //const [fuente, setfuente] = React.useState<ReadableStream>()

    useEffect(() => {
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
        <h1></h1>
        <select value={idvideo} defaultValue={0} onChange={e => onCambioVideo( parseInt((e.currentTarget.value)) ) }>
            {catalogo.length > 0? catalogo.map(el=><option value={el.indice}>{el.nombre}</option>): <option value={0}>Sin datos</option>}
        </select>

        <div>
        <ReactPlayer
          ref={ (player:any) => setreproductor(player) }
          fluid={true}
          url={sourceurl(idvideo.toString())}
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
          </ControlBar> */
export default Home