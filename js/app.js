import {parseRequestURL} from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import About from './views/pages/about.js';
import Search from './views/pages/search.js';
import CurrentWeather from './views/pages/place/currentWeather.js';
import DailyForecastSevenDays from './views/pages/place/dailyForecastSevenDays.js';
import Error404 from './views/pages/error404.js';

const Routes = {
  '/': Search,
  '/about': About,
  '/place/:locality/currentWeather': CurrentWeather,
  '/place/:locality/dailyForecastSevenDays': DailyForecastSevenDays,
};

function router() {
  const headerContainer = document.getElementsByClassName('header-container')[0],
    contentContainer = document.getElementsByClassName('content-container')[0],
    footerContainer = document.getElementsByClassName('footer-container')[0],
    header = new Header(),
    footer = new Footer();

  header.render().then(html => headerContainer.innerHTML = html);

  const request = parseRequestURL(),
    parsedURL = `/${request.resource || ''}${request.locality ? '/:locality' : ''}${request.action ? `/${request.action}` : ''}`,
    page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

  page.render().then(html => {
    contentContainer.innerHTML = html;
    page.afterRender();
  });

  footer.render().then(html => footerContainer.innerHTML = html);
}

window.initGoogleAPI = () => {
  const autocomplete = new google.maps.places.SearchBox(document.getElementById('city-search'));

  autocomplete.addListener('places_changed', () => {
    const place = autocomplete.getPlaces()[0];

    localStorage.setItem('latitude', place.geometry.location.lat());
    localStorage.setItem('longitude', place.geometry.location.lng());
    localStorage.setItem('localityName', place.name);
    localStorage.setItem('locationImageUrl', place.photos[0].getUrl());
  });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
