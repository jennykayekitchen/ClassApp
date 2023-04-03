import { useEffect, useState } from "react"
import { IndividualMeetUpForList } from "./IndividualMeetUpForList"
import "./Meetup.css"

export const MeetUpList = () => {
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)

    const [meetups, setMeetups] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/meetups`)
                .then(response => response.json())
                .then((data) => {
                    setMeetups(data)

                })
        },
        []
    )

    //pulls in the initial list of saved meetups, starts as an empty array
    const [savedMeetups, setSavedMeetups] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/savedMeetup`)
                .then(response => response.json())
                .then((data) => {
                    setSavedMeetups(data)
                })
        },
        []
    )
    //when save button is clicked, the meetup is added to the savedMeetups list
    //then updates the saved meetups list
    //which will then disable the save button later in the code
    const handleSave = (clickEvent, meetupId) => {
                
                //creates the blueprint for a new savedMeetup using the current userId and the meetupId
                const saveMeetup = {
                    userId: ClassAppUserObject.id,
                    meetupId: meetupId,
                }        
        
                //sends the info to the database to save it
                return fetch(`http://localhost:8088/savedMeetup`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(saveMeetup)
                })
                    .then(res => res.json())
                    .then(() => {
                        //pulls the savedMeetups from the database and updates that state
                        fetch(`http://localhost:8088/savedMeetup`)
                            .then(response => response.json())
                            .then((data) => {
                                setSavedMeetups(data)
                            })                
                    })            
            }

    //renders the list of all meet-ups
    return <>
        <div className="head-name">
            <h1>All Meetups</h1>
        </div>
        <div className="meetup-list">{meetups.map(meetup => 
            <>
                <div className="individual-meetup"><IndividualMeetUpForList key={`meetup--${meetup.id}`} 
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
                    {savedMeetups.some(savedMeetup => savedMeetup.meetupId === meetup.id)
                        ? <button disabled>Meetup Saved</button>
                        : <button
                            onClick={(clickEvent) => handleSave(clickEvent, meetup.id)}
                            className="meetup-saved-button">
                            Save Meetup
                        </button>
                    }         
                </div>
        
            </>
        )}
        </div>
    </>
}
