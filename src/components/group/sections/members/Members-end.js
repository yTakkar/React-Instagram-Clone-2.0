import React, { Fragment } from 'react'
import Nothing from '../../../others/nothing'
import End from '../../../others/end'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const MembersEnd = ({ loading, len, name }) => (
  <Fragment>
    {!loading && len == 0 ? (
      <Nothing mssg={`${name} group has no members!!`} />
    ) : !loading && len != 0 ? (
      <End />
    ) : null}
  </Fragment>
)

MembersEnd.propTypes = {
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  len: state.Group.members,
  name: state.Group.group_details.name,
})

export default connect(mapStateToProps)(MembersEnd)
