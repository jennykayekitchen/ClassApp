import { useEffect, useState } from "react"
import "./Meetup.css"

export const IndividualMeetUpForList = ({ meetup }) => {
    
    return <>        
                <div className="meetup-title">{meetup.title}</div>
                <div className="meetup-info">
                <div className="meetup-info-line"><div className="meetup-info-title">Organizer:</div>&nbsp;{meetup?.user?.fullName}</div>
                            <div className="meetup-info-line"><div className="meetup-info-title">Date & Time:</div>&nbsp;{meetup.date} at {meetup.time}</div>                            
                            <div className="meetup-info-line"><div className="meetup-info-title">Neighborhood:</div>&nbsp;{meetup?.neighborhood?.name}</div>
                            <div className="meetup-info-line"><div className="meetup-info-title">Location:</div>&nbsp;{meetup.venue}</div>
                            <div>{meetup.address}</div>
                            <div><a href={`${meetup.link}`}>{meetup.link}</a></div>                            
                            <div className="meetup-info-line"><div className="meetup-info-title">Meetup Type:</div>&nbsp;{meetup?.type?.name}</div>
                            <div className="meetup-info-line"><div className="meetup-info-title">Description:</div>&nbsp;{meetup.description}</div>
                </div>        
    </>            
}
