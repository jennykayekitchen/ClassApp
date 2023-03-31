import React, { useState, useEffect } from "react";
import { MeetUp } from "./MeetUp";
import { useNavigate } from "react-router-dom";

export const GenerateSavedList = () => {
    //gets the user info
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)

    const [savedMeetups, setSavedMeetups] = useState([])
    const [mySavedMeetups, setMySavedMeetups] = useState([])


    const navigate = useNavigate()

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

    useEffect(() => {
        const mySavedMeetups = savedMeetups.filter(meetup => {
            return meetup.userId === ClassAppUserObject.id
        })
        setMySavedMeetups(mySavedMeetups)
    },
        [savedMeetups])

    const handleUnsave = (event, savedMeetup) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/savedMeetup/${savedMeetup.id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(navigate("/viewsaved"))
    }


    

    return (
        <div>
            <h2>Saved Meet Ups</h2>
            <div>{mySavedMeetups.map(savedMeetup => <><MeetUp key={`meetup--${savedMeetup.meetup.id}`}
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
                    onClick={(clickEvent) => handleUnsave(clickEvent, savedMeetup)}
                    className="">
                    Unsave Meetup
                </button>
            </>
            )}

            </div>
        </div>
    );
};
