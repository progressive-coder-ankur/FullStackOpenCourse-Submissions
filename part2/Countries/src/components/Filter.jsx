const Filter = ({ searchValue, handleSearchChange }) => {
  return (
    <input
      name='search'
      placeholder='search countries'
      value={searchValue}
      onChange={handleSearchChange}
    />
  );
};

export default Filter;
