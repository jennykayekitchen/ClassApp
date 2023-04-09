import moment from "moment"
import "./Meetup.css"
import { useEffect, useState } from "react"

export const IndividualSavedMeetup = ({ mySavedMeetup }) => {
    
    //gets the Id of the person who created the meetup to later display the organizers name
    const [organizer, setOrganizer] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${mySavedMeetup.meetup.userId}`)
                .then(response => response.json())
                .then((data) => {                    
                    setOrganizer(data)
                })
            },
            []
    )

    //gets the Id of the neighborhood for the saved meetup and then later displays the name of the neighborhood
    const [neighborhood, setNeighborhod] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/neighborhoods/${mySavedMeetup.meetup.neighborhoodId}`)
                .then(response => response.json())
                .then((data) => {                    
                    setNeighborhod(data)
                })
            },
            []
    )

    //gets the Id of the type for the saved meetup and then later displays the name of the type
    const [type, setType] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/types/${mySavedMeetup.meetup.typeId}`)
                .then(response => response.json())
                .then((data) => {                    
                    setType(data)
                })
            },
            []
    )
    
    //formats the date and time to be readable using the moment extension
    let meetupDate = moment(mySavedMeetup?.meetup?.date).format('MM-DD-YYYY')
    let savedMeetupTime = mySavedMeetup?.meetup?.time
    let meetupTime = moment(savedMeetupTime, 'HH:mm').format('hh:mm a')
    
    return <>
        <div className="meetup-title">{mySavedMeetup.meetup?.title}</div>
        <div className="meetup-info">
            <div className="meetup-info-line"><div className="meetup-info-title">Organizer:</div>&nbsp;{organizer.fullName}</div>
            <div className="meetup-info-line"><div className="meetup-info-title">Date & Time:</div>&nbsp;{meetupDate} at {meetupTime}</div>
            <div className="meetup-info-line"><div className="meetup-info-title">Neighborhood:</div>&nbsp;{neighborhood.name}</div>
            <div className="meetup-info-line"><div className="meetup-info-title">Location:</div>&nbsp;{mySavedMeetup?.meetup?.venue}</div>
            <div>{mySavedMeetup.meetup?.address}</div>
            <div><a href={`${mySavedMeetup.meetup?.link}`}>{mySavedMeetup.meetup?.link}</a></div>
            <div className="meetup-info-line"><div className="meetup-info-title">Meetup Type:</div>&nbsp;{type.name}</div>
            <div className="meetup-info-line"><div className="meetup-info-title">Description:</div>&nbsp;{mySavedMeetup?.meetup?.description}</div>            
        </div>
    </>
}