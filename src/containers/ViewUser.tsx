import React, { createRef, useState } from 'react';
import { sendVideo } from "../APIs/mediaAPI";
import { Form, Button, Card } from 'react-bootstrap';



const ViewUser : React.FC = (props) => {
    const selectedImagen = createRef<HTMLInputElement>()
    const selectedVideo = createRef<HTMLInputElement>()
    const [nombre, setNombre] = useState<string|undefined>();
    const [descripcion, setDescripcion] = useState<string|undefined>();
    const [videoNuevo, setvideoNuevo] = useState<File|undefined>();
    const [imagenNueva, setimagenNueva] = useState<File|undefined>();
    
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
        event.preventDefault();
        console.log("AL MENOS ME APRETARON")
        if( nombre === undefined ) 
        {
            console.log("NOMBRE UNDEFINED")
            await delay(30000000000000000000000000000000000000000000000000000000000000000000000000000000000);
            return;
        }
        if( imagenNueva === undefined) return; 
        if( videoNuevo  === undefined) return;

        const data = new FormData()
        data.append('video', videoNuevo);
        data.append('imagen', imagenNueva);
        data.append('nombre', nombre);
        //data.append('descripcion', descripcion); agregar
        let res = sendVideo(data);
    }

    return <>
    <Card className="center mediapantalla">
        <Card.Img variant="top" style={{ margin: '5% auto' }} src={imagenNueva? URL.createObjectURL(imagenNueva):undefined} />
    <Card.Body>
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
        <Form.Group>
            <fieldset disabled>
                <Form.Label htmlFor="disabledTextInput">Imagen</Form.Label>
            </fieldset>
            <input 
                type="file"
                required
                id="formcheck-api-custom-imagen"
                accept='.png'
                className="form-group files"
                ref={selectedImagen}
                onChange={()=>onChangeMediaHandler("image",selectedImagen, setimagenNueva)}
            />
        </Form.Group>
        <Form.Group>
            <fieldset disabled>
                <Form.Label htmlFor="disabledTextInput">Video</Form.Label>
            </fieldset>
            <input 
                type="file"
                required
                id="formcheck-api-custom-video"
                accept='.mp4'
                className="form-group files"
                ref={selectedVideo}
                onChange={()=>onChangeMediaHandler("video", selectedVideo, setvideoNuevo)}
            />
        </Form.Group>

        <Button className="center" type="submit">Subir contenido</Button>
    </Form>
    </Card.Body>
    </Card>
    </>
}

export default ViewUser;
