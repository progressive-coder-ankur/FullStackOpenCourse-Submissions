const Persons = ({ searchValue, filteredPersons, persons }) => {
  return (
    <div className='persons-table'>
      <h3>Numbers</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {searchValue !== ''
            ? filteredPersons.map(person => (
                <tr key={person.name}>
                  <td>{person.name} </td>
                  <td>{person.number}</td>
                </tr>
              ))
            : persons.map(person => (
                <tr key={person.name}>
                  <td>{person.name} </td>
                  <td>{person.number}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
