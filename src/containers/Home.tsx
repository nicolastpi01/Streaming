import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { VideosResult } from '../types/VideosResult';
import { searchSugestions, searchVideos, searchAllVideos } from '../APIs/mediaAPI';
import { CardGroup, Card, CardDeck } from 'react-bootstrap';

const Home : React.FC = () => {
    
    const [reproductor,setreproductor] = useState<any>()
    const [catalogo, setCatalogo] = useState<VideosResult[]>([]);
    const [search, setSearch] = useState<string>("")
    const [searchSugestion, setSearchSugestion] = useState<string[]>([])
    const [show, setShow] = useState(false);

    // FOR PAGINING
    const [offset, setOffset] = useState<number>(1) // cantidad de videos por pagina
    const [size, setSize] = useState<number>(0) // cantidad de videos totales
    const [pages, setPages] = useState<number[]>([]) // todas las paginas, por ejemplo: [0,1,2,3,4,5,6]
    const [currentPage, setCurrentpage] = useState<number>(0) // La pagina donde esta, si cambia onScroll currentPage ++
    const [scroll, setScroll] = useState<boolean>(false) // Controla si el usuario scrolleo para ver más videos. Arranca en false, no scrolleo
    // FOR PAGINING

    

    useEffect(() => {
      
      getAllVideos(0)
      
    }, []);

    
    // Llama a la API que busca todos los videos
    const getAllVideos = async(page: number) => {
      searchAllVideos(page).then(result => {
        setCatalogo(result.page)
        setOffset(result.offset)
        setSize(result.size)
        setPages(calculatePages(Math.ceil(result.size / result.offset)))
        
      }).catch((e) => {console.log(); setShow(true)} )
    }

    const calculatePages = (cantPaginas: number) => {
          var paginas :number[] = [];
          for (var i = 0; i < cantPaginas; i++) {
            paginas.push(i)
         }
          return paginas
    }

    // Llama a la API que busca las sugerencias
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      //console.log("Division con barra: " + Math.ceil(size / offset));
      console.log(pages);
      //console.log(event.target.value);
      setSearch(event.target.value);
      getSugestions();
    }

    // Llama a la API para obtener las sugerencias
    const getSugestions = async () => {
      searchSugestions(search).then(sugestions =>{
        setSearchSugestion(sugestions)
        //console.log(sugestions)
      }).catch(e => console.log("ERROR BUSCANDO LAS SUGERENCIAS" + e))
    }
  
    // Llama a la API que busca los videos
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      searchVideos(search).then(videos =>{
        setCatalogo(videos)
        //onCambioVideo(parseInt(videos[0].indice)) // Despues se tiene que sacar !!!!
        console.log(videos)
      }).catch(e => console.log("ERROR BUSCANDO LOS VIDEOS" + e))
      event.preventDefault();
    }

    function sourceurl(id: string){
      return "https://localhost:5001/api/Video/getFileById?fileId="+ id
    }


    return <div>


        <form onSubmit={handleSubmit}>
          <input type="text" value={search} onChange={handleChange}/>
          <input type="submit" value="&#128269;"/>
        </form>

        <select value={search} defaultValue="" onChange={e => setSearch(e.currentTarget.value)}>
            {searchSugestions.length > 0 ? searchSugestion.map(s => <option value={s}>{s}</option>) : <option value={""}>Sin datos</option>}
        </select>


        <br></br>
        <br></br>
        <br></br>

        <div className="row">
          
        
          {
            
            catalogo.length > 0 ? 
              catalogo.map(video =>
                
                <div className="col-sm-3">
                                              
                    <Card style={{ height: '25rem' }}>
                    
                    <Card.Body>
                      <Card.Title>{video.nombre}</Card.Title>
                      
                      <ReactPlayer style={{ }}
                        ref={(player:any) => setreproductor(player) }
                        width={"small"}
                        height={"small"}
                        url={sourceurl(video.indice.toString())}
                        controls={true}
                        fluid={true}
                      >
                      </ReactPlayer>    
                      <Card.Text>
                        {video.descripcion.slice(0,20)}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">{video.autor}</small>
                      <br></br>
                      <small className="text-muted">Subido hace 15 minutos</small>
                    </Card.Footer>
                  </Card>   
              </div>)
             : <h1>No hay resultados para su busqueda</h1>
              
          }
          
          </div>

      <br></br>
      <br></br>
      <br></br>
      </div>
}

export default Home