export default function Search({search, setSearch, setActiveSearch, getMovies}) {

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }
    return(
    <>
        <label>Søk etter film
            <input type="text" value={search} onChange={handleSearchChange} />
        </label>
        <button type="button" onClick={getMovies}>Søk etter film</button>
    </>
    )
}