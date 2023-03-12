import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Form, Label } from "reactstrap";

export const EditMeetUp = () => {
    const [meetup, update] = useState({
        "title": "",
        "typeId": null,
        "venue": "",
        "address": "",
        "neighborhoodId": null,
        "link": "",
        "date": null,
        "time": null,
        "isSaved": false,
        "description": "",
        "userId": null,
    })

  const [ types, setType ] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8088/type")
      .then((res) => res.json())
      .then((typeData) => {
        setType(typeData);
      });
  }, []);

  const { meetUpId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/meetups/${meetUpId}`)
      .then((response) => response.json())
      .then((data) => {
        update(data);
      });
  }, [meetUpId]);

  const [neighborhoods, setNeighborhoods] = useState([])
  useEffect(() => {
      fetch('http://localhost:8088/neighborhoods')
          .then((res) => res.json())
          .then((data) => {
              setNeighborhoods(data)
          })
  },
      []
  )


  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    return (
      fetch(`http://localhost:8088/meetups/${meetUpId.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meetup),
      })
        .then((response) => response.json())
        .then(() => {
          navigate("/");
        })
    );
  };

  return (
    <form className="meetUpForm">
        <h2 className="meetupForm__title">Add a New Meet Up</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="meetuptitle"><div className="meetuplabel">Meetup Title:</div></label>
                {/* creates text box for user to input the name of their meetup, then assigns that as meetup.title */}
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="What's the vibe?"
                    value={meetup.title}
                    onChange={
                        (event) => {
                            const copy = { ...meetup }
                            copy.title = event.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <div>
                    Meetup Type:
                    {types.map((type) => {
                        return (
                            <div key={type.id} className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value={type.id}
                                        checked={meetup.typeId === type.id} // The checked attribute accepts a true of false value. Here we say this should be checked if the userChoices.seasonId matched the id of the season this radio button represents
                                        onChange={(event) => {
                                            const copy = { ...meetup }
                                            copy.typeId = parseInt(event.target.value)
                                            update(copy)
                                        }}
                                    />
                                    {type.name}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="meetupvenue"><div className="meetuplabel">Venue:</div></label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Where are we meeting?"
                    value={meetup.venue}
                    onChange={
                        (event) => {
                            const copy = { ...meetup }
                            copy.venue = event.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="meetupaddress"><div className="meetuplabel">Address:</div></label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Enter the street address"
                    value={meetup.address}
                    onChange={
                        (event) => {
                            const copy = { ...meetup }
                            copy.address = event.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="meetupvenue"><div className="meetuplabel">Link to Venue:</div></label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Enter a link for the venue"
                    value={meetup.link}
                    onChange={
                        (event) => {
                            const copy = { ...meetup }
                            copy.link = event.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <div>
                    Neighborhood:
                    {neighborhoods.map((neighborhoods) => {
                        return (
                            <div key={neighborhoods.id} className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="neighborhoods"
                                        value={neighborhoods.id}
                                        checked={meetup.neighborhoodId === neighborhoods.id} // The checked attribute accepts a true of false value. Here we say this should be checked if the userChoices.seasonId matched the id of the season this radio button represents
                                        onChange={(event) => {
                                            const copy = { ...meetup }
                                            copy.neighborhoodId = parseInt(event.target.value)
                                            update(copy)
                                        }}
                                    />
                                    {neighborhoods.name}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="meetupdate"><div className="meetuplabel">Date:</div></label>
                <input
                    required autoFocus
                    type="date"
                    className="form-control"
                    value={meetup.date}
                    onChange={
                        (event) => {
                            const copy = { ...meetup }
                            copy.date = event.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="meetuptime"><div className="meetuplabel">Time:</div></label>
                <input
                    required autoFocus
                    type="time"
                    className="form-control"
                    value={meetup.time}
                    onChange={
                        (event) => {
                            const copy = { ...meetup }
                            copy.time = event.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="meetupdescription"><div className="meetuplabel">Description:</div></label>
                {/* creates text box for user to input the name of their meetup, then assigns that as meetup.title */}
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="What are we doing?"
                    value={meetup.description}
                    onChange={
                        (event) => {
                            const copy = { ...meetup }
                            copy.description = event.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Mood
        </button>
    </form>
 )
}