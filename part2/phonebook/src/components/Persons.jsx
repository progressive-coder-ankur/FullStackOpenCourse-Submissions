const Persons = ({ searchValue, filteredPersons, persons, handleDelete }) => {
  return (
    <div className='persons-table'>
      <h3>Numbers</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchValue === ''
            ? persons.map(person => (
                <tr key={person.id}>
                  <td>{person.name} </td>
                  <td>{person.number}</td>
                  <td>
                    <button onClick={() => handleDelete(person.id)}>Del</button>
                  </td>
                </tr>
              ))
            : filteredPersons.map(person => (
                <tr key={person.id}>
                  <td>{person.name} </td>
                  <td>{person.number}</td>
                  <td>
                    <button onClick={() => handleDelete(person.id)}>Del</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
