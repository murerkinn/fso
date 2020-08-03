import React from "react";

function PersonForm(props) {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          <strong>name:</strong>{" "}
          <input
            type="text"
            value={props.newName}
            onChange={props.handleNameChange}
            required
          />
          <br />
          <strong>number:</strong>{" "}
          <input
            type="text"
            value={props.newNumber}
            onChange={props.handleNumberChange}
            required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
