import { Link } from "react-router-dom";

export default function HomeButton() {
    return (
        <Link to="/"><button className="home-button">Home</button></Link>
    )
}