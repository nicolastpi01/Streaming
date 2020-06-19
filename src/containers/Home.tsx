import React, { useEffect, useState } from 'react';
import { VideosResult } from '../types/VideosResult';
import { searchSugestions, searchVideos, searchAllVideos, getImagen } from '../APIs/mediaAPI';
import {ListGroup} from 'react-bootstrap';
import { useAuth0 } from '../react-auth0-spa';
import VideoCard from '../components/VideoCard';
//import { Pagination } from '../components/Pagination';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
        //justify: "justify-items-center",
        //row justify-content-center justify-items-center
      },
    },
  }),
);


const Home : React.FC = () => {
    
    
    const [catalogo, setCatalogo] = useState<VideosResult[]>([]);
    const [search, setSearch] = useState<string>("")
    const [searchSugestion, setSearchSugestion] = useState<string[]>([])
    const [show, setShow] = useState(false);
    //const { getTokenSilently } = useAuth0();

    // FOR PAGINING
    const [offset, setOffset] = useState<number>(0) // cantidad de videos por pagina
    const [size, setSize] = useState<number>(0) // cantidad de videos totales
    //const [pages, setPages] = useState<number[]>([]) // todas las paginas, por ejemplo: [0,1,2,3,4,5,6]
    const [pages, setPages] = useState<number>()
    const [currentPage, setCurrentPage] = useState<number>(1) // La pagina donde esta, si cambia onScroll currentPage ++
    //const [pagesToDisplay,] = useState(4)




  // NUEVO INTENTO PAGINADO
  const classes = useStyles();
  //const [page, setPage] = React.useState(1);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
    

  // Llama a la API que busca todos los videos
 const getAllVideos = async (page: number) => {
      
  searchAllVideos(page).then(result => {
    result.page.forEach( (videores :VideosResult) => 
          videores.imagenURL = getImagen(videores.indice.toString())
        );
    setCatalogo(result.page)
    setOffset(result.offset)
    setSize(result.size)
    setPages(Math.ceil(result.size / result.offset))
  }).catch((e) => {})     
} 


useEffect((() => 
  {
    document.title = "Home"
    console.log("THE CURRENT PAGE: " + currentPage)
    getAllVideos(currentPage)
    
  }), [currentPage]);

  /*
    const calculatePages = (cantPaginas: number) => {
          var paginas :number[] = [];
          for (var i = 0; i < cantPaginas; i++) {
            paginas.push(i)
         }
          return paginas
    }
  */

    // Llama a la API que busca las sugerencias
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
      //if(event.target.value === "") handleBlur() cuando el campo queda vacio deberia borrar las sugerencias
      setSearch(event.target.value);
      getSugestions();
      
    }

    // Llama a la API para obtener las sugerencias
    const getSugestions = async () => {
      searchSugestions(search).then(sugestions =>{
        setSearchSugestion(sugestions)
      }).catch((e:any) => {
        console.log("ERROR BUSCANDO LAS SUGERENCIAS" + e);
      });
    }
  
    // Llama a la API que busca los videos
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      searchVideos(search).then(videos =>{
        setCatalogo(videos)
        setSearchSugestion([])
      }).catch(e => {console.log("ERROR BUSCANDO LOS VIDEOS" + e)})
    }

    // ES IGUAL A LA DE ARRIBA
    const searchFromClicked = () => {
      searchVideos(search).then(videos =>{
        setCatalogo(videos)
        setSearchSugestion([])

      }).catch(e => {
        console.log("ERROR BUSCANDO LOS VIDEOS DESDE LA LISTA DE SUGERENCIAS" + e)
      }) 
    }

    
    const handleBlur = () => {
      setSearchSugestion([])
    }
    
    return (
      <div className="container-fluid">


        <div className="container-fluid" style={{textAlign:"center", marginTop:"3px"}}>
          <form onSubmit={handleSubmit} data-testid="busqueda-recomendaciones-submit" onBlur={handleBlur}> {/* ESTA ANDANDO MAL EL ONBLUR*/}
            <input type="text" placeholder="Buscar.." value={search} onChange={handleChange} data-testid="busqueda-recomendaciones-texto" style={{width:"410px"}} />
            <input type="submit" value="&#128269;" data-testid="busqueda-recomendaciones-boton" />
          </form>

          <ListGroup style={{marginLeft:"38%", width:"24%"}}>
            {searchSugestions.length > 0 ? searchSugestion.map(search => 
              <ListGroup.Item action onClick={searchFromClicked} >
                    {search}
              </ListGroup.Item>) : <option>Sin datos</option>
            }
            
          </ListGroup>

        </div>
      

      <div className="row justify-content-center justify-items-center" style={{textAlign:"center"}}>
          {
            catalogo.length > 0 ?

            
              catalogo.map((video) =>
                  
              <VideoCard {...video}/>
                                                   
              )
             : <h1>No hay resultados para su búsqueda</h1>
              
          }   
      </div>

       <br></br>
      <div className="row justify-content-center justify-items-center">
        <div className={classes.root} style={{textAlign: "center"}}>
          <Typography >Total: {size}</Typography>
          <Pagination count={pages} page={currentPage} onChange={handleChangePage} size= {"large"} color={"standard"} />
        </div>
      </div> 



    </div>  
    )
}

export default Home