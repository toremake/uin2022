export default function Search({search, setSearch, setActiveSearch, getMovies}) {

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }
    return(
    <div className="searchbox">
        <label><span>Søk etter film</span>
            <input type="text" value={search} onChange={handleSearchChange} />
        </label>
        <button type="button" onClick={getMovies}>Søk</button>
    </div>
    )
}