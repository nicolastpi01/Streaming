import { VideosResult } from "../types/VideosResult";
import { Card } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import history from "../utils/history";
import '../App.css';     //poner className="tarjetavideo" en la Card
import { FaThumbsUp, FaThumbsDown, FaEye  } from 'react-icons/fa';
import { agregarMg } from "../APIs/mediaAPI";



type VideoCardProps = {
  videoResult: VideosResult,
  reload: React.Dispatch<React.SetStateAction<boolean>>,
}

    
const VideoCard: React.FC<VideoCardProps> = (props) => {

  
  
    const verVideo = (video: VideosResult) => history.push({
      pathname: '/video',
      //search: '?query=abc',
      state: video
    });

    
   

    const addMg = async (indice: number) => {
      console.log("indice" + props.videoResult.indice)
      await agregarMg({
        mediaId : indice
      }).catch( (e) => {
        console.log("Error agregando mg: " + e)
      })
      
      props.reload(true)
      
    }
    


    return (
      <Card style={{maxHeight:"500px"}}>
        <Card.Img variant="bottom" src={props.videoResult.imagenURL} style={{ cursor: "pointer", display: "inline" }}  onClick={()=>verVideo(props.videoResult)}/>
        <Card.Body>
          <Card.Title>{props.videoResult.nombre}</Card.Title>
          <Card.Text>
            {props.videoResult.descripcion.slice(0,20)}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{props.videoResult.autor}</small>
          <br></br>
          <small className="text-muted">Creado en: {props.videoResult.fechaCreacion}</small>
          <br></br>
          <div className="row float-right">
            <span title="me gusta" style={{cursor: "pointer", display: "inline"}} onClick={() => addMg(props.videoResult.indice) }>
                <p>{props.videoResult.meGusta}<FaThumbsUp/></p>
            </span>
            <span title="no me gusta" style={{cursor: "pointer", display: "inline" }} onClick={() =>{} }>
              <p>{props.videoResult.noMeGusta}<FaThumbsDown/></p>
            </span>
          </div>
          
            <div className="float-left">
              <p>visitas: {props.videoResult.vistas}</p>
            </div>
            
        </Card.Footer>
      </Card>   
    )    
}

export default VideoCard;


