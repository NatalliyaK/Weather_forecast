import Component from '../../component.js';

class WeatherComponent extends Component {
  openWeatherMapApiKey = 'ad5e681ccc66a79f00b77212220a3a33';
  latitude = localStorage.getItem('latitude');
  longitude = localStorage.getItem('longitude');
  openWeatherMapUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.latitude}&lon=${this.longitude}&units=metric&lang=ru&appid=${this.openWeatherMapApiKey}&exclude=`;

  insertLocationImage() {
    const contentContainer = document.getElementsByClassName('content-container')[0];

    let locationImage = `<img src="${localStorage.getItem('locationImageUrl')}" class="location-image" alt="">`;

    contentContainer.insertAdjacentHTML('beforeend', locationImage);
  }
}

export default WeatherComponent;
