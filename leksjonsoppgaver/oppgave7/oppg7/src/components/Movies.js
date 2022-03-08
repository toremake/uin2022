import Movie from "./Movie";

export default function Movies({movies, setMovies, page, setPage, search, activeSearch, searchString, setSearchString}) {
    console.log(movies)
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

    const hitsAndActions = <> Viser treff {page * 10 - 9} til {10 * page} på side {page}. <button className='prevMovies' onClick={() => handlePages(1)}>Forrige 10</button> <button className='nextMovies' onClick={() => handlePages(-1)}>Neste 10</button></>;

    return(
        <>
        {activeSearch ? <p>{!movies.totalResults ? 0 : movies.totalResults} treff for "{searchString}".  {movies.totalResults > 10 ? hitsAndActions : null}</p> : null}
        <section id="movielist">
        {movies.Search?.map((movie) => <Movie key={movie.imdbID} movie={movie} />)}
        </section>
        {activeSearch ? <p>{!movies.totalResults ? 0 : movies.totalResults} treff.  {movies.totalResults > 10 ? hitsAndActions : null}</p> : null}
        </>
    )
}