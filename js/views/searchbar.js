import { displayWeatherContainer as displayWeathContHtml } from "../htmlReturns";

class SearchBar {
  #parent = document.querySelector(".search-container");
  #form = this.#parent.closest("form");
  #query;
  #cityId;

  // init() {
  //   const dispWeatherCont = document.querySelector(
  //     ".display-weather-container"
  //   );
  //   const ul = this.#parent.querySelector("ul");

  //   const markup = displayWeathContHtml();

  //   ul.classList.remove("hidden");
  //   dispWeatherCont.innerHTML = "";
  //   dispWeatherCont.insertAdjacentHTML("beforeend", markup);
  // }

  retrieveQuery(handler) {
    //prevent the input dropdown from hiding after focus is lost
    document
      .querySelector(".search-btn")
      .addEventListener("mousedown", (e) => e.preventDefault());

    this.#form.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputEl = this.#parent.querySelector("input");

      const query = inputEl.value;
      this.#query = query;

      handler(this.#query);
    });
  }

  displaySearchOngoing() {
    const ul = this.#parent.querySelector("ul");
    ul.remove();

    ul.classList.remove("hidden");

    const markup = `<ul
              tabindex="0"
              class="dropdown-content menu z-1 bg-neutral800 rounded-box w-full p-2 shadow-sm mt-5 h-10"
            >
              <p class="flex gap-3">
                <span class="ml-3 loading loading-spinner loading-xs w-4">
                </span
                >Search in progress
              </p>
              </ul>`;

    this.#parent.insertAdjacentHTML("beforeend", markup);
  }

  displayCityNames(arr) {
    const ul = this.#parent.querySelector("ul");
    ul.remove();

    const markup = `<ul
               tabindex="0"
    class="dropdown-content menu z-1 bg-neutral800 rounded-box w-full p-2 shadow-sm mt-5"
             >
              ${arr
                .map(
                  (obj) => `
                <li class="text-dark-gray">
                <a id= ${obj.id}>${obj.city}</a>
             </li>
                `
                )
                .join(" ")}
            </ul>`;

    this.#parent.insertAdjacentHTML("beforeend", markup);
  }

  searchError() {
    const dispWeatherCont = document.querySelector(
      ".display-weather-container"
    );
    const ul = this.#parent.querySelector("ul");

    const markup = `<p class="font-bold text-xl  text-center">No search result found!</p>
`;

    dispWeatherCont.innerHTML = "";
    ul.classList.add("hidden");
    dispWeatherCont.insertAdjacentHTML("beforeend", markup);
  }

  getSelectedCityId(handler) {
    const ul = this.#parent.querySelector("ul");

    ul.addEventListener("click", (e) => {
      const id = e.target.id;

      handler(id);
    });
  }
}

export default new SearchBar();
