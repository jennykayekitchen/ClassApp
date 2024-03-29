import { useEffect, useState } from "react"
import moment from "moment"
import "./Meetup.css"


export const ManageIndividualMeetUp = ({ meetup, meetups, setMeetups, meetupId, }) => {
    //formats the date and time to be readable using the moment extension
    let meetupDate = moment(meetup.date).format('MM-DD-YYYY')
    let meetupTime = moment(meetup.time, 'HH:mm').format('hh:mm a')


    // says whether or not the meetup is in "edit" mode, set to false when the page loads and will turn to true if user clicks Update Meetup
    const [editMode, setEditMode] = useState(false)

    // when Edit button is clicked, it sets the edit mode to true, and displays the form for updating the meetup
    const handleEditClick = () => {
        // enters edit mode
        setEditMode(true)
    }

    //gets the info for the meetup type
    const [types, setTypes] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/types`)
                .then(response => response.json())
                .then((data) => {
                    setTypes(data)
                })
        },
        []
    )
    
    //gets the info for the meetup neighborhood
    const [neighborhoods, setNeighborhoods] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/neighborhoods`)
                .then(response => response.json())
                .then((data) => {
                    setNeighborhoods(data)
                })
        },
        []
    )

    // when in edit mode, it will hold the updated meetup info, and is originally set to what the current info is
    const [editedTitle, setEditedTitle] = useState(meetup.title)
    const [editedDate, setEditedDate] = useState(meetup.date)
    const [editedTime, setEditedTime] = useState(meetup.time)
    const [editedTypeId, setEditedTypeId] = useState(meetup.typeId)
    const [editedVenue, setEditedVenue] = useState(meetup.venue)
    const [editedAddress, setEditedAddress] = useState(meetup.address)
    const [editedNeighborhoodId, setEditedNeighborhoodId] = useState(meetup.neighborhoodId)
    const [editedDescription, setEditedDescription] = useState(meetup.description)
    const [editedLink, setEditedLink] = useState(meetup.link)

    // when these fields are changed, it sets the database to what is in that field
    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value)
    }

    const handleTypeIdChange = (event) => {
        setEditedTypeId(event.target.value)
    }

    const handleDateChange = (event) => {
        setEditedDate(event.target.value)
    }

    const handleTimeChange = (event) => {
        setEditedTime(event.target.value)
    }

    const handleVenueChange = (event) => {
        setEditedVenue(event.target.value)
    }

    const handleAddressChange = (event) => {
        setEditedAddress(event.target.value)
    }

    const handleNeighborhoodIdChange = (event) => {
        setEditedNeighborhoodId(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setEditedDescription(event.target.value)
    }

    const handleLinkChange = (event) => {
        setEditedLink(event.target.value)
    }

    // when the Cancel button is clicked, it resets everything to what is already in the database then exits edit mode
    const handleCancelEditClick = () => {
        // resets the edited meetup info to what it was and doesn't change anything
        setEditedTitle(meetup.title)
        setEditedTypeId(meetup.typeId)
        setEditedDate(meetup.date)
        setEditedTime(meetup.time)
        setEditedVenue(meetup.venue)
        setEditedAddress(meetup.address)
        setEditedNeighborhoodId(meetup.neighborhoodId)
        setEditedDescription(meetup.description)
        setEditedLink(meetup.link)
        
        //exits edit mode
        setEditMode(false)
    }

    // when the delete button is clicked, the meetup is deleted
    const handleDeleteButtonClick = () => {
        return fetch(`http://localhost:8088/meetups/${meetupId}`, {
            method: "DELETE"
        })
            .then(() => {
                // creates a new array that doesn't include the meetup that was just deleted
                const updatedMeetups = meetups.filter(meetup => meetup.id !== meetupId);
                // sets the new list of meetups to to the array without the deleted tag
                setMeetups(updatedMeetups)
            })
    }

    // when the Save Changes button is clicked, it sends the updates to the database
    const handleSaveChangesButtonClick = () => {
        // creates a new meetup object with the updated info that is pulled form the JSX form
        const updatedMeetup = {
            id: meetupId,
            title: editedTitle,
            typeId: editedTypeId,
            date: editedDate,
            time: editedTime,
            venue: editedVenue,
            address: editedAddress,
            neighborhoodId: editedNeighborhoodId,
            description: editedDescription,
            link: editedLink,
            userId: meetup.userId
        }
        // updates the database with the new info
        return fetch(`http://localhost:8088/meetups/${meetupId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedMeetup)
        })
            .then(() => {
                // fetch the updated meetups from the server and update the state, then exit edit mode
                return fetch('http://localhost:8088/meetups?_expand=user&_expand=type&_expand=neighborhood')
                    .then(res => res.json())
                    .then((data) => {
                        setMeetups(data);
                    })
                    .then(setEditMode(false))
            })

    }

    //gets the user info
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)

    return <>
        <div className="individual-meetup" key={meetup.id}>
            {editMode ? (
                <>
                    <div>

                        <div className="meetup-title">{meetup.title}</div>
                        <div className="meetup-info-title">Title:</div>
                        <input type="text"
                            value={editedTitle}
                            onChange={handleTitleChange} />
                    </div>
                    <div>
                        <div className="meetup-info-title">Organizer: </div> {meetup?.user?.fullName}
                    </div>
                    <div>
                        <div>
                            <div className="meetup-info-title">Date:</div> {meetupDate}</div>
                        <input type="date"
                            value={editedDate}
                            onChange={handleDateChange} />
                    </div>
                    <div>
                        <div>
                            <div className="meetup-info-title">Time:</div> {meetupTime}</div>
                        <input type="time"
                            value={editedTime}
                            onChange={handleTimeChange} />
                    </div>
                    <div>
                        <div>
                            <div className="meetup-info-title">Location:</div> {meetup.venue}</div>
                        <input type="text"
                            value={editedVenue}
                            onChange={handleVenueChange} />
                    </div>
                    <div>
                        <div>
                            <div className="meetup-info-title">Address:</div> {meetup.address}</div>
                        <input type="text"
                            value={editedAddress}
                            onChange={handleAddressChange} />
                    </div>
                    <div>
                        <div>
                            <div className="meetup-info-title">Meetup Neighborhood: </div>{meetup.neighborhood.name}</div>
                        <select
                            className="form-control"
                            value={editedNeighborhoodId}
                            onChange={handleNeighborhoodIdChange}
                        >
                            <option value="0">Select Option</option>
                            {neighborhoods.map(
                                (neighborhood) => {
                                    return <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
                                }
                            )}
                        </select>
                    </div>

                    <div>
                        <div>
                            <div className="meetup-info-title">Meetup Type:</div> {meetup.type.name}</div>
                        <select
                            className="form-control"
                            value={editedTypeId}
                            onChange={handleTypeIdChange}
                        >
                            <option value="0">Select Option</option>
                            {types.map(
                                (type) => {
                                    return <option key={type.id} value={type.id}>{type.name}</option>
                                }
                            )}
                        </select>
                    </div>

                    <div>
                        <div>
                            <div className="meetup-info-title">Meetup Description: </div> {meetup.description}</div>
                        <input type="text"
                            value={editedDescription}
                            onChange={handleDescriptionChange} />
                    </div>
                    <div>
                        <div>
                            <div className="meetup-info-title">Venue Link: </div> {meetup.link}</div>
                        <input type="text"
                            value={editedLink}
                            onChange={handleLinkChange} />
                    </div>
                </>
            )
                : (
                    <>
                        <div className="meetup-title">{meetup.title}</div>
                        <div className="meetup-info">                    
                            <div className="meetup-info-line"><div className="meetup-info-title">Organizer:</div>&nbsp;{meetup?.user?.fullName}</div>
                            <div className="meetup-info-line"><div className="meetup-info-title">Date & Time:</div>&nbsp;{meetupDate} at {meetupTime}</div>                            
                            <div className="meetup-info-line"><div className="meetup-info-title">Neighborhood:</div>&nbsp;{meetup?.neighborhood?.name}</div>
                            <div className="meetup-info-line"><div className="meetup-info-title">Location:</div>&nbsp;{meetup.venue}</div>
                            <div>{meetup.address}</div>
                            <div><a href={`${meetup.link}`}>{meetup.link}</a></div>                            
                            <div className="meetup-info-line"><div className="meetup-info-title">Meetup Type:</div>&nbsp;{meetup?.type?.name}</div>
                            <div className="meetup-info-line"><div className="meetup-info-title">Description:</div>&nbsp;{meetup.description}</div>
                        </div>
                    </>
                )}
            {
                editMode ? (
                    <>
                        <div className="manage-buttons">
                            <button onClick={handleSaveChangesButtonClick}>Save Changes</button>
                            <button onClick={handleCancelEditClick}>Cancel</button>
                        </div>
                    </>
                )
                    : (
                        <>
                            <div className="manage-buttons">
                                <button onClick={handleEditClick}>Edit Meetup</button>
                                <button onClick={handleDeleteButtonClick}>Delete Meetup</button>
                            </div>
                        </>
                    )
            }
        </div >

    </>


}










