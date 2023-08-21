import { Link, redirect } from "react-router-dom"

export default function User({name, id, setCurrentUserId}) {
    const redirectCatalog = () => {
        setCurrentUserId(id)
    }
    return (
        <Link to='/catalog'>
            <div onClick={redirectCatalog} className="user">{name}</div>
        </Link>
    )
}