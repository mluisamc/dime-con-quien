import axios from "axios";
import { stringify } from "querystring";
import { THEMOVIEDB_API_BASE_URL, THEMOVIEDB_API_KEY } from "../config";

/**
 * Qet the query string from a map of parameters and adds the API_KEY.
 *
 * Example of use: {with_people: [1, 2]} => ?api_key=...&with_people=1%2C2
 * 
 * @param {values} values Object with pairs of values.
 * @return {String} The query string.
 */
function getQuerySring(values) {
  return (
    "?" + stringify(Object.assign({ api_key: THEMOVIEDB_API_KEY }, values))
  );
}

const ApiService = {
  /**
   * Get a list with the 20 most popular actors and actresses.
   *
   * @return {Object} An object with the results in data.results[*]
   */
  async getPersonPopular() {
    return await axios.get(
      `${THEMOVIEDB_API_BASE_URL}/person/popular${getQuerySring()}`
    );
  },

  /**
   * Get a list with the movies in which the given people have participated.
   *
   * @param {Array} people Array with the ids of the people.
   * @return {Object} An object with the results in data.results[*]
   */
  async getMoviesFromPeople(people) {
    let params = { with_people: people.join(",") };
    console.log(params);
    return await axios.get(
      `${THEMOVIEDB_API_BASE_URL}/discover/movie${getQuerySring(params)}`
    );
  }
};

export default ApiService;
