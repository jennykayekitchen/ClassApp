import { useEffect, useState } from "react"
import "./Meetup.css"

export const IndividualMeetUpForList = ({ meetupUserId, meetupAddress, meetupDescription, meetupDate, meetupTime, meetupTitle, meetupLink, meetupVenue, meetupNeighborhood, MeetupType }) => {

    return <>        
                <div className="meetup-title">{meetupTitle}</div>
                <div className="meetup-info">
                    <div><div className="meetup-info-title">Organizer:</div> {meetupUserId} </div>
                    <div><div className="meetup-info-title">Date:</div> {meetupDate}</div>
                    <div><div className="meetup-info-title">Time:</div> {meetupTime}</div>
                    <div><div className="meetup-info-title">Location:</div> {meetupVenue}</div>
                    <div><div className="meetup-info-title">Address:</div> {meetupAddress}</div>
                    <div><div className="meetup-info-title">Neighborhood:</div> {meetupNeighborhood}</div>
                    <div><div className="meetup-info-title">Meetup Type:</div> {MeetupType}</div>
                    <div><div className="meetup-info-title">Meetup Description:</div> {meetupDescription}</div>
                    <div><div className="meetup-info-title">Venue Link:</div> {meetupLink}</div>
                </div>        
    </>            
}
