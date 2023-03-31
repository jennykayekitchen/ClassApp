import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        isAdmin: false,
        accessCode: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("class_app_user", JSON.stringify({
                        id: createdUser.id,
                        admin: createdUser.isAdmin
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                //Duplicate email and admin access code doesn't match. 
                if (response.length > 0 && user.isAdmin === true && user.accessCode !== "TheChosenOnes") {
                    window.alert("Account with that email address already exists and you did not provide the correct access code for admin rights. Please try again.")
                    navigate("/register")
                }
                // Duplicate email and access doesn't match. 
                else if (response.length > 0 && user.accessCode !== "SummerOf61") {
                    window.alert("Account with that email address already exists and you did not provide the correct access code. Please try again.")
                    navigate("/register")               
                } 
                //Incorrect admin access code. 
                else if (user.isAdmin === true && user.accessCode !== "TheChosenOnes") {
                    window.alert("You did not provide the correct access code for admin rights. Please try again.")
                    navigate("/register")
                }
                //Duplicate email. 
                else if (response.length > 0) {
                    window.alert("Account with that email address already exists. Please try again.")
                    navigate("/register")
                }
                //Incorrect admin access code. 
                else if (user.isAdmin === false && user.accessCode !== "SummerOf61") {
                    window.alert("You did not provide the correct access code. Please try again.")
                    navigate("/register")
                }
                // Good email, create user.
                else {
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for the Class App</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name." required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email Address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Enter your email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Access Code </label>
                    <input onChange={updateUser} 
                        type="text" id="accessCode" className="form-control"
                        placeholder="Enter the access code provided by your admin." required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isAdmin = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isAdmin" />
                    <label htmlFor="email"> I am an admin. </label>
                </fieldset>
                
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

