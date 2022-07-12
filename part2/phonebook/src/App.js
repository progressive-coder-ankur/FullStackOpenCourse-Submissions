import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const URL = 'http://localhost:3001/persons';

function App() {
  const [persons, setPersons] = useState([]);

  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(null);

  const handleNameChange = e => {
    e.preventDefault();
    setNewPerson(e.target.value);
  };

  const handleNumberChange = e => {
    e.preventDefault();
    setNewNumber(e.target.value);
  };

  const handleSearchChange = e => {
    e.preventDefault();
    setSearchValue(e.target.value);
    setFilteredPersons(
      persons.filter(person => person.name.includes(searchValue))
    );
  };

  const checkNewPersonName = () => {
    const filtered = persons.filter(person => person.name === newPerson);
    return filtered.length > 0 ? true : false;
  };

  const addPerson = event => {
    event.preventDefault();
    checkNewPersonName === true
      ? alert(`${newPerson} is already added to phonebook`)
      : setPersons(
          persons.concat({
            name: newPerson,
            number: newNumber,
            id: persons[persons.length - 1].id + 1,
          })
        );
    setNewPerson('');
    setNewNumber('');
  };

  useEffect(() => {
    axios.get(URL).then(res => setPersons(res.data));
  }, []);

  return (
    <div className='App'>
      <h2>Phonebook</h2>
      <Filter
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        newPerson={newPerson}
        newNumber={newNumber}
      />

      <Persons
        searchValue={searchValue}
        persons={persons}
        filteredPersons={filteredPersons}
      />
    </div>
  );
}

export default App;
