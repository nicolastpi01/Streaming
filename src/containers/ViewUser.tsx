import React, { useEffect, useState } from 'react';
import { sendVideo } from '../APIs/mediaAPI';
import ReactPlayer from 'react-player';
import { VideosResult } from '../types/VideosResult';
import { getVideo} from '../APIs/mediaAPI';
import { CardGroup, Card, CardDeck } from 'react-bootstrap';
import Paginacion, { Props as PagProps} from "../components/Paginacion";


const ViewUser : React.FC = (props) => {
    const [archivo, setArchivo] = useState<any[]>([]);
    //un mejor nombre: selectedFile

    const onChangeHandler = (event: React.FormEvent<HTMLInputElement>)=>{
        console.log(event.target);
        setArchivo([event.target]);
    }

    const onClickHandler = (event: React.FormEvent<HTMLButtonElement>)=>{
        const data = new FormData() 
        data.append('file', archivo[0]);
        let res = sendVideo(data,"hola");
        console.log(res);
    }

    return <>
    <div className="form-group files">
        <label>Pone el archivo bro</label>
        <input type="file" name="file" onChange={onChangeHandler}/>
    </div>
    <button type="button" className="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>
    </>
}

export default ViewUser;