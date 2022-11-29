import { useState, useEffect } from 'react'
import axios from 'axios'

const url_all = 'https://restcountries.com/v3.1/all'
const url_name = 'https://restcountries.com/v3.1/name/'

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
const Languages = ({ languages }) => {
  //Transforming language object into array just to make it easier to handle
  const array = []
  Object.keys(languages).forEach(function (key, index) {
    array.push([key, languages[key]])
  })

  return (
    <ul>
      {array.map((language) => {
        console.log(language)
        return <li key={language[0]}>{language[1]}</li>
      })}
    </ul>
  )
}

const CountryDetail = ({ country }) => {
  console.log(country.languages)
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
    </div>
  )
}
const ErrorDisplay = ({ text }) => {
  return <p>{text}</p>
}

const App = () => {
  const [countries, setCountries] = useState([]) //All countries
  const [countriesFilter, setCountriesFilter] = useState([]) //Selected subset of countries
  const [searchStr, setSearchStr] = useState('')

  const hook = () => {
    axios.get(url_all).then((response) => {
      setCountries(response.data)
    })
  }
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
  useEffect(hook, [])

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
