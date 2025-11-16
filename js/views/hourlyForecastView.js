import * as icons from "../icons.js";

class HourlyForecastView {
  #parent = document.querySelector(".display-weather-container");

  updateCards(data) {
    const container = this.#parent.querySelector(".hourly-forecast-container");

    const markup = data
      .map(
        (obj) => `
     <div
              class="bg-bluish-gray border border-bluish-gray rounded-lg flex justify-between items-center w-full py-2 px-3"
            >
              <div class="flex items-center gap-2">
                <img
                  src=${
                    obj.weatherType === "partly-cloudy"
                      ? icons.partlyCloudy
                      : icons[obj.weatherType]
                  }
                 alt = ${obj.weatherType}
                  class="w-10"
                />
                <p class="text-lg font-bold">${obj.time}</p>
              </div>
              <p>${obj.temp}${obj.unit}</p>
                </div>
    `
      )
      .join("");

    container.innerHTML = "";

    container.insertAdjacentHTML("beforeend", markup);
  }
}
export default new HourlyForecastView();
