import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm"
import Filter from "./Filter"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState(persons)
  const copy = [...persons];

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      copy.push({ name: newName, number: newNumber });
      setPersons(copy);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then((res) => {
      setPersons(res.data)
    })
    const end = persons.filter(person => person.name.toLowerCase().includes(filter))
    setResults(end)
  }, [filter, persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={results} />
    </div>
  );
};

export default App;
