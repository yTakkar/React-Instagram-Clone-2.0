import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MutualMembersDiv from './mutualsDiv'

const MutualMembers = ({ group, len }) => (
  <Fragment>{len != 0 && <MutualMembersDiv group={group} />}</Fragment>
)

MutualMembers.propTypes = {
  group: PropTypes.number,
}

const mapStateToProps = state => ({
  len: state.Group.mutualMembers.length,
})

export default connect(mapStateToProps)(MutualMembers)
