import React, { useState, useEffect } from "react";
import { ManageIndividualMeetUp } from "./ManageIndividualMeetUp"
import "./Meetup.css"

export const ManageMeetUps = () => {
    //gets the user info
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)
    
    //gets the meetups with user, neighborhood, and type info
    const [meetups, setMeetups] = useState([])
    useEffect(() => {
        fetch('http://localhost:8088/meetups?_expand=user&_expand=type&_expand=neighborhood&_sort=date')
        .then(res => res.json())
        .then((meetupArray) => {
            setMeetups(meetupArray)
        })
    }, [])
    
    //pulls out the meetups created by the person who is logged in
    const [myMeetups, setMyMeetups] = useState([])
    useEffect(() =>{
            const userMeetups = meetups.filter(meetup => {
                return meetup.userId === ClassAppUserObject.id
            })
            setMyMeetups(userMeetups)
        },      
     [meetups])

    return (
        <div>
            <div className="head-name">
        <h1>Manage Meet Ups</h1></div>
            {/* if the user is an admin it will display all the meetups, otherwise only the meetups the user created */}
            {ClassAppUserObject.admin ? (
                <div className="meetup-list">{meetups.map(meetup => <ManageIndividualMeetUp key={`meetup--${meetup.id}`} 
                meetup = {meetup}
                meetups = {meetups}
                setMeetups = {setMeetups}
                meetupId={meetup.id}
                />
                )}         
                        
                </div> 
            )
            : (
            <div className="meetup-list">{myMeetups.map(meetup => <ManageIndividualMeetUp key={`meetup--${meetup.meetupId}`} 
                meetup = {meetup}
                meetups = {meetups}
                setMeetups = {setMeetups}
                meetupId={meetup.id}               
                />
                )}         
                        
                </div> 
            )}
        </div>
    );
};
