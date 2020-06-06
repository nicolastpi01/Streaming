import { VideosResult } from "../types/VideosResult";
import { Card } from "react-bootstrap";
import React, { useState } from 'react';


    
const VideoCard: React.FC<VideosResult> = (props) => {

    const [reproductor,setreproductor] = useState<any>()
    /*
    const verVideo = (video:VideosResult) => history.push({
      pathname: '/video',
      //search: '?query=abc',
      state: video
    });onClick={()=>verVideo(video)}*/

    return (
      <Card style={{ height: '25rem' }} >
        <Card.Img variant="bottom" src={props.imagenURL} />
        <Card.Body>
          <Card.Title>{props.nombre}</Card.Title>
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


