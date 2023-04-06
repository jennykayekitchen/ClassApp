import { useEffect, useState } from "react"
import "./Meetup.css"
import { useNavigate } from "react-router-dom"

export const ManageIndividualMeetUp = ({ meetup, meetups, setMeetups, meetupId, }) => {
    const navigate = useNavigate()
    
    
    // says whether or not the meetup is in "edit" mode, set to false when the page loads and will turn to true if user clicks Update Meetup
    const [editMode, setEditMode] = useState(false)

    // when Edit button is clicked, it sets the edit mode to true, and displays the form for updating the meetup
    const handleEditClick = () => {
        // enters edit mode
        setEditMode(true)
    }

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

    const handleTypeChange = (event) => {
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

    const handleNeighborhoodChange = (event) => {
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
                //maps through the saved meetups in the database until it finds the matching Id, then updates that
                //meetup with the new info
                const updatedMeetups = meetups.map(meetup => {
                    if (meetup.id === meetupId) {
                        return updatedMeetup
                    }
                    return meetup
                });
                
                setMeetups(updatedMeetups)
                //exits edit mode and rerenders everthing
                setEditMode(false)
            })
    }

    //gets the user info
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)

    return <>
        <div className="individual-meetup">
            {editMode ? (
                <>
                    <div>

                        <h2>{meetup.title}</h2>
                        <div>Title:</div>
                        <input type="text"
                            value={editedTitle}
                            onChange={handleTitleChange} />
                    </div>
                    <div>
                        <div>Organizer: {meetup?.user?.fullName} </div>
                    </div>
                    <div>
                        <div>Date: {meetup.date}</div>
                        <input type="date"
                            value={editedDate}
                            onChange={handleDateChange} />
                    </div>
                    <div>
                        <div>Time: {meetup.time}</div>
                        <input type="time"
                            value={editedTime}
                            onchange={handleTimeChange} />
                    </div>
                    <div>
                        <div>Location: {meetup.venue}</div>
                        <input type="text"
                            value={editedVenue}
                            onChange={handleVenueChange} />
                    </div>
                    <div>
                        <div>Address: {meetup.address}</div>
                        <input type="text"
                            value={editedAddress}
                            onChange={handleAddressChange} />
                    </div>
                    <div>
                        <div>Meetup Neighborhood: {meetup.neighborhood.name}</div>
                        <select
                            className="form-control"
                            value={meetup.neighborhoodId}
                            onChange={handleNeighborhoodChange}
                        >
                    <option value="0">Select Option</option>
                    {neighborhoods.map(
                        (neighborhood) => {
                            return <option key={neighborhood.id} value={editedNeighborhoodId}>{neighborhood.name}</option>
                        }
                    )
                    }
                </select>
        </div>

        <div>Meetup Type: {meetup.type.name}</div>
        {types.map((type) => {
            return (
                <div key={`type--${meetup.typeId}`} className="radio">
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value={editedTypeId}
                            checked={meetup.typeId === type.id}
                            onChange={handleTypeChange}
                        />
                        {type.name}
                    </label>
                </div>
            )
        })}

        <div>
            <div>Meetup Description: {meetup.description}</div>
            <input type="text"
                value={editedDescription}
                onChange={handleDescriptionChange} />
        </div>
        <div>
            <div>Venue Link: {meetup.link}</div>
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
            <div><div className="meetup-info-title">Organizer:</div> {meetup?.user?.fullName} </div>
            <div><div className="meetup-info-title">Date:</div> {meetup.date}</div>
            <div><div className="meetup-info-title">Time:</div> {meetup.time}</div>
            <div><div className="meetup-info-title">Location:</div> {meetup.venue}</div>
            <div><div className="meetup-info-title">Address:</div> {meetup.address}</div>
            <div><div className="meetup-info-title">Neighborhood:</div> {meetup?.neighborhood?.name}</div>
            <div><div className="meetup-info-title">Meetup Type:</div> {meetup?.type?.name}</div>
            <div><div className="meetup-info-title">Meetup Description:</div> {meetup.description}</div>
            <div><div className="meetup-info-title">Venue Link:</div> {meetup.link}</div>
        </div>
    </>
)}
{
    editMode ? (
        <>
            <div>
                <button onClick={handleSaveChangesButtonClick}>Save Changes</button>
                <button onClick={handleCancelEditClick}>Cancel</button>
            </div>
        </>
    )
        : (
            <>
                <div>
                    <button onClick={handleEditClick}>Edit Meetup</button>
                    <button onClick={handleDeleteButtonClick}>Delete Meetup</button>
                </div>
            </>
        )
}
        </div >

    </>


}










