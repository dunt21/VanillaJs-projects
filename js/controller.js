import SearchBar from "./views/searchbar";
import * as Models from "./models";

async function controlGeoCode(query) {
  try {
    if (!query) return;

    SearchBar.displaySearchOngoing();

    await Models.getGeoResults(query);

    SearchBar.displayCityNames(Models.state.query.geoCodeRes);
  } catch (err) {
    console.error(err);
  }
}

function init() {
  SearchBar.retrieveQuery(controlGeoCode);
}

init();
