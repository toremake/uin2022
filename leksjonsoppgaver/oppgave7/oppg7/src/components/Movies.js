import Movie from "./Movie";

export default function Movies({movies, setMovies, page, setPage, search, activeSearch, searchString, setSearchString}) {
    /* 
     * TMA: oppdatert apikall når forrige/neste treff-knapper trykkes.
     * Tar imot totalResults fra returnert api-objekt for utregning.
     * sørger for å ikke utføre noe dersom vi befinner oss på første eller siste side
     */
    const handlePages = async (amount) => {
        const totalPages = Math.ceil(movies.totalResults / 10);
        const newPage = page - amount;

        if((page - amount) === 0 || newPage === (totalPages + 1)) {
            return null;
        } else {
            console.log("Setting new page...");
            setPage((prev) => prev - amount);
            const response = await fetch(`https://www.omdbapi.com/?apikey=4e4535d6&s=${search}&type=movie&page=${newPage}`)
            if(response.ok) {
                const data = await response.json()
                setMovies(data);
            } else {
                alert("Noe feilet i APIet");
            }
        }
    }

    /* 
     * Klargjør en template literal for grensesnittet når søket blir aktivt. 
     * Viser antall treff, side og knapper for å bla i treff 
     * Denne er ikke perfekt enda.
     * */
    const hitsAndActions = <div className="searchactions"><button disabled={page === 1 ? true : false} className='prevMovies action' onClick={() => handlePages(1)}>Forrige 10</button><p>{movies.totalResults} treff for "{searchString}".<br />Viser film {page * 10 - 9} til {10 * page}<br />Side {page} av {Math.ceil(movies.totalResults / 10)}</p>  <button disabled={page === Math.ceil(movies.totalResults / 10) ? true : false} className='nextMovies action' onClick={() => handlePages(-1)}>Neste 10</button></div>;

    return(
        <>
        {activeSearch ? <div className="searchmeta">{hitsAndActions}</div> : null}
        <section id="movielist">
        {movies.Search?.map((movie) => <Movie key={movie.imdbID} movie={movie} />)}
        </section>
        {/*{activeSearch ? <p>{!movies.totalResults ? 0 : movies.totalResults} treff.  {movies.totalResults > 10 ? hitsAndActions : null}</p> : null}*/}
        </>
    )
}