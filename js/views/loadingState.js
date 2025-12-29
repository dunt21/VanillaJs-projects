import { displayWeatherContainer } from "../htmlReturns";

class LoadingState {
  #parent = document.querySelector(".display-weather-container");

  // to display a loading ui when the data is getting retrieved
  displayLoadingState() {
    const html = ` <div
                class="bg-neutral800 py-20 px-5 border-0 rounded-3xl flex flex-col items-center main-weather-card"
              >
                <span
                  class="loading loading-dots loading-xl [--gap:10px]"
                ></span>
                <p class="text-center text-lg text-light-gray">Loading...</p>
              </div>
`;

    const markup = displayWeatherContainer(html);

    this.#parent.innerHTML = "";

    this.#parent.insertAdjacentHTML("beforeend", markup);
  }
}

export default new LoadingState();
