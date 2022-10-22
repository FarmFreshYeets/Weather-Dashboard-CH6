var searchForm = $('#search-card')
var cityInput = $('#city-input')
var searchBtn = $('#search-button')
var results = $('#results')
var cityCard = $('#city-card')
var fiveDayForecast = $('#five-day')
var baseURL = 'https://api.openweathermap.org/data/2.5/forecast?q='
var myKey = 'de2f4ba3559bc56a5519829e2d857571'

if (localStorage.getItem('search-history') === null) {
    var searchHistory = {}
} else {
    var searchHistory = JSON.parse(localStorage.getItem('search-history'))
}

searchBtn.on('click', function (event) {
    event.preventDefault()
    var city = cityInput.val()
    getCityForecast(city)
    // results.removeClass('invisible')
})

function getCityForecast(x) {
    var callUrl = baseURL + x + '&appid=' + myKey + '&units=imperial'
    getAPI(callUrl)
}

function getAPI(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
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
                    return
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
}