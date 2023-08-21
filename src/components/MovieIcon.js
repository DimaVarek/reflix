import { Link } from "react-router-dom";

export default function MovieIcon ({movie, changeEvent, changeSymbol}) {
    return (
        <div className="movie-icon" style={{ 
            backgroundImage: `url(${movie.image})` 
          }}>
            <button onClick={() => changeEvent(movie)}>{changeSymbol}</button>
            <Link to={"/movie/" + movie.id}>
                <div className="link-place">

                </div>
            </Link>
        </div>
    )
}