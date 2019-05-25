import axios from "axios";
import { stringify } from "querystring";
import { THEMOVIEDB_API_BASE_URL, THEMOVIEDB_API_KEY } from "../config";

function getQuerySring(values) {
  return (
    "?" + stringify(Object.assign({ api_key: THEMOVIEDB_API_KEY }, values))
  );
}

const ApiService = {
  async getPersonPopular() {
    return await axios.get(
      `${THEMOVIEDB_API_BASE_URL}/person/popular${getQuerySring()}`
    );
  },

  async getMoviesFromPeople(people) {
    let params = { with_people: people.join(",") };
    console.log(params);
    return await axios.get(
      `${THEMOVIEDB_API_BASE_URL}/discover/movie${getQuerySring(params)}`
    );
  }
};

export default ApiService;
