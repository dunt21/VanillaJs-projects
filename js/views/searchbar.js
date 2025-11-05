class SearchBar {
  #parent = document.querySelector(".search-container");
  #form = this.#parent.closest("form");
  #query;

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
                <p class="text-dark-gray">${obj.city}</p>
                `
                )
                .join(" ")}
            </ul>`;

    this.#parent.insertAdjacentHTML("beforeend", markup);
  }
}

export default new SearchBar();
