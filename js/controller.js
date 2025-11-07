import SearchBar from "./views/searchbar";
import * as Models from "./models";

//func to get the geo units of user's city
async function controlGeoCode(query) {
  try {
    if (!query) return;

    //display ui for ongoing search
    SearchBar.displaySearchOngoing();

    //passing query to model for api usage
    await Models.getGeoResults(query);

    //display cities gotten after successful search
    SearchBar.displayCityNames(Models.state.query.geoCodeRes);

    //get the id of user's selected city
    SearchBar.getSelectedCityId(handleSelectedCityId);
  } catch (err) {
    console.error(err);

    //show error in the ui
    SearchBar.searchError();
  }
}

//passing city's id into the model
function handleSelectedCityId(id) {
  Models.getSelectedCityObj(id);
}

function init() {
  SearchBar.retrieveQuery(controlGeoCode);
}

init();
