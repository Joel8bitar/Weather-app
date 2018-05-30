// API Key
const ID = '2fb9e73076b2e4d1b037c1fb53fc6fbd'
// ip api: https://ipapi.co/json/
const ipUrl = 'https://ipapi.co/json/'
// Weather map API: https://openweathermap.org/api
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q='

GetData()
async function GetData () {
  const weatherDaysAhead = await fetchData('http://api.openweathermap.org/data/2.5/forecast?id=2673730&units=metric&APPID=2fb9e73076b2e4d1b037c1fb53fc6fbd')
  const iconImg = 'http://openweathermap.org/img/w/'



  // store variables for output
  // let weatherDisplay = document.getElementById('weatherDisplay');
  // let weatherOptions = document.getElementById('weatherOptions');

  let optionsOutput = ''
  // Kelvin to Celsius	° C = K - 273
  let kelToC = function (kel) {
    return kel - 273
  }

    // Fahrenheit to Celsius	° C = 5/9 (° F - 32)
  let fahToC = function (fah) {
    return (fah - 32) * 5 / 9
  }

  // Kelvin to Fahrenheit	° F = 9/5 (K - 273) + 32
  let kelToF = function (kel) {
    return ((kel - 273) * 9 / 5) + 32
  }

    // Celsius to Fahrenheit	° F = 9/5 ( ° C) + 32
  let celToF = function (cel) {
    return ((cel) * 9 / 5) + 32
  }

  // fetch call för att få ip
  fetch(ipUrl)
    // transformera till Json
    .then(resp => resp.json())
    // Jobbar med Responsen från Json
    .then(function (data) {
    // Response items / ta bort whitespaces
      let city = data.city.replace(/\s/g, '')
      let country = data.country
      let reqURL = weatherURL + city + ',' + country + '&units=imperial' + '&APPID=' + ID

      // Lägger till text till output
      optionsOutput = `<table>
            <th>Weather</th>
            <th>Right now</th>
            <tr>
              <td>Location</td>
              <td>${data.city}, ${data.region}</td>
            </tr>`

      // Förfrågan om att öppna API från openweathermap
      fetch(reqURL, { method: 'GET', mode: 'cors'})
        .then(resp => resp.json())
        .then(function (weatherData) {
        // Variabler för att lagra temp mm. till sidan
          let temp = weatherData.main.temp.toFixed()
          let body = document.querySelector('body')
          let iconIMG

          // Sätter väder till iconIMG samt matchar
          switch (weatherData.weather[0].icon) {
            case '01d':
              iconIMG = `<img src='http://openweathermap.org/img/w/01d.png' alt='weather icon'>`
              break
            case '02d':
              iconIMG = `<img src='http://openweathermap.org/img/w/02d.png' alt='weather icon'>`
              break
            case '03d':
              iconIMG = `<img src='http://openweathermap.org/img/w/03d.png' alt='weather icon'>`
              break
            case '04d':
              iconIMG = `<img src='http://openweathermap.org/img/w/04d.png' alt='weather icon'>`
              break
            case '09d':
              iconIMG = `<img src='http://openweathermap.org/img/w/09d.png' alt='weather icon'>`
              break
            case '10d':
              iconIMG = `<img src='http://openweathermap.org/img/w/10d.png' alt='weather icon'>`
              break
            case '11d':
              iconIMG = `<img src='http://openweathermap.org/img/w/11d.png' alt='weather icon'>`
              break
            case '13d':
              iconIMG = `<img src='http://openweathermap.org/img/w/13d.png' alt='weather icon'>`
              break
            case '01n':
              iconIMG = `<img src='http://openweathermap.org/img/w/01n.png' alt='weather icon'>`
              break
            case '02n':
              iconIMG = `<img src='http://openweathermap.org/img/w/02n.png' alt='weather icon'>`
              break
            case '03n':
              iconIMG = `<img src='http://openweathermap.org/img/w/03n.png' alt='weather icon'>`
              break
            case '04n':
              iconIMG = `<img src='http://openweathermap.org/img/w/04n.png' alt='weather icon'>`
              break
            case '09n':
              iconIMG = `<img src='http://openweathermap.org/img/w/09n.png' alt='weather icon'>`
              break
            case '10n':
              iconIMG = `<img src='http://openweathermap.org/img/w/10n.png' alt='weather icon'>`
              break
            case '11n':
              iconIMG = `<img src='http://openweathermap.org/img/w/11n.png' alt='weather icon'>`
              break
            case '13n':
              iconIMG = `<img src='http://openweathermap.org/img/w/13n.png' alt='weather icon'>`
              break
          }

          weatherDisplay.innerHTML = `${iconIMG} ${temp} &#x2109;`

          // Listeners för celsius och Fahrenheit-knappar
          let celButton = document.getElementById('cel')
          let fahButton = document.getElementById('fah')

          // Fahrenheitknappen
          fahButton.addEventListener('click', function (e) {
            if (weatherDisplay.textContent.includes('℃')) {
              let fahResult = celToF(weatherDisplay.textContent.replace(/[^a-zA-Z0-9 ]/g, ''))
              weatherDisplay.innerHTML = `${iconIMG} ${fahResult.toFixed()} &#x2109;`
            }
          })

          // Celsiusknappen
          celButton.addEventListener('click', function (e) {
            if (weatherDisplay.textContent.includes('℉')) {
              let celResult = fahToC(weatherDisplay.textContent.replace(/[^a-zA-Z0-9 ]/g, ''))
              weatherDisplay.innerHTML = ` ${iconIMG} ${celResult.toFixed()} &#x2103;`
            }
          })
          // Funktion som ändrar bakgrund beroende på temperatur
          function setBackground (temp) {
          // vinter:
            if (temp < 40) return body.style.backgroundImage = "url('https://i.imgur.com/sxjAWXB.jpg')"
            // Vår/höst:
            if (temp > 40 && temp < 65) return body.style.backgroundImage = "url('https://lonelyplanetwp.imgix.net/2017/10/GettyRF_477322165-b25e63193cfa.jpg?fit=min&q=40&sharp=10&vib=20&w=1470')"
            // sommar:
            if (temp > 65) return body.style.backgroundImage = "url('https://i.ytimg.com/vi/1CGR4DkPZRs/maxresdefault.jpg')"
          }

          setBackground(temp)

          optionsOutput += `<tr>
                            <td>Conditions</td>
                            <td>${weatherData.weather[0].description}</td>
                         </tr>
                          <tr>
                            <td>Wind</td>
                            <td>${weatherData.wind.speed.toFixed()} mph, ${toDirection(weatherData.wind.deg)}</td>
                         </tr>
                         <tr>
                            <td>Humidity</td>
                            <td>${weatherData.main.humidity} %</td>
                         </tr>
                       </table>`

          
          weatherOptions.innerHTML = optionsOutput
        })
    })

  // Bestämmer åt vilket håll vinden blåser åt beroende på //temperatur från api.
  function toDirection (degree) {
    if (degree > 337.5) return 'North'
    if (degree > 292.5) return 'Northwest'
    if (degree > 247.5) return 'West'
    if (degree > 202.5) return 'Southwest'
    if (degree > 157.5) return 'South'
    if (degree > 122.5) return 'Southeast'
    if (degree > 67.5) return 'East'
    if (degree > 22.5) { return 'Northeast' }
    return 'North'
  }

  let myWeatherList = document.getElementById('forecastWeather')
  //Loop för att få väderdata för 5 dagar framåt
  for (var i = 5; i < weatherDaysAhead.list.length; i += 8) {
    let forecastDiv = document.createElement('div')
    forecastDiv.classList.add('forecast-weather-style')

    let forecastDate = document.createElement('p')
    let forecastDateText = document.createTextNode(new Date(weatherDaysAhead.list[i].dt_txt).toDateString())
    forecastDate.appendChild(forecastDateText)
    forecastDate.classList.add('forecast-p')
    forecastDiv.appendChild(forecastDate)

    let forecastTempMin = document.createElement('p')
    let forecastTempMinText = document.createTextNode(' Temp-min ' + Math.floor(weatherDaysAhead.list[i].main.temp))
    forecastTempMin.appendChild(forecastTempMinText)
    forecastDiv.appendChild(forecastTempMin)

    let forecastTempMax = document.createElement('p')
    let forecastTempMaxText = document.createTextNode(' Temp-max ' + Math.floor(weatherDaysAhead.list[i].main.temp))
    forecastTempMax.appendChild(forecastTempMaxText)
    forecastDiv.appendChild(forecastTempMax)

    let newLogo = document.createElement('img')
    newLogo.setAttribute('src', iconImg + weatherDaysAhead.list[i].weather[0].icon + '.png')
    newLogo.classList.add('weather-icon')

    forecastDiv.appendChild(newLogo)
    myWeatherList.appendChild(forecastDiv)
  }
}

async function fetchData (url) {
  let promise = await fetch(url)
  let data = await promise.json()
  return data
}
