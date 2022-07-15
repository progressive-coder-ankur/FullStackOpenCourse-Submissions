const PersonForm = ({
  addPerson,
  newPerson,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form className='person-form' onSubmit={addPerson}>
      <h3>Add new person</h3>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          name='name'
          id='name'
          required
          value={newPerson}
          onChange={e => handleNameChange(e)}
        />
      </div>
      <div>
        <label htmlFor='number'>Contacts</label>
        <input
          id='number'
          name='number'
          value={newNumber}
          required
          onChange={e => handleNumberChange(e)}
        />
      </div>
      <div className='add'>
        <button className='add-button' type='submit'>
          Add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
