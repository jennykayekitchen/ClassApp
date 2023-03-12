import {  useEffect, useState } from "react"

export const MeetUp = ({ meetupAddress, meetupDescription, meetupDate, meetupTime, meetupTitle, meetupLink, meetupVenue, meetupNeighborhood, MeetupType }) => {
    //gets the user info
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)
    
    return <>
    <div>
    <h2>{meetupTitle}</h2>
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










