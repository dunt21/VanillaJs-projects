import * as icons from "../icons.js";

class MainWeatherCard {
  #parent = document.querySelector(".display-weather-container");

  updateCard(data) {
    const card = this.#parent.querySelector(".main-weather-card");

    const markup = `
    <div
                  class="bg-[url(../assets/images/bg-today-large.svg)] flex flex-col justify-center gap-7 md:gap-0 md:flex-row md:justify-between items-center md:py-20 px-5 border-0 rounded-3xl"
              >
    <div class="space-y-2">
                  <p class="font-bold text-2xl">${data.city}</p>
                  <p class="text-light-gray">${data.date}</p>
                </div>
                <div class="flex items-center gap-4">
                  <img
                    src=${icons.data.weatherType}
                    alt="sun"
                    class="w-24"
                  />
                  <p class="italic font-bold text-8xl">${data.temp}</p>
                </div>
                </div>
                `;

    card.outerHTML = markup;
  }
}

export default new MainWeatherCard();
