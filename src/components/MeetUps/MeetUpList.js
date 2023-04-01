import { useEffect, useState } from "react"
import { IndividualMeetUpForList } from "./IndividualMeetUpForList"
import "./Meetup.css"

export const MeetUpList = () => {
    

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

    //renders the list of all meet-ups
    return <>
        <div className="head-name">
            <h1>All Meetups</h1>
        </div>
        <div className="meetup-list">{meetups.map(meetup => <><IndividualMeetUpForList key={`meetup--${meetup.id}`} 
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
                
        </>
            )}         
                        
        </div> 
    </>
}