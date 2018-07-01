import AxiosAdaper from 'axios-mock-adapter'
import axios from 'axios'
const mockAxios = new AxiosAdaper(axios)

/**
 * Mocks Axios requests.
 *
 * @param {String} endpoint URL to request data from.
 * @param {any} data Fake data to return.
 */
export const mockAxiosRequest = (endpoint, data) =>
  mockAxios.onPost(`/api/${endpoint}`).reply(200, data)
