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


