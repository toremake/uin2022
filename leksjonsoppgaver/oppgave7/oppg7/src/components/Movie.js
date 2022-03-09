export default function Movie({movie}) {
    return (
        <article className="movie">
            <img src={movie.Poster === "N/A" ? "https://via.placeholder.com/600x866.png?text=No+Poster" : movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year} | #{movie.imdbID}</p>
            <p><a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${movie.imdbID}`}>Åpne IMDB-profil</a></p>
        </article>
    )
}