import React from 'react'
import { geolocation, getAddress } from '../../../utils/location-utils'
import MaterialIcon from '../../others/icons/material-icon'
import { connect } from 'react-redux'
import { CPP } from '../../../actions/post'
import classNames from 'classnames'

const GetLocation = ({ postIt, dispatch }) => {
  let { location } = postIt

  let dp = (...args) => dispatch(CPP(...args))

  let getLocation = async () => {
    let geolocationSuccess = async pos => {
      dp('fetchingLocation', true)
      let address = await getAddress(pos)
      dp('location', address)
      dp('fetchingLocation', false)
    }
    geolocation(geolocationSuccess)
  }

  return (
    <span
      className={classNames('loc_add', { p_span_toggle: location })}
      data-tip="Add location"
      onClick={getLocation}
    >
      <MaterialIcon icon="location_on" />
    </span>
  )
}

const mapStateToProps = state => ({
  postIt: state.Post.postIt,
})

export default connect(mapStateToProps)(GetLocation)
export { GetLocation as PureGetLocation }
