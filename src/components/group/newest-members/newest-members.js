import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NewestDiv from './newestDiv'

const NewestMembers = ({ group, len }) => (
  <Fragment>
    {
      len != 0
        ? <NewestDiv group={group} />
        : null
    }
  </Fragment>
)

NewestMembers.propTypes = {
  group: PropTypes.number
}

const mapStateToProps = state => (
  { len: state.Group.newestMembers.length }
)

export default connect(mapStateToProps)(NewestMembers)
