import { useState } from 'react';
import './normalize.css';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+1845877827' },
    { name: 'Ankur Singh', number: '+9779855082196' },
  ]);

  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = e => {
    e.preventDefault();
    setNewPerson(e.target.value);
  };

  const handleNumberChange = e => {
    e.preventDefault();
    setNewNumber(e.target.value);
  };

  const checkNewPersonName = () => {
    const filtered = persons.filter(person => person.name === newPerson);
    return filtered.length > 0 ? true : false;
  };

  const addPerson = event => {
    event.preventDefault();
    checkNewPersonName === true
      ? alert(`${newPerson} is already added to phonebook`)
      : setPersons(persons.concat({ name: newPerson, number: newNumber }));
    setNewPerson('');
    setNewNumber('');
  };

  return (
    <div className='App'>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <label for='name'>
          Name:{' '}
          <input
            name='name'
            id='name'
            value={newPerson}
            onChange={e => handleNameChange(e)}
          />
        </label>
        <label for='number'>
          Number:{' '}
          <input
            id='number'
            name='number'
            value={newNumber}
            onChange={e => handleNumberChange(e)}
          />
        </label>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
}

export default App;
