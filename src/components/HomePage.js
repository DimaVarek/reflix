import User from "./User";
import './HomePage.css'

export default function HomePage({users, setCurrentUserId}) {
    return (
        <div className="home-page">
            {users.map(user => <User name={user.name} 
                id={user.id} 
                setCurrentUserId={setCurrentUserId} 
                key={user.id} />)}
        </div>
    )

}