import { Component, Fragment, useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
// import './App.css'
const weather_key = import.meta.env.VITE_WEATHER_KEY

function App() {
  const [countries, setCountries] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  // const [loading, setLoading] = useState('loading')
  const searchNotification = ['Too many matches, specify another filter', '']
  const [notification, setNotification] = useState(searchNotification[1])
  const [country, setCountry] = useState(null)


  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {

      // console.log(response.data[0])

      setCountries(response.data.map(data =>  ({
        name : data.name.common,
        capital : data.capital ? data.capital[0] : [],
        area : data.area,
        languages : data.languages,
        flags : data.flags.png,
        // lat : data.latlng[0],
        // lon : data.latlng[1],
        // weather_api : `https://api.openweathermap.org/data/3.0/onecall?lat=${data.latlng[0]}&lon=${data.latlng[1]}&exclude=${[]}&appid=`
      })))

      // setLoading('loaded')
      console.log('loaded')
      // console.log(weather_key)
    })
  }, [])

  // console.log(countries[0])

  const handleSearch = (event) => {
    const value = event.target.value
    let result
    setSearchValue(value)
    setCountry(null)

    if (value.length !== 0) {
      result = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
    } else result = []

    setSearchResult(result)
    if (result.length > 10) setNotification(searchNotification[0])
    else if (result.length < 1) setNotification(searchNotification[1])
  }

  const openCountry = (country, setCountry) => {
    setCountry(country)
  }

  const styleT = {
    margin: 0,
    // color: 'red'
  }

  return (
    <Fragment>
      <label htmlFor="countries">Find countries</label> <input id="countries" type='text' value={searchValue} onChange={handleSearch}/>

      <div className='countryView'>
        {
          (searchResult.length > 10) | (searchResult.length < 1) ? (<p>{notification}</p>) : 
          (searchResult.length === 1) ? (
            <CountryView style={styleT} country={searchResult[0]} weather_key={weather_key}/>
          ) : 
          (<ul className='subCountryView'>{searchResult.map(country => <li key={country.name} style={{listStyleType: 'none'}}>{country.name}   <input style={{marginBottom: 3}} value='show' type='button' onClick={() => openCountry(country, setCountry)}/></li>)}</ul>)
        }
      </div>

      <CountryView style={styleT} country={country} weather_key={weather_key}/>

      {/* <br/><br/>
      <h2>All countries</h2>
      {loading === 'loading' ? <p>loading...</p> :
      <pre>
        {countries.map(ct => ct +'\n')}
      </pre> } */}
    </Fragment>
  )
}

const CountryView = ({country, style, weather_key}) => {

  if (!country) return null

  const [countryWeather, setCountryWeather] = useState(null)

  const api = `https://api.weatherapi.com/v1/current.json?key=${weather_key}&q=${country.capital}&aqi=no`

  // console.log(api)

  useEffect(() => {
    axios.get(api)
    .then(response => {
      const ccountry = {}
      ccountry.temperature = response.data.current.temp_c
      ccountry.cloud = response.data.current.condition.icon
      ccountry.wind = response.data.current.wind_mph
      
      setCountryWeather(ccountry)
      // console.log(ccountry)
    })
    .catch(error => {
      console.error('Weather fetch failed', error)
    })
  }, [api])

  return (
    <>
      <h1>{country.name}</h1>
      <p style={style}>Capital {country.capital}</p>
      <p style={style}>Area {country.area}</p>

      <h2>Languages</h2>
      <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
      <img src={country.flags} width={200} height='auto'/>

      <h2>Weather in {country.capital}</h2>
      {countryWeather && (
        <>
          <p>Temperature {countryWeather.temperature}</p>
          <img src={countryWeather.cloud} width={80} height='auto' />
          <p>Wind {countryWeather.wind}</p>
        </>
      )}
    </>
  )
}

export default App

// https://api.openweathermap.org/data/3.0/onecall?lat=10&lon=8&exclude=&appid=9697a2e3bd442f17c2eecc240b2b5f7e

// https://api.weatherapi.com/v1/current.json?key=3c8fda791d0e4d1aa1612330263101&q=London&aqi=no

// const weather_api_with_key = `https://api.weatherapi.com/v1/current.json?key=${3c8fda791d0e4d1aa1612330263101}&q=${state}&aqi=no`