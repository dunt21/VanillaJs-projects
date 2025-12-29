import * as icons from "../icons.js";

class DailyForecastView {
  #parent = document.querySelector(".display-weather-container");

  updateCards(data) {
    const container = this.#parent.querySelector(".daily-forecast-container");

    const markup = data
      .map((obj) => {
        const html = `<div
                  class="bg-neutral800 border border-bluish-gray rounded-xl space-y-3 flex flex-col items-center py-3 px-3"
                >
                  <p>${obj.day}</p>
                  <img src=${
                    obj.weatherType === "partly-cloudy"
                      ? icons.partlyCloudy
                      : icons[obj.weatherType]
                  } class="w-14" />
                  <p class="flex justify-between w-full">
                    <span>${obj.tempMax}${obj.unit}</span> <span>${
          obj.tempMin
        }${obj.unit}</span>
                  </p>
                </div>`;

        return html;
      })
      .join("");

    container.innerHTML = "";

    container.insertAdjacentHTML("beforeend", markup);
  }
}

export default new DailyForecastView();
