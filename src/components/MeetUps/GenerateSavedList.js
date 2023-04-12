import React, { useState, useEffect } from "react";
import { IndividualSavedMeetup } from "./IndividualSavedMeetup.js"
import "./Meetup.css"

export const GenerateSavedList = () => {
    //gets the user info
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)

    //gets the saved meetups with the meetup info and info for the user who saved the meetup
    const [savedMeetups, setSavedMeetups] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/savedMeetups?_expand=user&_expand=meetup&_sort=date`)
                .then(response => response.json())
                .then((data) => {
                    setSavedMeetups(data)
                })
        },
        []
    )

    //loops through the savedmeetups and pulls out the ones that the user saved
    const [mySavedMeetups, setMySavedMeetups] = useState([])
    useEffect(() => {
        const mySavedMeetups = savedMeetups.filter(savedMeetup => 
            savedMeetup.userId === ClassAppUserObject.id
        )
        
        setMySavedMeetups(mySavedMeetups)
    },
        [savedMeetups]
    )

    //deletes the savedmeetup from the savedmeetup list, then updates the list
    const handleUnsave = (clickEvent, savedMeetup) => {
        clickEvent.preventDefault()
        return fetch(`http://localhost:8088/savedMeetups/${savedMeetup.id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(() => {
                // update mySavedMeetups state to remove the unsaved meetup
                const updatedMySavedMeetups = mySavedMeetups.filter(
                    (meetup) => meetup.id !== savedMeetup.id
                );
                setMySavedMeetups(updatedMySavedMeetups);
            })
    }


    return (
        <div>
            <div className="head-name">
                <h1>Saved Meetups</h1>
            </div>
            <div className="meetup-list">{mySavedMeetups.map(mySavedMeetup =>
                
                    <div className="individual-meetup" key={mySavedMeetup.meetup.id}><IndividualSavedMeetup key={`meetup--${mySavedMeetup.meetup.id}`}
                        mySavedMeetup={mySavedMeetup}                        
                    />
                        <button
                            onClick={(clickEvent) =>
                                handleUnsave(clickEvent, mySavedMeetup)}
                            className="meetup-saved-button">
                            Unsave Meetup
                        </button>
                    </div>
                

            )}
            </div>
        </div>
    )   
}


