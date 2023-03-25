import { useEffect, useState } from "react"
import "./Meetup.css"

export const IndividualMeetUpForList = ({ meetupUserId, meetupAddress, meetupDescription, meetupDate, meetupTime, meetupTitle, meetupLink, meetupVenue, meetupNeighborhood, MeetupType }) => {

    return <>        
            <div className="individual-meetup">
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
}










