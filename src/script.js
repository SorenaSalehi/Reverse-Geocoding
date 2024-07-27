"use strict";

const countriesContainer = document.querySelector(".countries");

//render country HTML
const renderCountry = function (country) {
  const html = ` <article class="country">
        <img class="country__img" src="${country.flags.svg}" />
        <div class="country__data">
          <h3 class="country__name">${country.name.common}</h3>
          <h4 class="country__region">${country.region}</h4>
          <p class="country__row"><span>👫</span>${(
            country.population / 1000000
          ).toFixed(1)}M</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(country.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${Object.keys(
            country.currencies
          )}</p>
        </div>
      </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

//get country from Api
const getCountryJson = function (country) {
  //Rest country response by Name
  const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((res) => res.json())
    .then((data) => {
      renderCountry(data[0]);
    });
};

//cm:API: (https://locationiq.com)
//cm:Api key :( pk.d91f88ff4d19bf8dada031715a6889ab)
//1.whereAmI function: (taking lat and lng)
const whereAmI = function (lat, lng) {
  //Response by lat & lng
  const request = fetch(
    `https://us1.locationiq.com/v1/reverse?key=pk.d91f88ff4d19bf8dada031715a6889ab&lat=${lat}&lon=${lng}&format=json&`
  )
    .then((res) => {
      //Error handling
      if (!res.ok) {
        countriesContainer.insertAdjacentHTML(
          "beforeend",
          `Problem with geocoding : error ${res.status}`
        );
        throw new Error(`Problem with geocoding : error ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.dir(data);

      //Getting country name
      getCountryJson(data.address.country);
      console.log(`You are in ${data.address.city} , ${data.address.country}`);
    })
    .catch((error) => console.error(`Something went wrong: ${error.message}`))
    .finally(() => (countriesContainer.style.opacity = 1));
};
// whereAmI(10.08, 1253.381);
whereAmI(52.508, 13.381);
whereAmI(190.037, 70.873);
whereAmI(15.933, 18.474);
