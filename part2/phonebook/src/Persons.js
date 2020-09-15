import React from 'react'
import contr from './controller'

function Persons(props) {
    function del(id){
        if(window.confirm(`Are you sure that you want to remove this information ?`)) {
            contr.remove(id)
            .then(window.location.reload())
        }
    }
    return (
        <div>
            <ul>
                {props.persons.map(person => 
                    <p key={person.name} ><strong>Name:</strong> {person.name} ~ <strong>Number:</strong> {person.number} <button onClick={() => del(person.id)}>delete</button></p>
                )}
            </ul>
        </div>
    )
}

export default Persons
