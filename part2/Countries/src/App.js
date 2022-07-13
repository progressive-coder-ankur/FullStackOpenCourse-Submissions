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
  const QueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${queryString}&units=metric&appid=${API_KEY}`;

  
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
  }, [queryString, QueryURL]);

  useEffect(() => {
    searchValue === ''
      ? setFilteredCountries([])
      : setFilteredCountries(
          countries.filter(country =>
            country.name.common.toLowerCase().includes(searchValue)
          )
        );
  }, [searchValue, countries]);

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
      <WeatherInfo name={name} weather={weather} />
    </div>
  );
};

const WeatherInfo = ({ name, weather }) => {
  return (
    <div>
      <h2 className='weather-title'>Weather in {name} </h2>
      <p>Temperature: {weather.main.temp}</p>
      <p>Wind: {weather.wind.speed}</p>
      <img
        src={` http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt='weather-icon'
      />
    </div>
  );
};
