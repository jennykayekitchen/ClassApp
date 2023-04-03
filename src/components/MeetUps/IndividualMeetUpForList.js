import { useEffect, useState } from "react"
import "./Meetup.css"

export const IndividualMeetUpForList = ({ meetup }) => {
    
    return <>        
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
}
