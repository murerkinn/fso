import React from 'react'

function Persons(props) {
    return (
        <div>
            <ul>
                {props.persons.map(person => 
                <p key={person.name} ><strong>Name:</strong> {person.name} ~ <strong>Number:</strong> {person.number}</p>
                )}
            </ul>
        </div>
    )
}

export default Persons
