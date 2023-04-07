import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Form.css"

export const NewMeetUpForm = () => {
    //Using the useNavigation() hook so you can redirect the user at a specific time in a function
    const navigate = useNavigate()

    //brings user out of local storage to add to tag and can be used to determine if admin or not
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)

    //sets up the correct default properties we're creating to the initial state of the tag object
    const [meetup, update] = useState({
        "title": "",
        "typeId": null,
        "venue": "",
        "address": "",
        "neighborhoodId": null,
        "link": "",
        "date": null,
        "time": null,
        "isSaved": false,
        "description": "",
        "userId": null,
    })
    

    const [types, setType] = useState([])
    useEffect(() => {
        fetch('http://localhost:8088/types')
            .then((res) => res.json())
            .then((data) => {
                setType(data)
            })
    },
        []
    )

    const [neighborhoods, setNeighborhoods] = useState([])
    useEffect(() => {
        fetch('http://localhost:8088/neighborhoods')
            .then((res) => res.json())
            .then((data) => {
                setNeighborhoods(data)
            })
    },
        []
    )

    //adds the new tag to the database (POST) when the user clicks save
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // builds the object that will be saved with info that is submitted 
        const meetupToSendToAPI = {
            title: meetup.title,
            typeId: meetup.typeId,
            venue: meetup.venue,
            address: meetup.address,
            neighborhoodId: meetup.neighborhoodId,
            link: meetup.link,
            date: meetup.date,
            time: meetup.time,
            //isSaved: meetup.isSaved,
            description: meetup.description,
            userId: ClassAppUserObject.id
        }
        //POST fetch call that sends the meetup object to save in the database then navigates back to the list of tags when that's done
        return fetch('http://localhost:8088/meetups', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meetupToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/managemeetups")
            })
    }

    //new meet up form
    return <>
            <div className="head-name">
                <h1>Add a New Meet Up</h1>
            </div>
            <div className="form-page">
            <form className="meetUpForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="meetuptitle"><div className="meetuplabel">Meetup Title:</div></label>
                    {/* creates text box for user to input the name of their meetup, then assigns that as meetup.title */}
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What's the vibe?"
                        value={meetup.title}
                        onChange={
                            (event) => {
                                const copy = { ...meetup }
                                copy.title = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div>
                    <div className="meetuplabel">Meetup Type:</div>
                        {types.map((type) => {
                            return (
                                <div key={type.id} className="radio">
                                    <label>
                                        <input 
                                            className="radio"
                                            type="radio"
                                            name="type"
                                            value={type.id}
                                            checked={meetup.typeId === type.id} // The checked attribute accepts a true of false value. Here we say this should be checked if the userChoices.seasonId matched the id of the season this radio button represents
                                            onChange={(event) => {
                                                const copy = { ...meetup }
                                                copy.typeId = parseInt(event.target.value)
                                                update(copy)
                                            }}
                                        />
                                        {type.name}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="meetupvenue"><div className="meetuplabel">Venue:</div></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of meeting location."
                        value={meetup.venue}
                        onChange={
                            (event) => {
                                const copy = { ...meetup }
                                copy.venue = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="meetupaddress"><div className="meetuplabel">Address:</div></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Address of meeting location"
                        value={meetup.address}
                        onChange={
                            (event) => {
                                const copy = { ...meetup }
                                copy.address = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="meetupvenue"><div className="meetuplabel">Link to Venue:</div></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter a link for the venue"
                        value={meetup.link}
                        onChange={
                            (event) => {
                                const copy = { ...meetup }
                                copy.link = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div>
                    <div className="meetuplabel">Neighborhood:</div>
                        {neighborhoods.map((neighborhoods) => {
                            return (
                                <div key={neighborhoods.id} className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            name="neighborhoods"
                                            value={neighborhoods.id}
                                            checked={meetup.neighborhoodId === neighborhoods.id}
                                            onChange={(event) => {
                                                const copy = { ...meetup }
                                                copy.neighborhoodId = parseInt(event.target.value)
                                                update(copy)
                                            }}
                                        />
                                        {neighborhoods.name}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="meetupdate"><div className="meetuplabel">Date:</div></label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-date"
                        value={meetup.date}
                        format='MM-dd-yyyy'
                        onChange={
                            (event) => {
                                const copy = { ...meetup }
                                copy.date = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="meetuptime"><div className="meetuplabel">Time:</div></label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-time"
                        value={meetup.time}
                        onChange={
                            (event) => {
                                const copy = { ...meetup }
                                copy.time = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="meetupdescription"><div className="meetuplabel">Description:</div></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What are we doing?"
                        value={meetup.description}
                        onChange={
                            (event) => {
                                const copy = { ...meetup }
                                copy.description = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Meetup
            </button>
        </form>
        </div>
    </>
}