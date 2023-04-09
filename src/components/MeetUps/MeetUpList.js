import { useEffect, useState } from "react"
import { IndividualMeetUpForList } from "./IndividualMeetUpForList"
import "./Meetup.css"

export const MeetUpList = () => {
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)

    const [meetups, setMeetups] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/meetups?_expand=user&_expand=type&_expand=neighborhood&_sort=date`)
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
            fetch(`http://localhost:8088/savedMeetups`)
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
                return fetch(`http://localhost:8088/savedMeetups`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(saveMeetup)
                })
                    .then(res => res.json())
                    .then(() => {
                        //pulls the savedMeetups from the database and updates that state to update the page
                        fetch(`http://localhost:8088/savedMeetups`)
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
        {/* sends info for each individual meetup to the module so that it has access to the info */}
        <div className="meetup-list">{meetups.map(meetup => 
            <>
                <div className="individual-meetup"><IndividualMeetUpForList key={`meetup--${meetup.id}`} 
                    meetup = {meetup}
                    />
                    {/*maps through the saved meetups and if the meetup is already there the save button is disabled*/}
                    {savedMeetups.some(savedMeetup => savedMeetup.meetupId === meetup.id && savedMeetup.userId === ClassAppUserObject.id)
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
