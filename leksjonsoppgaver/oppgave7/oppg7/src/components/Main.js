import {useEffect, useState} from 'react'
import Movies from './Movies';
import Search from './Search';

export default function Main() {

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [activeSearch, setActiveSearch] = useState(false)
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=4e4535d6&s=star wars&type=movie&page=${page}`)
    .then((response) => response.json())
    .then((data) => setMovies(data))
  }, [])

  const getMovies = async () => {
    if(search === "") {
        return null;
    }
    const response = await fetch(`https://www.omdbapi.com/?apikey=4e4535d6&s=${search}&type=movie&page=${page}`)
    if(response.ok) {
        const data = await response.json()
        setMovies(data);
        setActiveSearch(true)
        setSearchString(search)
    } else {
      alert("Noe feilet i APIet");
    }
  }

  return (
    <main>
        <h1>Filmsøk</h1>
        <Search search={search} setSearch={setSearch} getMovies={getMovies} setActiveSearch={setActiveSearch} />
        <Movies movies={movies} page={page} setPage={setPage} setMovies={setMovies} search={search} activeSearch={activeSearch} setSearchString={setSearchString} searchString={searchString} />
    </main>
  )
}