import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './CatalogPage.css'
import './MoviePage.css'

export default function MoviePage() {
    let [movie, setMovie] = useState({
        title: "",
        overview: "",
        image: "",
        adult: "",
        budget: "",
        genres: ""
    })

    let {movieid} = useParams()

    useEffect(() => {
        async function getMovie (id) {        
            let moviePromise = await fetch(`https://api.themoviedb.org//3/movie/${id}?api_key=410b95e306440756dde848e541f1b6fb`)
            moviePromise = await moviePromise.json()
            setMovie({
                title: moviePromise.original_title,
                overview: moviePromise.overview,
                image: "https://image.tmdb.org/t/p/w300/" + moviePromise.poster_path,
                adult: moviePromise.adult? "18+": "for everyone",
                budget: moviePromise.budget != 0? moviePromise.budget.toLocaleString() + "$": "???",
                genres: moviePromise.genres.map(genre => genre.name).join(", ")

            })
        }
        getMovie(movieid)
    }, [])
    return (
        <div className="moviePage">
            <Link to={"/catalog"}>
                <button className="back-button">Back</button>
            </Link>
            <div className="movie-container">
                <div className="movie-container-inner">
                    <div className="image-container">
                        <img src={movie.image}/>
                    </div>
                    <p><span className="label-span">Title: </span>{movie.title}</p>
                    <p><span className="label-span">Overview: </span>{movie.overview}</p>
                    <p><span className="label-span">Age: </span>{movie.adult}</p>
                    <p><span className="label-span">Budget: </span>{movie.budget}</p>
                    <p><span className="label-span">Genres: </span>{movie.genres}</p>    
                </div>
            </div>
        </div>
    )
}