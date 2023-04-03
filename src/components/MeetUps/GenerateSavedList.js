import React, { useState, useEffect } from "react";
import { IndividualMeetUpForList } from "./IndividualMeetUpForList"
import "./Meetup.css"

export const GenerateSavedList = () => {
    //gets the user info
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)

    const [savedMeetups, setSavedMeetups] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/savedMeetup?_expand=user&_expand=meetup`)
                .then(response => response.json())
                .then((data) => {
                    setSavedMeetups(data)
                })
        },
        []
    )
    const [mySavedMeetups, setMySavedMeetups] = useState([])
    useEffect(() => {
        const mySavedMeetups = savedMeetups.filter(meetup => {
            return meetup.userId === ClassAppUserObject.id
        })
        setMySavedMeetups(mySavedMeetups)
    },
        [savedMeetups]
    )

    const handleUnsave = (clickEvent, savedMeetup) => {
        clickEvent.preventDefault()
        return fetch(`http://localhost:8088/savedMeetup/${savedMeetup.id}`, {
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
            <div className="meetup-list">{mySavedMeetups.map(savedMeetup =>
                <>
                    <div className="individual-meetup"><IndividualMeetUpForList key={`meetup--${savedMeetup.meetup.id}`}
                        meetups={mySavedMeetups}
                        setMeetups={setMySavedMeetups}
                        meetupId={savedMeetup.meetup.id}
                        meetupTitle={savedMeetup.meetup.title}
                        meetupType={savedMeetup.meetup.type}
                        meetupVenue={savedMeetup.meetup.venue}
                        meetupAddress={savedMeetup.meetup.address}
                        meetupLink={savedMeetup.meetup.link}
                        meetupNeighborhood={savedMeetup.meetup.neighborhood}
                        meetupDate={savedMeetup.meetup.date}
                        meetupTime={savedMeetup.meetup.time}
                        meetupDescription={savedMeetup.meetup.description}
                        meetupUserId={savedMeetup.meetup.userId}
                    />
                        <button
                            onClick={(clickEvent) =>
                                handleUnsave(clickEvent, savedMeetup)}
                            className="meetup-saved-button">
                            Unsave Meetup
                        </button>
                    </div>
                </>

            )}
            </div>
        </div>
    )   
}


