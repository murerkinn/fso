import React from 'react'
import contr from './controller'

function Persons(props) {
    function del(id){
        contr.getOne(id)
        .then(res => {
            if(window.confirm(`Are you sure you want to remove information of ${res.data.name} ?`)) {
                contr.remove(id)
                .then(
                    //window.location.reload()
                    props.cbFunc({
                        type: 'success',
                        message: `Information of ${res.data.name} successfully removed from server`
                    })
                )
            }
        })
        .catch(err => {
            console.log(err)
            props.cbFunc({
                type: 'error',
                message: `Information of the person you are looking for has already been removed from server`
            })
        })
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
