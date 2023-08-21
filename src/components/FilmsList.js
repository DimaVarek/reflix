import MovieIcon from "./MovieIcon"

export default function FilmsList ({films, changeEvent, changeSymbol}) {
    return (
        <div className="movies">
                {films.map(movie => <MovieIcon movie={movie} changeEvent={changeEvent} changeSymbol={changeSymbol} key={movie.id}/>)}
        </div>
    )
}