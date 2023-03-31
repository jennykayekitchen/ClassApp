import { useEffect, useState } from "react"
import { MeetUp } from "./MeetUp"
import { useNavigate } from "react-router-dom"



export const MeetUpList = () => {
    const localClassAppUser = localStorage.getItem("class_app_user")
    const ClassAppUserObject = JSON.parse(localClassAppUser)
    const navigate = useNavigate()

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

    const handleSave = (event, meetup) => {
        event.preventDefault()
        const saveMeetup = {
            userId: ClassAppUserObject.id,
            meetupId: meetup.id,
        }
        return fetch(`http://localhost:8088/savedMeetup`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(saveMeetup)
        })
            .then(res => res.json())
            .then(() => {
                navigate(`/`)
            })
    }

    //renders the list of all meet-ups
    return <>
        <em className="songlist_tape"></em>
        <div>{meetups.map(meetup => <><MeetUp key={`meetup--${meetup.id}`}
            meetups={meetups}
            setMeetups={setMeetups}
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
            <button
                onClick={(clickEvent) => handleSave(clickEvent, meetup)}
                className="">
                Save Meetup
            </button>
        </>
        )}

        </div>
    </>
}