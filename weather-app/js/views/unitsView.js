import checkmark from "url:../../assets/images/icon-checkmark.svg";

class UnitsView {
  #parent = document.querySelector(".display-weather-container");

  updateDropdown(handler) {
    const container = document.querySelector(".units-container");

    this.markup(container);

    handler();

    container.addEventListener("click", (e) => {
      const el = e.target;
      const data = el.dataset.unit;

      const unitsTxt = container.querySelector(".unit-txt");
      if (el.matches("ul")) return;

      this.markup(container, data);

      if (data === "imperial") {
        unitsTxt.dataset.unit = "metric";
        unitsTxt.textContent = "Switch to metric";
      }

      if (data === "metric") {
        unitsTxt.dataset.unit = "imperial";
        unitsTxt.textContent = "Switch to imperial";
      }

      handler(data);
    });
  }

  markup(parent, unit = "metric") {
    const unitType = unit === "metric" ? ".metric-units" : ".imperial-units";

    parent.querySelectorAll("a").forEach((el) => {
      el.classList.remove("bg-bluish-gray");
      const mark = el.querySelector(".mark");

      if (el.contains(mark)) mark.classList.add("hidden");
    });

    parent.querySelectorAll(unitType).forEach((el) => {
      el.classList.add("bg-bluish-gray");

      const mark = el.querySelector(".mark");

      mark?.classList.remove("hidden");

      if (el.contains(mark)) return;

      el.insertAdjacentHTML(
        "beforeend",
        ` <span class="ml-auto mark"
                    ><img src=${checkmark} alt="checkmark"
                  /></span>`
      );
    });
  }
}

export default new UnitsView();
