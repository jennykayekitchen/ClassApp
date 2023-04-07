import moment from "moment"
import "./Meetup.css"

export const IndividualSavedMeetup = ({ mySavedMeetup }) => {
    let meetupDate = moment(mySavedMeetup?.meetup?.date).format('MM-DD-YYYY')
    let savedMeetupTime = mySavedMeetup?.meetup?.time
    let meetupTime = moment(savedMeetupTime, 'HH:mm').format('hh:mm a')
    return <>
        <div className="meetup-title">{mySavedMeetup.meetup?.title}</div>
        <div className="meetup-info">
            <div className="meetup-info-line"><div className="meetup-info-title">Organizer:</div>&nbsp;{mySavedMeetup?.user?.fullName}</div>
            <div className="meetup-info-line"><div className="meetup-info-title">Date & Time:</div>&nbsp;{meetupDate} at {meetupTime}</div>
            {/* <div className="meetup-info-line"><div className="meetup-info-title">Neighborhood:</div>&nbsp;{neighborhood.name}</div> */}
            <div className="meetup-info-line"><div className="meetup-info-title">Location:</div>&nbsp;{mySavedMeetup?.meetup?.venue}</div>
            <div>{mySavedMeetup.meetup?.address}</div>
            <div><a href={`${mySavedMeetup.meetup?.link}`}>{mySavedMeetup.meetup?.link}</a></div>
            {/* <div className="meetup-info-line"><div className="meetup-info-title">Meetup Type:</div>&nbsp;{mySavedMeetup.type?.name}</div> */}
            <div className="meetup-info-line"><div className="meetup-info-title">Description:</div>&nbsp;{mySavedMeetup?.meetup?.description}</div>            
        </div>
    </>
}