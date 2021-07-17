import Component from '../component.js';

class Search extends Component {
  render() {
    return new Promise(resolve => {
      resolve(`     
          <form method="get">
              <fieldset>
                  <label for="city-search">Введите населенный пункт</label>
                  <input type="text" id="city-search" placeholder="Минск">
              </fieldset>
              <button class="search__get-weather">Узнать погоду</button>
          </form>
      `);
    });
  }

  afterRender() {
    this.insertGoogleScript();
    this.setActions();
  }

  insertGoogleScript() {
    const google_api = document.createElement('script'),
      api_key = 'AIzaSyArkQS0Nq8JSfSTqiKeM4OsMAvkyzKLObg';

    google_api.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&callback=initGoogleAPI&libraries=places,geometry`;
    document.body.appendChild(google_api);
  }

  setActions() {
    const getWeatherBtn = document.getElementsByClassName('search__get-weather')[0];
    getWeatherBtn.addEventListener('click', event => {
      event.preventDefault();

      this.redirectToCurrentWeather()
    });
  }

  redirectToCurrentWeather() {
    let place = localStorage.getItem('localityName');

    location.hash = `#/place/${place}/currentWeather`;
  }
}

export default Search;