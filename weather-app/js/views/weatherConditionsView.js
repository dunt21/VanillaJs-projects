class WeatherConditionsView {
  #parent = document.querySelector(".display-weather-container");

  updateCards(data) {
    const container = this.#parent.querySelector(".weather-conditions");

    const markup = `
<div
                  class="bg-neutral800 p-5 border border-bluish-gray rounded-xl space-y-3"
                >

                  <p class="text-light-gray">Feels Like</p>
                  <p class="text-3xl">${data.feelsLike}${data.units.feelsLike}</p>
                </div>
                <div
                  class="bg-neutral800 p-5 border border-bluish-gray rounded-xl space-y-3"
                >
                  <p class="text-light-gray">Humidity</p>
                  <p class="text-3xl">${data.humidity}${data.units.humidity}</p>
                </div>
                <div
                  class="bg-neutral800 p-5 border border-bluish-gray rounded-xl space-y-3"
                >
                  <p class="text-light-gray">Wind</p>
                  <p class="text-3xl">${data.wind} ${data.units.wind}</p>
                </div>
                <div
                  class="bg-neutral800 p-5 border border-bluish-gray rounded-xl space-y-3"
                >
                  <p class="text-light-gray">Precipitation</p>
                  <p class="text-3xl">${data.precipitation} ${data.units.precipitation}</p>
                </div>

`;

    container.innerHTML = "";
    container.insertAdjacentHTML("beforeend", markup);
  }
}

export default new WeatherConditionsView();
