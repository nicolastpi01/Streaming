import React, { createRef, useState } from 'react';
import { sendVideo } from "../APIs/mediaAPI";
import { Form, Button } from 'react-bootstrap';
import FormFileInput from 'react-bootstrap/FormFileInput';


const ViewUser : React.FC = (props) => {
    //const [archivo, setArchivo] = useState<any[]>([]);
    const selectedFiles = createRef<HTMLInputElement>()
    const selectedImagen = createRef<HTMLInputElement>()//useState<FormFileInput>();
    const selectedVideo = createRef<HTMLInputElement>()//useState<FormFileInput>();
    const [nombre, setNombre] = useState<string|undefined>();
    const [descripcion, setDescripcion] = useState<string|undefined>();
    const [videoNuevo, setvideoNuevo] = useState<File|undefined>();
    const [imagenNueva, setimagenNueva] = useState<File|undefined>();

    /*
    const onChangeHandler = () => {//(selectedFiles:FormFileInput)=>{
        
        if( selectedFiles === undefined || 
            selectedFiles.current === undefined ||
            selectedFiles.current == null ||
            selectedFiles.current.files == null ||
            selectedFiles.current.files.length !== 2 ) return;
        let videoIndice = selectedFiles.current.files[0].type.startsWith("video")? 0 :
            selectedFiles.current.files[1].type.startsWith("video")? 1:
            -1;
        let imagenIndice = selectedFiles.current.files[0].type.startsWith("image")? 0 :
            selectedFiles.current.files[1].type.startsWith("image")? 1:
            -1;
        if(videoIndice  !== -1 ) setvideoNuevo( selectedFiles.current.files[videoIndice]);
        if(imagenIndice !== -1)  setimagenNueva(selectedFiles.current.files[imagenIndice]);
    }*/

    const onChangeMediaHandler = (tipo:string, media:any, setMedia:any) => {
        if( media === undefined || 
            media.current === undefined ||
            media.current == null ||
            media.current.files == undefined ||
            media.current.files == null ||
            media.current.files.length != 1) return;
        console.log(media.current)
        console.log(media.current.files)
        const archivo = media.current.files[0];
        if(archivo.type.startsWith(tipo) ) setMedia(archivo);
    }

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        console.log("AL MENOS ME APRETARON")
        if( nombre === undefined ) 
        {
            console.log("NOMBRE UNDEFINED")
            await delay(30000000000000000000000000000000000000000000000000000000000000000000000000000000000);
            return;
        }
        if( imagenNueva === undefined) return; 
        if( videoNuevo  === undefined) return;
        /*
            {
                console.log("SELECTED FILES NO FILES LENGTH")
            await delay(30000000000000000000000000000000000000000000000000000000000000000000000000000000000);
            return;
            }
            
        let videoIndice = selectedFiles.current.files[0].type.startsWith("video")? 0 :
            selectedFiles.current.files[1].type.startsWith("video")? 1:
            -1;
        let imagenIndice = selectedFiles.current.files[0].type.startsWith("image")? 0 :
            selectedFiles.current.files[1].type.startsWith("image")? 1:
            -1;
        if(videoIndice === -1 || imagenIndice === -1) return;
        
        */
        const data = new FormData()
        data.append('video', videoNuevo);
        data.append('imagen', imagenNueva);
        data.append('nombre', nombre);
        //data.append('descripcion', descripcion); agregar
        let res = sendVideo(data);
        
        event.preventDefault();
    }

    return <>
    <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Nombre"
                value={nombre} 
                onChange={(e:any)=>setNombre(e.currentTarget.value)}
            />
            <Form.Label>Descripcion</Form.Label>
            <Form.Text > </Form.Text>
            <Form.Control placeholder="Descripcion"/>
        </Form.Group>
        <input type="file" id="formcheck-api-custom" accept='.png' className="form-group files"
            ref={selectedImagen} onChange={()=>onChangeMediaHandler("image",selectedImagen, setimagenNueva)} />
        <input type="file" id="formcheck-api-custom" accept='.mp4' className="form-group files"
            ref={selectedVideo} onChange={()=>onChangeMediaHandler("video", selectedVideo, setvideoNuevo)} />
        <fieldset disabled>
        <Form.Group>
            <Form.Label htmlFor="disabledTextInput">Imagen</Form.Label>
            <Form.Control placeholder={imagenNueva?imagenNueva.name:"Inserte una imagen"}/>

        </Form.Group>
        <Form.Group>
            <Form.Label htmlFor="disabledTextInput">Video</Form.Label>
            <Form.Control placeholder={videoNuevo?videoNuevo.name:"Inserte un video"}/>
        </Form.Group>
        </fieldset>
        <Button type="submit">Subir contenido</Button>
    </Form>
    <form onSubmit={handleSubmit}>
            <label>Inserte video:</label>
            <input type="text" required={true} value={nombre} onChange={e=>setNombre(e.currentTarget.value)}/>
            
        <button type="submit" className="btn btn-success btn-block">Publicar</button>
    </form>
    </>
}
/*  
<input type="file" multiple className="form-group files" ref={selectedFiles} onChange={()=>onChangeHandler()} />


<Form.File id="formcheck-api-custom" accept='.txt' className="form-group files" custom>
                <Form.File.Input as="input" ref={(ref) =>  setImagen(ref)} buttonAfter={} />
                <Form.File.Label data-browse="Button text">
                    Custom file input
                </Form.File.Label>
            </Form.File> */
export default ViewUser;
