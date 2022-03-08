export default function Movie({movie}) {
    return (
        <article className="movie">
            <img src={movie.Poster === "N/A" ? "https://via.placeholder.com/600x866.png?text=No+Poster" : movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year} | #{movie.imdbID}</p>
        </article>
    )
}