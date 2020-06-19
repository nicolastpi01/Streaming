import React, { useState, useEffect} from 'react';
import './App.css';
import { Switch, Route, Router} from 'react-router';
import history from "./utils/history";
import { useAuth0 } from "./react-auth0-spa";
import NavBar from './containers/Navbar';
import Home from './containers/Home';
import ViewUser from './containers/ViewUser';
import Reproductor from './containers/Reproductor';
import { VideosResult } from './types/VideosResult';
import { getImagen, searchAllVideos } from './APIs/mediaAPI';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import VideoCard from './components/VideoCard';



const App : React.FC = () => {
const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();


const [catalogo, setCatalogo] = useState<VideosResult[]>([]);
const [show, setShow] = useState(false);

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


useEffect((() => 
  {
    document.title = "Home"
    //console.log("THE CURRENT PAGE: " + currentPage)
    getAllVideos(currentPage)
    
  }), []);

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
  

return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar/>
        </header>
        <body>

        <div className="container-fluid">

              {/* 
                <div className="container-fluid" style={{textAlign:"center", marginTop:"3px"}}>
                  <form onSubmit={handleSubmit} data-testid="busqueda-recomendaciones-submit" onBlur={handleBlur}> 
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
              */}

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

        <Switch>
          {/*<Route path="/" exact component={Home}/>
          todos los demas componentes deben tener Home abajo*/}
          {isAuthenticated? 
            <>
              <Route path="/profile" component={ViewUser} />
              <Route path="/video" component={Reproductor}/>
            </>:
            <></>}
        </Switch>
        </body>
      </Router>
    </div>
  );
}

/* volver a poner
     <Switch>
        <Route path="/" exact />
        <Route exact path="/startSession" component={ConfiguredHome} />
        <Route path="/register" component={Register}/>
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/Home" component={Home} />
      </Switch>
*/
export default App;


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