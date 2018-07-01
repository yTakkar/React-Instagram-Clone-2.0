import { post } from 'axios'
import Notify from 'handy-notification'
import { GOOGLE_GEOLOCATION_KEY } from '../../env'

/**
 * Geolocation setup
 * @param {Function} success Success function
 */
export const geolocation = success => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, geolocationError)
  } else {
    Notify({ value: 'Geolocation not supported' })
  }
}

/**
 * Geolocation error
 */
export const geolocationError = ({ code }) => {
  let mssg =
    /* eslint-disable */
    code == 1 ? 'Location permission denied!!'
    : code == 2 ? 'Location signal lost!!'
    : code == 3 ? 'Location request timed out!!'
    : code == 0 ? 'Unknown location error!!'
    : null
    /* eslint-enable */

  Notify({ value: mssg })
}

/**
 * Returns human readable address from the given the cordinates
 * @param {Object} pos
 */
export const getAddress = async pos => {
  let { latitude, longitude } = pos.coords,
    {
      data: { results },
    } = await post(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_GEOLOCATION_KEY}`
    ),
    loc = results[0].formatted_address
  return loc
}
