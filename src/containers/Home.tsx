import React from 'react';
import { Player } from 'video-react';
import logo from '../logo.svg';
function Home() {
    return <div>
      <h5>fuente original:https://media.w3.org/2010/05/sintel/trailer_hd.mp4</h5>
      <header className="App-header">
        <Player
          playsInline
          poster={logo}
          src="https://localhost:5001/api/Video/getFileById?fileId=1"
        />
      </header>
      </div>
}

export default Home