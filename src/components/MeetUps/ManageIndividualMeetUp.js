import {  useEffect, useState } from "react"
import "./Meetup.css"

export const ManageIndividualMeetUp = ({ meetups, setMeetups, meetupId, meetupUserId, meetupAddress, meetupDescription, meetupDate, meetupTime, meetupTitle, meetupLink, meetupVenue, meetupNeighborhood, MeetupType }) => {
    // says whether or not the meetup is in "edit" mode, set to false when the page loads and will turn to true if user clicks Update Meetup
    const [editMode, setEditMode] = useState(false)
    
    // when Edit button is clicked, it sets the edit mode to true, and displays the form for updating the meetup
    const handleEditClick = () => {
        // enters edit mode
        setEditMode(true)
    }
    
    // when in edit mode, it will hold the updated meetup info, and is originally set to what the current info is
    const [editedTitle, setEditedTitle] = useState(meetupTitle)
    const [editedDate, setEditedDate] = useState(meetupDate)
    const [editedTime, setEditedTime] = useState(meetupTime)
    const [editedType, setEditedType] = useState(MeetupType)
    const [editedVenue, setEditedVenue] = useState(meetupVenue)
    const [editedAddress, setEditedAddress] = useState(meetupAddress)
    const [editedNeighborhood, setEditedNeighborhood] = useState(meetupNeighborhood)
    const [editedDescription, setEditedDescription] = useState(meetupDescription)
    const [editedLink, setEditedLink] = useState(meetupLink)
        
    // when these fields are changed, it sets the database to what is in that field
    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value)
    }

    const handleTypeChange = (event) => {
        setEditedType(event.target.value)
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
        setEditedNeighborhood(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setEditedDescription(event.target.value)
    }

    const handleLinkChange = (event) => {
        setEditedDescription(event.target.value)
    }

    // when the Cancel button is clicked, it resets everything to what is already in the database then exits edit mode
    const handleCancelEditClick = () => {
        // resets the edited meetup info to what it was and doesn't change anything
        setEditedTitle(meetupTitle)
        setEditedType(MeetupType)
        setEditedDate(meetupDate)
        setEditedTime(meetupTime)
        setEditedVenue(meetupVenue)
        setEditedAddress(meetupAddress)
        setEditedNeighborhood(meetupNeighborhood)
        setEditedDescription(meetupDescription)
        setEditedLink(meetupLink)
        // exits edit mode
        setEditMode(false)
    }
    
    // when the delete button is clicked, the meetup is deleted
    const handleDeleteButtonClick = () => {
        return fetch(`http://localhost:8088/meetups/${meetupId}`, {
            method: "DELETE"
        })
        .then (() => {
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
            type: editedType,
            date: editedDate,
            time: editedTime,
            venue: editedVenue,
            address: editedAddress,
            neighborhood: editedNeighborhood,
            description: editedDescription,
            link: editedLink,
            userId: meetupUserId
        }
        // updates the database with the new info
        return fetch(`http://localhost:8088/meetups/${meetupId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedMeetup)
        })
        .then (() => {
            // maps through the saved meetups in the database until it finds the matching Id, then updates that
            // meetup with the new info
            const updatedMeetups = meetups.map(meetup => {
                if (meetup.id === meetupId) {
                    return updatedMeetup
                }
                return meetup
            });
            setMeetups(updatedMeetups)
            // exits edit mode and rerenders everthing
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
                <h2>{meetupTitle}</h2>
                    <input type="text" 
                    value={editedTitle} 
                    onChange={handleTitleChange} />
            </div>
            <div>
                <div>Organizer: {meetupUserId} </div>
            </div>
            <div>
                <div>Date: {meetupDate}</div>
                <input type="date"
                value={editedDate}
                onChange={handleDateChange} />
            </div>
            <div>
                <div>Time: {meetupTime}</div>
                <input type="time"
                value={editedTime}
                onchange={handleTimeChange} />
            </div>
            <div>
                <div>Location: {meetupVenue}</div>
                <input type="text" 
                    value={editedVenue} 
                    onChange={handleVenueChange} />
            </div>
            <div>
                <div>Address: {meetupAddress}</div>
                <input type="text" 
                    value={editedAddress} 
                    onChange={handleAddressChange} />
            </div>
            <div>
                <div>Neighborhood: {meetupNeighborhood}</div>
                <input type="radio"
                value={editedNeighborhood}
                onChange={handleNeighborhoodChange} />                                            
            </div>
            <div>
                <div>Meetup Type: {MeetupType}</div>
                <input type="radio"
                value={editedType}
                onChange={handleTypeChange} />
            </div>
            <div>
                <div>Meetup Description: {meetupDescription}</div>
                <input type="text" 
                    value={editedDescription} 
                    onChange={handleDescriptionChange} />
            </div>
            <div>
                <div>Venue Link: {meetupLink}</div> 
                <input type="text" 
                    value={editedLink} 
                    onChange={handleLinkChange} />   
            </div>
            </>
        )
        : (
            <>
            <div>
                <h2>{meetupTitle}</h2>
                <div>Organizer: {meetupUserId} </div>
                <div>Date: {meetupDate}</div>
                <div>Time: {meetupTime}</div>
                <div>Location: {meetupVenue}</div>
                <div>Address: {meetupAddress}</div>
                <div>Neighborhood: {meetupNeighborhood}</div>
                <div>Meetup Type: {MeetupType}</div>
                <div>Meetup Description: {meetupDescription}</div>
                <div>Venue Link: {meetupLink}</div>
            </div>
            </>
        )}
            {editMode ? (
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
            )}
    </div>
        
    </>
    
                    
}










