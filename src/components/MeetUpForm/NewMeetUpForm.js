import { type } from "@testing-library/user-event/dist/type"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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

    const [type, setType] = useState([])
    useEffect(() => {
        fetch('http://localhost:8088/type')
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
            neighborhood: meetup.neighborhoodId,
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
                navigate("/")
            })
    }

    //new meet up form
    return (
        <form className="meetUpForm">
            <h2 className="meetupForm__title">Add a New Meet Up</h2>
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
                        Meetup Type:
                        {type.map((type) => {
                            return (
                                <div key={type.id} className="radio">
                                    <label>
                                        <input
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
                        placeholder="Where are we meeting?"
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
                        placeholder="Enter the street address"
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
                        Neighborhood:
                        {neighborhoods.map((neighborhoods) => {
                            return (
                                <div key={neighborhoods.id} className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            name="neighborhoods"
                                            value={neighborhoods.id}
                                            checked={meetup.neighborhoodId === neighborhoods.id} // The checked attribute accepts a true of false value. Here we say this should be checked if the userChoices.seasonId matched the id of the season this radio button represents
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
                        className="form-control"
                        value={meetup.date}
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
                        className="form-control"
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
                    {/* creates text box for user to input the name of their meetup, then assigns that as meetup.title */}
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
                Save Mood
            </button>
        </form>
    )
}