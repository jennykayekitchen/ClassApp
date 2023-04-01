import React, { useState, useEffect } from "react";
import { ManageIndividualMeetUp } from "./ManageIndividualMeetUp"
import "./Meetup.css"

export const ManageMeetUps = () => {
    //gets the user info
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)
     
    const [meetups, setMeetups] = useState([])
    const [myMeetups, setMyMeetups] = useState([])

    useEffect(() => {
        fetch('http://localhost:8088/meetups')
        .then(res => res.json())
        .then((meetupArray) => {
            setMeetups(meetupArray)
        })
    }, [])
      
    useEffect(() =>{
        const userMeetups = meetups.filter(meetup => {
            return meetup.userId == ClassAppUserObject.id
        })
        setMyMeetups(userMeetups)
    }, [meetups])

    return (
        <div>
        <h2>Manage My Meet Ups</h2>
            {ClassAppUserObject.admin ? (
                <div className="meetup-list">{meetups.map(meetup => <ManageIndividualMeetUp key={`meetup--${meetup.id}`} 
                meetups = {meetups}
                setMeetups = {setMeetups}
                meetupId={meetup.id}
                meetupTitle={meetup.title}
                meetupType={meetup.type}
                meetupVenue={meetup.venue}
                meetupAddress={meetup.address}
                meetupLink={meetup.link}
                meetupNeighborhood={meetup.neighborhood}
                meetupDate={meetup.date}
                meetupTime={meetup.time}
                meetupDescription={meetup.description}
                meetupUserId={meetup.userId}
                />
                )}         
                        
                </div> 
            )
            : (
            <div className="meetup-list">{myMeetups.map(meetup => <ManageIndividualMeetUp key={`meetup--${meetup.id}`} 
                meetups = {meetups}
                setMeetups = {setMeetups}
                meetupId={meetup.id}
                meetupTitle={meetup.title}
                meetupType={meetup.type}
                meetupVenue={meetup.venue}
                meetupAddress={meetup.address}
                meetupLink={meetup.link}
                meetupNeighborhood={meetup.neighborhood}
                meetupDate={meetup.date}
                meetupTime={meetup.time}
                meetupDescription={meetup.description}
                meetupUserId={meetup.userId}
                />
                )}         
                        
                </div> 
            )}
        </div>
    );
};
