import React from 'react';
import { Player } from 'video-react';
import logo from '../logo.svg';
import { Stream } from 'stream';

const Home : React.FC = () => {
    const [idvideo, setidvideo] = React.useState<number>(0)
    const [reproductor,setreproductor] = React.useState<any|undefined>()
    //const [fuente, setfuente] = React.useState<ReadableStream>()

    function sourceurl(id:string){
        return "https://localhost:5001/api/Video/getFileById?fileId="+ id
    }
    
    function onCambioVideo(newNumber:number) {
        setidvideo(newNumber);
        reproductor.load();
    }

    return <div>
      <h5>fuente original:https://media.w3.org/2010/05/sintel/trailer_hd.mp4</h5>
      <header className="App-header">

        <select value={idvideo} defaultValue={0} onChange={e => onCambioVideo( parseInt((e.currentTarget.value)) ) }>
            <option value={0}>Video1</option>
            <option value={1}>Video2</option>
            <option value={2}>Video3</option>
        </select>

        <Player
          ref={ (player:any) => setreproductor(player) }
          playsInline
          poster={logo}
          
          >
          <source src={sourceurl(idvideo.toString())} />
        </Player>
      </header>
      </div>
}

export default Home