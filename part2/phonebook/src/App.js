import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm"
import Filter from "./Filter"
import contr from "./controller"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterVal, setFilterVal] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterVal(event.target.value)
  }

  const updatePersonNum = e => {
    e.preventDefault()
  }

  const addPerson = e => {
    e.preventDefault()
    if (newName === "" || !/^[a-z öçişğü]*$/i.test(newName)) {
      alert('Please enter a valid name')
    }

    if (newNumber === "" || /[^\d -]/.test(newNumber)) {
      alert('Please enter a valid phone number')
    }

    if (persons.some(item => item.name === newName)) {
      if (newNumber === "" || /[^\d -]/.test(newNumber)) {
        alert('Please enter a valid phone number')
      }
      alert(`${newName} already exists in the phonebook.`)
    }
    setPersons([
      ...persons,
      {
        name: newName,
        number: newNumber.replace(/-+|\s+/g, "-").replace(/^-*(.+?)-*$/, "$1")
      }
    ])
    contr.create({name: newName, number: newNumber})
    setNewName("")
    setNewNumber("")
  }

  const filterPersons = () => {
    if(filterVal === "") {
      return persons
    }
    return [...persons].filter(
      item => item.name.toLowerCase().indexOf(filterVal.toLowerCase()) !== -1
    )
  }

  const hook = () => {
    contr.getAll()
    .then(res => {
      setPersons(res.data)
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filterVal} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons()} />
    </div>
  );
};

export default App;
