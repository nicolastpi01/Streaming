import React, { useEffect, useState, createRef } from 'react';
import { sendVideo } from '../APIs/mediaAPI';
import ReactPlayer from 'react-player';
import { VideosResult } from '../types/VideosResult';
import { getVideo} from '../APIs/mediaAPI';
import { CardGroup, Card, CardDeck } from 'react-bootstrap';
import Paginacion, { Props as PagProps} from "../components/Paginacion";


const ViewUser : React.FC = (props) => {
    //const [archivo, setArchivo] = useState<any[]>([]);
    const selectedFiles = createRef<HTMLInputElement>();
    const [nombre, setNombre] = useState<string|undefined>();

    const onChangeHandler = (event: React.FormEvent<HTMLInputElement>)=>{
        console.log(selectedFiles?
            (selectedFiles.current?
                selectedFiles.current.files
                :
                "no hay current")
            :"sin definir selectedFiles")

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        if( nombre === undefined ) return;
        if( selectedFiles === undefined || 
            selectedFiles.current === undefined ||
            selectedFiles.current == null ||
            selectedFiles.current.files == null ||
            selectedFiles.current.files.length != 2 )
            return;
        let videoIndice = selectedFiles.current.files[0].type.startsWith("video")? 0 :
            selectedFiles.current.files[1].type.startsWith("video")? 1:
            -1;
        let imagenIndice = selectedFiles.current.files[0].type.startsWith("image")? 0 :
            selectedFiles.current.files[1].type.startsWith("image")? 1:
            -1;
        if(videoIndice == -1 || imagenIndice == -1) return;

        const data = new FormData()
        data.append('video', selectedFiles.current.files[videoIndice]);
        data.append('imagen', selectedFiles.current.files[imagenIndice]);
        data.append('nombre', nombre);
        let res = sendVideo(data);
        console.log(selectedFiles.current);
        event.preventDefault();
    }

    return <>
    <form onSubmit={handleSubmit}>
            <label>Pone el archivo bro</label>
            <input type="text" required={true} value={nombre} onChange={e=>setNombre(e.currentTarget.value)}/>
            <input type="file" multiple className="form-group files" ref={selectedFiles} onChange={onChangeHandler}/>
        <button type="submit" className="btn btn-success btn-block">Publicar</button>
    </form>
    </>
}

export default ViewUser;