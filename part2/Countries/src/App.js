import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [queryString, setQueryString] = useState('London');
  const [weather, setWeather] = useState({});

  const [searchValue, setSearchValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState({});

  const URL = 'https://restcountries.com/v3.1/all';
  const Length = filteredCountries.length;
  const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const QueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${queryString}&appid=9681c4b68a89ed3c67e4d73c3c8e1c2d`;
  const handleSearchChange = e => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleShow = name => {
    const SCountry = filteredCountries.filter(c => c.name.common === name);
    setSingleCountry(SCountry[0]);
    setQueryString(name);
    setShow(!show);
  };

  useEffect(() => {
    axios.get(URL).then(res => setCountries(res.data));
  }, []);

  useEffect(() => {
    axios.get(QueryURL).then(res => setWeather(res.data));
  }, [queryString]);

  useEffect(() => {
    searchValue === ''
      ? setFilteredCountries([])
      : setFilteredCountries(
          countries.filter(country =>
            country.name.common.toLowerCase().includes(searchValue)
          )
        );
  }, [searchValue]);

  return (
    <div className='App'>
      <h2>Countries</h2>
      <Filter
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />

      {Length < 1 ? (
        <p>Search for countries... </p>
      ) : Length === 1 ? (
        <SingleCountry
          name={filteredCountries[0].name.common}
          capital={filteredCountries[0].capital}
          area={filteredCountries[0].area}
          languages={filteredCountries[0].languages}
          flags={filteredCountries[0].flags}
        />
      ) : Length <= 10 ? (
        filteredCountries.map(c => (
          <div className='counties-list' key={c.tld}>
            <li>{c.name.common}</li>
            <button onClick={() => handleShow(c.name.common)}>show</button>

            {show && c.name.common === singleCountry.name.common && (
              <SingleCountry
                name={singleCountry.name.common}
                capital={singleCountry.capital}
                area={singleCountry.area}
                languages={singleCountry.languages}
                flags={singleCountry.flags}
                weather={weather}
              />
            )}
          </div>
        ))
      ) : Length > 10 ? (
        <p>Too many matches, specify another filter </p>
      ) : null}
    </div>
  );
}

export default App;

const SingleCountry = ({ name, capital, area, languages, flags, weather }) => {
  return (
    <div className='single-country__wrapper'>
      <h2>{name}</h2>

      <div>
        <p>capital: {capital}</p>
        <p>area: {area}</p>
      </div>

      <div>
        <ul>Languages:</ul>
        {Object.keys(languages).map((l, i) => {
          return <li key={i}>{languages[l]}</li>;
        })}
      </div>

      <div>
        <img alt={name + '-country-flag'} src={flags.png} />
      </div>
      <WeatherInfo name={name} />
    </div>
  );
};

const WeatherInfo = ({ name, weather }) => {
  return (
    <div>
      <h2 className='weather-title'>Weather in {name} </h2>
      <pre>{weather}</pre>
    </div>
  );
};
