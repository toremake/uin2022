import {useEffect, useState} from 'react'
import Movies from './Movies';
import Search from './Search';

export default function Main() {
    /* 
     * STATES 
     * movies: lagrer returnert data fra api
     * search: holder verdien fra søkefelt
     * page: sørger for muligheten til å bla i treff fra api (viser kun 10 filmer av gangen, men har paginering, ref http://www.omdbapi.com/ > parameters)
     * activeSearch: viser om et søk er aktivt. Brukes for grensesnittoppdateringer
     * searchString: lagrer search-staten når søkeknapp trykkes for å vise aktiv søkestreng i grensesnitt
    */
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [activeSearch, setActiveSearch] = useState(false)
  const [searchString, setSearchString] = useState("")

  /*TMA: Initielt API-call for å hente Star Wars dersom det ikke finnes et aktivt søk */
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=4e4535d6&s=star wars&type=movie&page=${page}`)
    .then((response) => response.json())
    .then((data) => setMovies(data))
  },[])

  /* 
   * TMA: Funksjon ved trykk på søkeknapp 
   * Trykk på søkeknapp initierer et (nytt) søk, altså må
   * page settes tilbake til 1, activeSearch bli true
   * og searchString må lagres
   */
  const getMovies = async () => {
    if(search === "") {
        return null;
    }
    const response = await fetch(`https://www.omdbapi.com/?apikey=4e4535d6&s=${search}&type=movie&page=1`)
    if(response.ok) {
        const data = await response.json()
        setMovies(data)
        setPage(1)
        setActiveSearch(true)
        setSearchString(search)
    } else {
      alert("Noe feilet i APIet");
    }
  }

  return (
    <main>
        <h1><img src="movie-tape-icon-32-145165.png" alt="Filmsøk" /> Filmsøk</h1>
        <Search search={search} setSearch={setSearch} getMovies={getMovies} setActiveSearch={setActiveSearch} />
        <Movies movies={movies} page={page} setPage={setPage} setMovies={setMovies} search={search} activeSearch={activeSearch} setSearchString={setSearchString} searchString={searchString} />
    </main>
  )
}