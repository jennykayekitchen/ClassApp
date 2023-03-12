import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Label } from "reactstrap";

export const GearEdit = () => {
  const [gear, updateGear] = useState({
    name: "",
    imageUrl: "",
    brand: "",
    description: "",
    artistUsingGear: "",
    demonstration: "",
    typeId: 0,
    price: "",
  });

  const [ types, updateType ] = useState([]);

  const { gearId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/gears/${gearId}`)
      .then((response) => response.json())
      .then((data) => {
        updateGear(data);
      });
  }, [gearId]);

  useEffect(() => {
    fetch("http://localhost:8088/types")
      .then((res) => res.json())
      .then((typeData) => {
        updateType(typeData);
      });
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    return (
      fetch(`http://localhost:8088/gears/${gear.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gear),
      })
        .then((response) => response.json())
        .then(() => {
          navigate("/");
        })
    );
  };

  return (
    <Form className="GearForm">
      <h3 className="gearForm__title"></h3>
      <div className="borderThis">
      <div className="insideBorderTwo">
      <fieldset className="smallerFieldSet">
        <div className="form-group">
          <Label htmlFor="name">Name:</Label>
          <textarea
            required
            autoFocus
            type="text"
            className="form-control"
            value={gear.name}
            onChange={(event) => {
              const copy = { ...gear };
              copy.name = event.target.value;
              updateGear(copy);
            }}
          >
            {" "}
            {gear.name}{" "}
          </textarea>
        </div>
      </fieldset>
      <fieldset className="smallerFieldSet">
        <div className="form-group">
          <Label htmlFor="imageUrl">Image:</Label>
          <textarea
            required
            autoFocus
            type="text"
            className="form-control"
            value={gear.imageUrl}
            onChange={(event) => {
              const copy = { ...gear };
              copy.imageUrl = event.target.value;
              updateGear(copy);
            }}
          >
            {" "}
            {gear.imageUrl}
          </textarea>
        </div>
      </fieldset>
      <fieldset className="smallerFieldSet">
        <div className="form-group">
          <Label htmlFor="brand">Brand:</Label>
          <textarea
            required
            autoFocus
            type="text"
            className="form-control"
            value={gear.brand}
            onChange={(event) => {
              const copy = { ...gear };
              copy.brand = event.target.value;
              updateGear(copy);
            }}
          >
            {gear.brand}
          </textarea>
        </div>
      </fieldset>
      <fieldset className="smallerFieldSet">
        <div className="form-group">
          <Label htmlFor="description">Description:</Label>
          <textarea
            required
            autoFocus
            type="text"
            className="form-control"
            value={gear.description}
            onChange={(event) => {
              const copy = { ...gear };
              copy.description = event.target.value;
              updateGear(copy);
            }}
          >
            {gear.description}
          </textarea>
        </div>
      </fieldset>
      <fieldset className="smallerFieldSet">
        <div className="form-group">
          <Label htmlFor="artistUsing">Artist That Uses This Gear :</Label>
          <textarea
            required
            autoFocus
            type="text"
            className="form-control"
            value={gear.artistUsingGear}
            onChange={(event) => {
              const copy = { ...gear };
              copy.artistUsingGear = event.target.value;
              updateGear(copy);
            }}
          >
            {gear.artistUsingGear}
          </textarea>
        </div>
      </fieldset>
      <fieldset className="smallerFieldSet">
        <div className="form-group">
          <Label htmlFor="demonstration">Demonstration:</Label>
          <textarea
            required
            autoFocus
            type="text"
            className="form-control"
            value={gear.demonstration}
            onChange={(event) => {
              const copy = { ...gear };
              copy.demonstration = event.target.value;
              updateGear(copy);
            }}
          >
            {gear.demonstration}
          </textarea>
        </div>
      </fieldset>
 
      <fieldset className="smallerFieldSet" id="centerThis">
      <div className="form-group">
  <div className="typeLabel">Type: </div>
  {types.map((typeObj) => {
    return (
      <div key={typeObj.id} className="radio">
        <Label>
          <input
            type="radio"
            value={typeObj.id}
            checked={gear.typeId === typeObj.id}
            onChange={(event) => {
              const copy = { ...gear }
              copy.typeId = parseInt(event.target.value)
              updateGear(copy)
            }}
          />
          {typeObj.type}
        </Label>
      </div>
    )
  })}
</div>
</fieldset>  

      <fieldset className="smallerFieldSet">
        <div className="form-group">
          <Label htmlFor="price">Price:</Label>
          <textarea
            required
            autoFocus
            type="number"
            className="form-control"
            value={gear.price}
            onChange={(event) => {
              const copy = { ...gear };
              copy.price = event.target.value;
              updateGear(copy);
            }}
          >
            {gear.price}
          </textarea>
        </div>
      </fieldset>
      </div>
      </div>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary form-Btn"
      >
        Save Edits
      </button>
    </Form>
  );
};