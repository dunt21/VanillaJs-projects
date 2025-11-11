import SearchBar from "./views/searchbar";
import * as Models from "./models";
import mainWeatherCard from "./views/mainWeatherCard";
import loadingState from "./loadingState";

//func to get the geo units of user's city
async function controlGeoCode(query) {
  try {
    if (!query) return;

    //display ui for ongoing search
    SearchBar.displaySearchOngoing();

    //passing query to model for api usage
    await Models.getGeoResults(query);

    //display cities gotten after successful search
    SearchBar.displayCityNames(Models.state.geoCodeRes);

    //get the id of user's selected city
    SearchBar.getSelectedCityId(handleSelectedCityId);
  } catch (err) {
    console.error(err);

    //show error in the ui
    SearchBar.searchError();
  }
}

//passing city's id into the model
async function handleSelectedCityId(id) {
  Models.getSelectedCityObj(id);

  loadingState.displayLoadingState();

  await controlMainWeatherCard();
}

export async function controlMainWeatherCard() {
  try {
    await Models.getWeatherResults();

    const data = Models.getMainWeatherCardData();

    mainWeatherCard.updateCard(data);
  } catch (err) {
    console.error(err);
  }
}

function init() {
  SearchBar.retrieveQuery(controlGeoCode);
}

init();
