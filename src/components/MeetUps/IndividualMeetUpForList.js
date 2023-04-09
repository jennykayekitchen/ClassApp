import moment from "moment"
import "./Meetup.css"

export const IndividualMeetUpForList = ({ meetup }) => {
    //formats the date and time to be readable using the moment extension
    let meetupDate = moment(meetup.date).format('MM-DD-YYYY')
    let meetupTime = moment(meetup.time, 'HH:mm').format('hh:mm a')

    return <>
        <div className="meetup-title">{meetup.title}</div>
        <div className="meetup-info">
            <div className="meetup-info-line"><div className="meetup-info-title">Organizer:</div>&nbsp;{meetup?.user?.fullName}</div>
            <div className="meetup-info-line"><div className="meetup-info-title">Date & Time:</div>&nbsp;{meetupDate} at {meetupTime}</div>
            <div className="meetup-info-line"><div className="meetup-info-title">Neighborhood:</div>&nbsp;{meetup?.neighborhood?.name}</div>
            <div className="meetup-info-line"><div className="meetup-info-title">Location:</div>&nbsp;{meetup.venue}</div>
            <div>{meetup.address}</div>
            <div><a href={`${meetup.link}`}>{meetup.link}</a></div>
            <div className="meetup-info-line"><div className="meetup-info-title">Meetup Type:</div>&nbsp;{meetup?.type?.name}</div>
            <div className="meetup-info-line"><div className="meetup-info-title">Description:</div>&nbsp;{meetup.description}</div>
        </div>
    </>
}
