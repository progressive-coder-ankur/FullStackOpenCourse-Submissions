const Filter = ({ searchValue, handleSearchChange }) => {
  return (
    <input
      name='search'
      placeholder='search contacts'
      value={searchValue}
      onChange={e => handleSearchChange(e)}
    />
  );
};

export default Filter;
