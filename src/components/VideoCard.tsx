import { VideosResult } from "../types/VideosResult";
import { Card } from "react-bootstrap";
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

    
const VideoCard: React.FC<VideosResult> = (props) => {

    const [reproductor,setreproductor] = useState<any>()

    function sourceurl(id: string){
        return "https://localhost:5001/api/Video/getFileById?fileId="+ id
      }

    
            return (
            <Card>
                <Card.Body>
                      <Card.Title>{props.nombre}</Card.Title>
                      
                      <ReactPlayer style={{ }}
                        ref={(player:any) => setreproductor(player) }
                        width={"small"}
                        height={"small"}
                        url={sourceurl(props.indice.toString())}
                        controls={true}
                        fluid={true}
                      >
                      </ReactPlayer>    
                      <Card.Text>
                        {props.descripcion.slice(0,20)}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">{props.autor}</small>
                      <br></br>
                      <small className="text-muted">Subido hace 15 minutos</small>
                    </Card.Footer>
                </Card>
            )

    
}

export default VideoCard;


/*

interface NavProps {
    links: JSX.Element[],
    themeToggle?: () => void,
    darkTheme?: boolean
}

const NavMenu: React.FC<NavProps> = (props) => {
    const gS = useContext(StateContext)
    return (
        <header>
            <nav className="navbar navbar-light navbar-expand-sm navbar-toggleable-sm">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="navbar-brand" to="/"><img src={'/images/logo-galicia.svg'} width="150px" alt="TOPS" /></Link>
                        </li>
                       
                        </ul>
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0 mx-4">
                            <li className="nav-link nav-item a h5" key={"nightmode"} onClick={props.themeToggle} style={{ cursor: "pointer", userSelect: "none" }}><span role="img" aria-label="dark-mode">🌙</span></li> 
                            {
                                props.links
                                    .map((l, i) =>
                                        <li className="nav-item" key={i} style={{ cursor: "pointer", userSelect: "none" }}>
                                            {l}
                                        </li>
                                    )
                            } 
                            {gS && gS.msalInstance && gS.msalInstance.getAccount() && gS.msalInstance.getAccount().name && <li className="nav-item" key={"user"} style={{ cursor: "pointer", userSelect: "none" }}>
                                <span className="nav-link pull-right h5 lead" style={{ marginBottom: "0.5rem" }}>{"｜" + gS.msalInstance.getAccount().name}</span>
                            </li>}
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
    
    export default NavMenu;

    */