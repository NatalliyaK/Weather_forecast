import WeatherComponent from './weatherComponent.js';

class DailyForecastSevenDays extends WeatherComponent {
  render() {
    return new Promise(resolve => {
      resolve(`
          <div class="weather-forecast">
          </div>
      `);
    });
  }

  afterRender() {
    this.getDailyForecast();
    this.insertLocationImage();
  }

  getDailyForecast() {
    let dailyWeatherApiUrl = `${this.openWeatherMapUrl}minutely,hourly,current,alerts`;

    fetch(dailyWeatherApiUrl)
      .then(response => response.json())
      .then(dailyWeathers => {
        const dailyForecasts = dailyWeathers.daily;

        dailyForecasts.forEach(dayForecast => {
          const date = new Date(dayForecast.dt * 1000);

          let weekDay = this.getRussianWeekDay(date.getDay()),
            dateMonth = this.getRussianMonth(date.getMonth()),
            dateText = `${date.getDate()} ${dateMonth}`;

          let forecastItemDiv = `
            <div class="forecast-item">
              <div class="day">
                <h4>${weekDay}</h4>
                <h6>${dateText}</h6>
              </div>
              <img src="http://openweathermap.org/img/wn/${dayForecast.weather[0].icon}.png">
              <div class="forecast">Ночью ${Math.round(dayForecast.temp.min)} Днем ${Math.round(dayForecast.temp.max)}
                <h6>${dayForecast.weather[0].description}</h6>
              </div>
            </div>
          `
          document.getElementsByClassName('weather-forecast')[0].insertAdjacentHTML('beforeend', forecastItemDiv);
        })
      })
      .catch (() => {
        const contentWeather = document.getElementsByClassName('weather-forecast')[0];

        contentWeather.innerText = 'Извините, возникла ошибка при загрузке данных.';
      })
  }

  getRussianWeekDay(weekNumber) {
    const russianWeekDays = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];

    return russianWeekDays[weekNumber];
  }

  getRussianMonth(numberMonth) {
    const russianMonths = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ];

    return russianMonths[numberMonth];
  }
}

export default DailyForecastSevenDays;
