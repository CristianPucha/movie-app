import img from "./components/img/Logo.png"
import './App.css';
import Movie from './components/Movie'
import { useEffect, useState} from "react";

const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHAPI =
"https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {

  const [ movies , setMovies] = useState ([]);
  const [ searchTerm , setSearchTerm] = useState ("");

  useEffect( () => {
    getMovies(APIURL)       // Aca llamo a la funcion que hace el fetch y le paso de parametro, el endpoint de la api que trae todas las pelis
  }, [] )

  const getMovies = (API) => {            // Creo la funcion que hace el fetch para no repetirlo
    fetch(API)
    .then(response => response.json())
    .then(data => {
        setMovies(data.results);
      });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    getMovies(SEARCHAPI + searchTerm)   // Aca llamo la funcion del fetch, pero le paso el endpoint de busqueda de la api, mas lo que escribe la persona en el input de buscar

    

      setSearchTerm("")

  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);

  }


  return (
    <>
    <header>
    <img src={img} alt="Logo" className="logo" />


      <form onSubmit={handleOnSubmit} className="alignform">
          <input className='search' type="text" placeholder='Search' value = {searchTerm}  onChange = {handleOnChange} />
      </form>
        
      </header>

    <div className='movie-container'>
      
      {movies.map((movie) => 
        <Movie {...movie} key = {movie.id} />
     )}

      
    </div>

    </>
  );
}

export default App;
