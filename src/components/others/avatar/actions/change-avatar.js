import React, { Fragment } from 'react'
import Avatars from '../avatars'
import { bool, func, oneOf } from 'prop-types'
import { connect } from 'react-redux'

const ChangeAvatarAction = ({ change, back, when, group_id }) => (
  <Fragment>
    {change ? <Avatars back={back} of={when} group={group_id} /> : null}
  </Fragment>
)

ChangeAvatarAction.propTypes = {
  change: bool.isRequired,
  back: func.isRequired,
  when: oneOf(['user', 'group']).isRequired,
}

const mapStateToProps = state => ({
  group_id: state.Group.group_details.group_id,
})

export default connect(mapStateToProps)(ChangeAvatarAction)
