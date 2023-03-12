import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewMeetUpForm = () => {
    //Using the useNavigation() hook so you can redirect the user at a specific time in a function
    // const navigate = useNavigate()
    
    // //brings user out of local storage to add to tag and can be used to determine if admin or not
    // const localClassAppUser = localStorage.getItem("class_app_user")
    // const ClassAppUserObject = JSON.parse(localClassAppUser)

    // //sets up the correct default properties we're creating to the initial state of the tag object
    // const [] = useState({
    //     "name": "",
    //     "userId": null,
    //     "isFavorite": false
    // })

    // //adds the new tag to the database (POST) when the user clicks save
    // const handleSaveButtonClick = (event) => {
    //     event.preventDefault()

    //     // builds the object that will be saved with info that is submitted 
    //     const tagToSendToAPI = {
    //         name: tag.name,
    //         userId: myVersionUserObject.id,
    //         isFavorite: tag.isFavorite
    //     }
    //     //POST fetch call that sends the tag object to save in the database then navigates back to the list of tags when that's done
    //     return fetch(`http://localhost:8088/tags`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(tagToSendToAPI)
    //     })
    //         .then(response => response.json())
    //         .then(() => {
    //             navigate("/managetags")
    //         })
    // }

    // //new meet up form
    // return (
    //     <form className="meetUpForm">
    //         <h2 className="tagForm__title">Add a New Meet Up</h2>
    //     </form>
    // )
}