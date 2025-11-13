import SearchBar from "./views/searchbar";
import * as Models from "./models";
import mainWeatherCard from "./views/mainWeatherCard";
import loadingState from "./loadingState";
import weatherConditionsView from "./views/weatherConditionsView";

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
  //displaying a loading state
  loadingState.displayLoadingState();

  //getting the obj based on the unique id
  await Models.getSelectedCityObj(id);

  //when the data is ready display the card to the user's interface
  controlMainWeatherCard();

  controlWeatherConditions();
}

//to get the data for the mainWeatherCard and pass it into the view for display
export function controlMainWeatherCard() {
  try {
    const data = Models.getMainWeatherCardData();

    mainWeatherCard.updateCard(data);
  } catch (err) {
    console.error(err);
  }
}

export function controlWeatherConditions() {
  const data = Models.getWeatherConditions();

  weatherConditionsView.updateCards(data);
}

function init() {
  SearchBar.retrieveQuery(controlGeoCode);
}

init();
