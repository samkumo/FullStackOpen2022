import { useState, useEffect } from 'react'
import axios from 'axios'

const url_all = 'https://restcountries.com/v3.1/all'
const url_name = 'https://restcountries.com/v3.1/name/'

//Weather functions
function getWeatherUrl(lat, lon, key) {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?' +
    'units=metric' +
    '&lat=' +
    lat +
    '&lon=' +
    lon +
    '&appid=' +
    key
  console.log(url)
  return url
}
const Weather = (props) => {
  const [weather, setWeather] = useState([])
  const [temp, setTemp] = useState()
  const [icon, setIcon] = useState()
  const [wind, setWind] = useState()
  const apikey = process.env.REACT_APP_API_KEY
  const weatherIcon = 'http://openweathermap.org/img/wn/'
  const lat = props.country.capitalInfo.latlng[0]
  const lon = props.country.capitalInfo.latlng[1]

  const hook = () => {
    axios.get(getWeatherUrl(lat, lon, apikey)).then((response) => {
      //console.log('axios: ', response.data.main.temp)
      setWeather(response.data)
      setTemp(response.data.main.temp)
      setIcon(response.data.weather[0].icon)
      setWind(response.data.wind.speed)
    })
  }
  useEffect(hook, [])
  return (
    <div>
      <p>Temperature: {Math.round(temp)} 'C</p>
      <img src={weatherIcon + icon + '.png'}></img>
      <p>Wind: {wind} m/s</p>
    </div>
  )
}

// Country functions
const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <CountryDetail country={countries[0]}></CountryDetail>
  } else if (countries.length > 10) {
    return (
      <ErrorDisplay text="Too many matches, specify another filter"></ErrorDisplay>
    )
  } else {
    return (
      //.slice trims the array to first 10 positions
      <ul>
        <CountryList countries={countries}></CountryList>
      </ul>
    )
  }
}
const Country = ({ country }) => {
  return <li key={country.cca3}>{country.name.common}</li>
}

const CountryList = ({ countries }) => {
  return countries.map((country) => {
    return <Country key={country.cca3} country={country}></Country>
  })
}
const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        Capital: {country.capital} <br />
        Area: {country.area}
      </p>
      <h3>Languages:</h3>
      <Languages languages={country.languages}></Languages>
      <img src={country.flags.png}></img>
      <h3>Weather in {country.capital}</h3>
      <Weather country={country}></Weather>
    </div>
  )
}
const Languages = ({ languages }) => {
  //Transforming language object into array just to make it easier to handle
  const array = []
  Object.keys(languages).forEach(function (key, index) {
    array.push([key, languages[key]])
  })

  return (
    <ul>
      {array.map((language) => {
        return <li key={language[0]}>{language[1]}</li>
      })}
    </ul>
  )
}

//Other functions
const ErrorDisplay = ({ text }) => {
  return <p>{text}</p>
}
const Search = (props) => {
  return (
    <form onSubmit={props.searchCountries}>
      Find Countries
      <input
        value={props.searchStr}
        onChange={props.handleSearchStrChange}
      ></input>
    </form>
  )
}

//Main App
const App = () => {
  const [countries, setCountries] = useState([]) //All countries
  const [countriesFilter, setCountriesFilter] = useState([]) //Selected subset of countries
  const [searchStr, setSearchStr] = useState('')

  const hook = () => {
    axios.get(url_all).then((response) => {
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  const handleSearchStrChange = (event) => {
    event.preventDefault()
    setSearchStr(event.target.value)
  }
  const searchCountries = (event) => {
    event.preventDefault()
    setCountriesFilter(
      countries.filter((country) => {
        return country.name.common
          .toUpperCase()
          .includes(searchStr.toUpperCase())
      })
    )
  }

  return (
    <div className="App">
      <h1>Countries</h1>
      <form onSubmit={searchCountries}>
        Find Countries
        <input value={searchStr} onChange={handleSearchStrChange}></input>
      </form>
      <div>
        <Countries countries={countriesFilter}></Countries>
      </div>
    </div>
  )
}

export default App
