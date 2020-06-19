import { VideosResult } from "../types/VideosResult";
import { Card } from "react-bootstrap";
import React, { useState } from 'react';
import history from "../utils/history";

    
const VideoCard: React.FC<VideosResult> = (props) => {
  
    const verVideo = (video:VideosResult) => history.push({
      pathname: '/video',
      //search: '?query=abc',
      state: video
    });

    return (
      <Card style={{maxHeight:"340px"}}>
        <Card.Img variant="bottom" src={props.imagenURL} style={{ cursor: "pointer", display: "inline" }}  onClick={()=>verVideo(props)}/>
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


