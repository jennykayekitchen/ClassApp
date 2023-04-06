import { useEffect, useState } from "react"
import "./Meetup.css"

export const IndividualSavedMeetup = ({ mySavedMeetup }) => {

    return <>
        <div className="meetup-title">{mySavedMeetup.title}</div>
        <div className="meetup-info">
            <div><div className="meetup-info-title">Title:</div> {mySavedMeetup?.meetup?.title} </div>
            <div><div className="meetup-info-title">Organizer:</div> {mySavedMeetup?.user?.fullName} </div>
            <div><div className="meetup-info-title">Date:</div> {mySavedMeetup?.meetup?.date}</div>
            <div><div className="meetup-info-title">Time:</div> {mySavedMeetup?.meetup?.time}</div>
            <div><div className="meetup-info-title">Location:</div> {mySavedMeetup?.meetup?.venue}</div>
            <div><div className="meetup-info-title">Address:</div> {mySavedMeetup?.meetup?.address}</div>
            {/* <div><div className="meetup-info-title">Neighborhood:</div> {mySavedMeetup?.neighborhood?.name}</div> */}
            {/* <div><div className="meetup-info-title">Meetup Type:</div> {mySavedMeetup?.type?.name}</div> */}
            <div><div className="meetup-info-title">Meetup Description:</div> {mySavedMeetup?.meetup?.description}</div>
            <div><div className="meetup-info-title">Venue Link:</div> {mySavedMeetup?.meetup?.link}</div>
        </div>
    </>
}