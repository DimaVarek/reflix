import HomeButton from "./HomeButton";
import UserInfo from "./UserInfo";
import { useEffect, useState } from "react";
import FilmsList from "./FilmsList";
import './CatalogPage.css'
import Modal from "./Modal";

export default function CatalogPage(props) {
    let [searchRequest, setSearchRequest] = useState('')
    let [films, setFilms] = useState([])
    let [showModal, setShowModal] = useState(false)
    let [modalName, setModalName] = useState("")

    const addMovie = (movie) => {
        props.addMovie(props.currentUserId, movie, 3)
        setModalName(movie.title)
        ShowModal()
    }
    const remoteMovie = (movie) => {
        props.remoteMovie(props.currentUserId, movie, 3)
    }
    const ShowModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        async function getFilms (searchStr) {
            let filmsPromise = ''
            if (searchStr.length === 0) {
                filmsPromise = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=410b95e306440756dde848e541f1b6fb')
                filmsPromise = await filmsPromise.json()
            }
            else {
                filmsPromise = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchStr}&api_key=410b95e306440756dde848e541f1b6fb`)
                filmsPromise = await filmsPromise.json()
            }
            filmsPromise = filmsPromise.results.map(movie => {
                return {
                    id: movie.id,
                    title: movie.title,
                    image: "https://image.tmdb.org/t/p/w300/" + movie.poster_path
                }
            })
            setFilms(filmsPromise)
        }
        getFilms(searchRequest)
    }, [searchRequest])

    const changeSearch = (event) => {
        setSearchRequest(event.target.value)
    } 

    const getShowedMovies = () => {
        return [...films].filter(movie => {
            return props.users[props.users.findIndex(user => user.id == props.currentUserId)].rented
                .findIndex(rentedMovie => rentedMovie.id === movie.id) === -1
        })
    }

    return (
        <div className="catalog-page">
            <HomeButton />
            {showModal? <Modal modalName={modalName} close={closeModal}/>: ""}
            <UserInfo user={props.users[props.users.findIndex(user => user.id == props.currentUserId)]} />
            <input className="search" onChange={changeSearch}></input>
            <div className="rented-list">
                <h3>Rented: </h3>
                <FilmsList films={props.users[props.users.findIndex(user => user.id == props.currentUserId)].rented} changeEvent={remoteMovie} changeSymbol={'-'}/>
            </div>
            <div className="movies-list">
                <h3>Movies: </h3>
                <FilmsList films={getShowedMovies()} changeEvent={addMovie} changeSymbol={'+'}/>
            </div>
        </div>
    )
}