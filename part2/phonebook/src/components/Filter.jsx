const Filter = ({ searchValue, handleSearchChange }) => {
  return (
    <input
      name='search'
      placeholder='search contacts'
      value={searchValue}
      onChange={handleSearchChange}
    />
  );
};

export default Filter;
