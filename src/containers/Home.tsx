import React from 'react';
import { Player , ControlBar, BigPlayButton, LoadingSpinner,CurrentTimeDisplay ,TimeDivider} from 'video-react';
//import logo from '../logo.svg';
//import { Stream } from 'stream';
//import {Button} from 'react-bootstrap';

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
      <header className="App-header">

        <select value={idvideo} defaultValue={0} onChange={e => onCambioVideo( parseInt((e.currentTarget.value)) ) }>
            <option value={0}>Video1</option>
            <option value={1}>Video2</option>
            <option value={2}>Video3</option>
        </select>

        <div>
        <Player
          ref={ (player:any) => setreproductor(player) }
          fluid={true}
          >
          <source src={sourceurl(idvideo.toString())} />
          <ControlBar autoHide={true}>
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <BigPlayButton position="center" order={4.3}/>
            <LoadingSpinner order={4.4}/>
          </ControlBar>
        </Player>
        </div>
        
      </header>
      </div>
}

export default Home