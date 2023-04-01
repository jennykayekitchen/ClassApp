import { useEffect, useState } from "react"
import "./Meetup.css"
import { useNavigate } from "react-router-dom"

export const IndividualMeetUpForList = ({ meetupUserId, meetupAddress, meetupDescription, meetupDate, meetupTime, meetupTitle, meetupLink, meetupVenue, meetupNeighborhood, MeetupType, meetupId }) => {

    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)
    const navigate = useNavigate()

    const handleSave = (event, meetupId) => {
        event.preventDefault()
        const saveMeetup = {
            userId: ClassAppUserObject.id,
            meetupId: meetupId,
        }
        return fetch(`http://localhost:8088/savedMeetup`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(saveMeetup)
        })
            .then(res => res.json())
            .then(() => {
                window.alert("ok")
  
            })
    }

    return <>        
            <div className="individual-meetup">
                <div className="meetup-text">
                    <div className="meetup-title">
                        <h2>{meetupTitle}</h2>
                    </div>                    
                    <div className="meetup-info">
                        <div><div className="meetup-info-title">Organizer:</div> {meetupUserId}</div>
                        <div><div className="meetup-info-title">Date:</div> {meetupDate}</div>
                        <div><div className="meetup-info-title">Time:</div> {meetupTime}</div>
                        <div><div className="meetup-info-title">Location:</div> {meetupVenue}</div>
                        <div><div className="meetup-info-title">Address:</div> {meetupAddress}</div>
                        <div><div className="meetup-info-title">Neighborhood:</div> {meetupNeighborhood}</div>
                        <div><div className="meetup-info-title">Meetup Type:</div> {MeetupType}</div>
                        <div><div className="meetup-info-title">Meetup Description:</div> {meetupDescription}</div>
                        <div><div className="meetup-info-title">Venue Link:</div> {meetupLink}</div>
                    </div>
                </div>
                <button
                    onClick={(clickEvent) => handleSave(clickEvent, meetupId)}
                    className="meetup-save">
                    Save Meetup
                </button>
            </div>        
    </>            
}










