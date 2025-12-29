class DropdownDailyView {
  #parent = document.querySelector(".display-weather-container");

  updateDropdown(data, handler) {
    const container = this.#parent.querySelector(".weekdays-container");
    const markup = data
      .map(
        (obj) => `
        <li><a data-date = ${obj.date} data-day=${obj.weekday}>${obj.weekday}</a></li>
        `
      )
      .join("");

    container.innerHTML = "";
    container.insertAdjacentHTML("beforeend", markup);
    container.querySelector("a").classList.add("bg-bluish-gray");

    this.updateDropdownBtn(data[0].weekday);
    this.getSelectedDay(handler);
  }

  getSelectedDay(handler) {
    const container = this.#parent.querySelector(".weekdays-container");

    container.addEventListener("click", (e) => {
      const dayEl = e.target;
      handler(dayEl.dataset.date);
      this.updateDropdownBtn(dayEl.dataset.day);

      container.querySelectorAll("a").forEach((el) => {
        el.classList.remove("bg-bluish-gray");
      });

      dayEl.classList.add("bg-bluish-gray");
    });
  }

  updateDropdownBtn(weekday) {
    const p = document.querySelector(".selected-day");
    p.textContent = weekday;
  }
}

export default new DropdownDailyView();
