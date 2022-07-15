import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/phonebook';
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);

  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [errormsg, setErrormsg] = useState(null);

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
      persons.filter(person => person.name.toLowerCase().includes(searchValue))
    );
  };

  const checkNewPersonName = () => {
    const filtered = persons.filter(person => person.name === newPerson);
    const newPersonObject = {
      name: newPerson,
      number: newNumber,
    };

    if (filtered.length > 0) {
      if (
        window.confirm(
          `${newPerson} is already added to the phonebook, do you want to change the number ?`
        )
      ) {
        phonebookService
          .updatePerson(filtered[0].id, newPersonObject)
          .then(res =>
            setPersons(
              persons.map(p => (p.id !== filtered[0].id ? p : res.data))
            )
          )
          .then(() => {
            setErrormsg({
              msg: `${newPerson} number updated succesfully`,
              type: 'success',
            });
            setTimeout(() => {
              setErrormsg(null);
            }, 5000);
          })

          .catch(error => {
            setErrormsg({
              msg: `Something went wrong, ${error.message}`,
              type: 'failed',
            });

            setTimeout(() => {
              setErrormsg(null);
            }, 5000);
          });
      }
    } else {
      phonebookService
        .createNewPerson(newPersonObject)
        .then(res => setPersons(persons.concat(res.data)))
        .then(() => {
          setErrormsg({
            msg: `${newPerson} was added succesfully`,
            type: 'success',
          });
          setTimeout(() => {
            setErrormsg(null);
          }, 5000);
        })
        .catch(error => {
          setErrormsg({
            msg: `Something went wrong, ${error.message}`,
            type: 'failed',
          });

          setTimeout(() => {
            setErrormsg(null);
          }, 5000);
        });
    }
    setNewPerson('');
    setNewNumber('');
  };

  const addPerson = event => {
    event.preventDefault();
    checkNewPersonName();
  };

  const handleDelete = id => {
    const name = persons.find(p => p.id === id).name;
    if (window.confirm(`Delete ${name}  ?`)) {
      phonebookService
        .deletePerson(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
        .then(() => {
          setErrormsg({
            msg: `${name} was deleted succesfully`,
            type: 'success',
          });
          setTimeout(() => {
            setErrormsg(null);
          }, 5000);
        })
        .catch(error => {
          setErrormsg({
            msg: ` Information of ${name} has been already removed from the server, ${error.message}`,
            type: 'failed',
          });

          console.log(error);

          setTimeout(() => {
            setErrormsg(null);
          }, 5000);
        });
    }
  };

  const closeNotification = () => {
    setErrormsg(null);
  };

  useEffect(() => {
    phonebookService.getAllPersons().then(res => setPersons(res.data));
  }, []);

  return (
    <div className='App'>
      <h2 className='main-title'>Phonebook</h2>
      <Notification error={errormsg} close={closeNotification} />
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        newPerson={newPerson}
        newNumber={newNumber}
      />

      <div className='search-section'>
        <h3>Numbers</h3>

        <Filter
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
        />
      </div>

      <Persons
        searchValue={searchValue}
        persons={persons}
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
