import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const UserNav = () => {
    //hook that gives you access to the navigate function in react and this commands the DOM to navigate somewhere at that moment in the function
    //useNavigate is different from Link since link tells the DOM where to go if the user clicks the link
    const navigate = useNavigate()

    //links across the nav bar for the user's view that go to the "home.com/example" which then renders that component
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">View All Meet Ups</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Add a New Meet Up</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/managemeetups">Manage Meet Ups</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">View Saved Meet Ups</Link>
            </li>
          
            {
                localStorage.getItem("class_app_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("class_app_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

