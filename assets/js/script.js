var searchForm = $('#search-card')
var cityInput = $('#city-input')
var searchBtn = $('#search-button')
var results = $('#results')
var cityCard = $('#city-card')
var fiveDayForecast = $('#five-day')
var baseURL = 'https://api.openweathermap.org/data/2.5/forecast?q='
var myKey = 'de2f4ba3559bc56a5519829e2d857571'
var cityCardName = $('#city-name')
var previousSearchBtns = $('#previous-searches')

if (localStorage.getItem('search-history') === null) {
    var searchHistory = ''
    var searchHistorySplit = ''
} else {
    var searchHistory = localStorage.getItem('search-history')
    var searchHistorySplit = searchHistory.split(',')
}

searchBtn.on('click', function (event) {
    event.preventDefault()
    var city = cityInput.val()
    getCityForecast(city)
    fiveDayForecast.text('')
    results.removeClass('invisible')
    if (searchHistorySplit.includes(city) == false) {
        searchHistory = searchHistory + city + ','
        localStorage.setItem('search-history', searchHistory)
    }
    displayPreviousSearches()
})

function displayPreviousSearches() {
    previousSearchBtns.text('')
    for (i = 0; i < searchHistorySplit.length; i++) {
        var previousSearch = document.createElement('button')
        previousSearch.classList.add('btn', 'btn-light', 'border-dark', 'row', 'col-12', 'mb-1', 'ms-0')
        if (searchHistorySplit[i].length > 0) {
            previousSearch.textContent = searchHistorySplit[i]
            previousSearch.setAttribute('city', searchHistorySplit[i])
            previousSearchBtns.append(previousSearch)
        }
        previousSearch.addEventListener('click', function (event) {
            event.preventDefault()
            getCityForecast(event.target.getAttribute('city'))
            fiveDayForecast.text('')
            results.removeClass('invisible')
            displayPreviousSearches()
        })
    }
}

function getCityForecast(x) {
    var callUrl = baseURL + x + '&appid=' + myKey + '&units=imperial'
    getAPI(callUrl)
}

function getAPI(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var cityName = data.city.name
                    var today = {
                        date: moment().format('M/D/YYYY'),
                        temp: data.list[0].main.temp,
                        wind: data.list[0].wind.speed,
                        humidity: data.list[0].main.humidity,
                        icon: 'https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '.png'
                    }
                    var dayOne = {
                        date: moment(data.list[7].dt_txt).format('M/D/YYYY'),
                        temp: data.list[7].main.temp,
                        wind: data.list[7].wind.speed,
                        humidity: data.list[7].main.humidity,
                        icon: 'https://openweathermap.org/img/wn/' + data.list[7].weather[0].icon + '.png'
                    }
                    var dayTwo = {
                        date: moment(data.list[15].dt_txt).format('M/D/YYYY'),
                        temp: data.list[15].main.temp,
                        wind: data.list[15].wind.speed,
                        humidity: data.list[15].main.humidity,
                        icon: 'https://openweathermap.org/img/wn/' + data.list[15].weather[0].icon + '.png'
                    }
                    var dayThree = {
                        date: moment(data.list[23].dt_txt).format('M/D/YYYY'),
                        temp: data.list[23].main.temp,
                        wind: data.list[23].wind.speed,
                        humidity: data.list[23].main.humidity,
                        icon: 'https://openweathermap.org/img/wn/' + data.list[23].weather[0].icon + '.png'
                    }
                    var dayFour = {
                        date: moment(data.list[31].dt_txt).format('M/D/YYYY'),
                        temp: data.list[31].main.temp,
                        wind: data.list[31].wind.speed,
                        humidity: data.list[31].main.humidity,
                        icon: 'https://openweathermap.org/img/wn/' + data.list[31].weather[0].icon + '.png'
                    }
                    var dayFive = {
                        date: moment(data.list[39].dt_txt).format('M/D/YYYY'),
                        temp: data.list[39].main.temp,
                        wind: data.list[39].wind.speed,
                        humidity: data.list[39].main.humidity,
                        icon: 'https://openweathermap.org/img/wn/' + data.list[39].weather[0].icon + '.png'
                    }
                    cityCardName.text(cityName + " (" + today.date + ') ')
                    document.getElementById('weather-icon').src = today.icon
                    $('#temperature').text('Temp: ' + today.temp + '°F')
                    $('#wind').text('Wind: ' + today.wind + ' MPH')
                    $('#humidity').text('Humidity: ' + today.humidity + '%')

                    var fiveDays = [dayOne, dayTwo, dayThree, dayFour, dayFive]

                    for (i = 0; i < fiveDays.length; i++) {
                        var dayCard = document.createElement('div')
                        dayCard.classList.add('row', 'card', 'bg-dark', 'col-2', 'mx-2', 'text-light')
                        var cardHead = document.createElement('h5')
                        cardHead.textContent = fiveDays[i].date
                        var cardIcon = document.createElement('img')
                        cardIcon.src = fiveDays[i].icon
                        var cardTemp = document.createElement('p')
                        cardTemp.textContent = 'Temp: ' + fiveDays[i].temp + '°F'
                        var cardWind = document.createElement('p')
                        cardWind.textContent = 'Wind: ' + fiveDays[i].wind + ' MPH'
                        var cardHumidity = document.createElement('p')
                        cardHumidity.textContent = 'Humidity: ' + fiveDays[i].humidity + '%'
                        dayCard.append(cardHead, cardIcon, cardTemp, cardWind, cardHumidity)
                        fiveDayForecast.append(dayCard)
                    }
                    return
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
}

displayPreviousSearches()
