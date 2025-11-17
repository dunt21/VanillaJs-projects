class DropdownDailyView {
  #parent = document.querySelector(".display-weather-container");
  #container = this.#parent.querySelector(".weekdays-container");

  updateDropdown(data) {
    console.log(this.#container);

    const markup = data
      .map(
        (obj) => `
        <li><a>${obj.weekday}</a></li>
        `
      )
      .join("");

    this.#container.innerHTML = "";
    this.#container.insertAdjacentHTML("beforeend", markup);
  }

  getSelectedDay() {
    this.#container.addEventListener("click", (e) => {
      const el = e.target;
      console.log(el);
    });
  }
}

export default new DropdownDailyView();
