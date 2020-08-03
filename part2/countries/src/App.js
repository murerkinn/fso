import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState(countries);
  const [single, setSingle] = useState("");
  const [weather, setWeather] = useState("")
  const api_key = process.env.REACT_APP_API_KEY;

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const getWeather = () => {
    if(weather !== "") {
      return (
        <div>
          <h2>Weather in {weather.location.name}</h2>

          <p><strong>temperature: </strong>{weather.current.temperature}</p>
          <img src={weather.current.weather_icons} alt="Weather Icon" />
          <p><strong>wind: </strong>{weather.current.wind_speed} mph - direction {weather.current.wind_dir}</p>
        </div>
      )
    }
    return ""
  }

  const getOnly = () => {
    if(single !== "") {
      return (
        <div>
          <h1>{single.name}</h1>
  
          <h2>languages</h2>
  
          <p>capital: {single.capital}</p>
          <p>population: {single.population}</p>
  
          <ul>
            {single.languages.map((lang) => (
              <li key={lang.name}>{lang.name}</li>
            ))}
          </ul>
  
          <img height={180} width={250} src={single.flag} alt={single.name} />
        </div>
      );
    }
    return ""
  };

  const getSingle = (cioc, name) => {
     axios
      .get(`https://restcountries.eu/rest/v2/alpha/${cioc}`)
      .then((res) => {
        setSingle(res.data);
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`)
        .then(resp => {
          setWeather(resp.data)
        })
      });
  };

  const fetchData = async () => {
    const req = await axios.get("https://restcountries.eu/rest/v2/all");
    setCountries(req.data);
    const end = countries.filter((country) =>
      country.name.toLowerCase().includes(filter)
    );
    setResults(end);
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div>
      <span>
        type in to find countries{" "}
        <input type="text" value={filter} onChange={handleFilterChange} />
      </span>
      {results.length > 10 && <p>Too many matches, specify another filter</p>}
      {results.length <= 10 && results.length > 1 && (
        <ul>
          { results.map((result) => (
            <p key={result.name}>
              {result.name}
              <button
                onClick={() =>
                  getSingle(result.cioc.toLowerCase(), result.name)
                }
              >
                show
              </button>
            </p>
          ))}
        </ul>
      )}
      {results.length === 1 && (getSingle(results[0].cioc.toLowerCase(), results[0].name))}
      {getOnly()}
      {getWeather()}
    </div>
  );
};

export default App;
