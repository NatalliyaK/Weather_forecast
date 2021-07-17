import WeatherComponent from './weatherComponent.js';

class CurrentWeather extends WeatherComponent {
  render() {
    let place = localStorage.getItem('localityName');

    return new Promise(resolve => {
      resolve(`
          <div class="weather-widget">
              <div class="weather-icon row">
                    <img class="icon" alt="">
              </div>
              <h1 class="temp-c row"></h1>
              <h5 class="description row"></h5>
              <h3 class="location-name row">${place}</h3>
              <h4 class="advice row"></h4>
              <h5 class="feels_like row"></h5>
              <h5 class="dew_point row"></h5>
              <h5 class="humidity row"></h5>
              <h5 class="wind row"></h5>
              <h5 class="clouds row"></h5>
              <h5 class="visibility row"></h5>
          </div>
          <button class="search__get-daily-forecast">Узнать прогноз на 7 дней</button>
      `);
    });
  }

  afterRender() {
    this.getCurrentWeather();
    this.setActions();
    this.insertLocationImage();
  }

  getCurrentWeather() {
    let currentWeatherApiUrl = `${this.openWeatherMapUrl}minutely,hourly,daily,alerts`;

    fetch(currentWeatherApiUrl)
      .then(response => response.json())
      .then(currentWeather => {
        const response = currentWeather.current;

        document.getElementsByClassName('temp-c')[0].innerText = `${Math.round(response.temp)} °C`;
        document.getElementsByClassName('humidity')[0].innerText = `Влажность: ${response.humidity}%`;
        document.getElementsByClassName('wind')[0].innerText = `Ветер: ${response.wind_speed} м/с`;
        document.getElementsByClassName('clouds')[0].innerText = `Облачность: ${response.clouds}%`;
        document.getElementsByClassName('feels_like')[0].innerText = `По ощущениям: ${Math.round(response.feels_like)} °C`;
        document.getElementsByClassName('dew_point')[0].innerText = `Точка росы: ${Math.round(response.dew_point)} °C`;
        document.getElementsByClassName('visibility')[0].innerText = `Дальность видимости: ${response.visibility} м`;
        document.getElementsByClassName('description')[0].innerText = response.weather[0].description;
        document.getElementsByClassName('advice')[0].innerText = this.getWeatherAdvice(response.weather[0].main);
        document.getElementsByClassName('icon')[0].setAttribute('src', `http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`);
      })
      .catch(() => {
        const contentWeather = document.getElementsByClassName('weather-widget')[0];

        contentWeather.innerText = 'Извините, возникла ошибка при загрузке данных.';
      })
  }

  setActions() {
    const getDailyForecast = document.getElementsByClassName('search__get-daily-forecast')[0];
    getDailyForecast.addEventListener('click', event => {
      event.preventDefault();

      this.redirectToDailyForecast()
    });
  }

  getWeatherAdvice(shortWeatherDescription) {
    let advice;

    switch (shortWeatherDescription) {
      case 'Clear':
        advice = 'Сегодня хорошо и солнечно. Наденьте шорты! Идите на пляж или в парк, и купите мороженое.';
        break;
      case 'Atmosphere':
        advice = 'Сегодня туманно, в пасмурный летний день слегка утеплиться помогают вещи, которые можно легко снять и надеть по необходимости';
        break;
      case 'Rain':
      case 'Thunderstorm':
      case 'Drizzle':
        advice = 'На улице дождь. Возьмите плащ и зонт, и не гуляйте слишком долго';
        break;
      case 'Snow':
        advice = 'Идёт снег - морозно! Лучше всего посидеть с чашкой горячего шоколада или слепить снеговика.';
        break;
      case 'Clouds':
        advice = 'Дождя нет, но небо серое и мрачное, но все может измениться в любую минуту, поэтому на всякий случай возьмите дождевик.';
        break;
      default:
        advice = '';
    }

    return advice;
  }

  redirectToDailyForecast() {
    let place = localStorage.getItem('localityName');

    location.hash = `#/place/${place}/dailyForecastSevenDays`;
  }
}

export default CurrentWeather;
