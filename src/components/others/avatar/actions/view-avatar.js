import React, { Fragment } from 'react'
import ViewAvatar from '../viewAvatar'
import { bool, func, oneOf } from 'prop-types'
import { connect } from 'react-redux'

const ViewAvatarAction = ({ view, back, when, id, group_id }) => {
  let src =
    when == 'user'
      ? `/users/${id}/avatar.jpg`
      : `/groups/${group_id}/avatar.jpg`

  return (
    <Fragment>{view ? <ViewAvatar imgSrc={src} back={back} /> : null}</Fragment>
  )
}

ViewAvatarAction.propTypes = {
  view: bool.isRequired,
  back: func.isRequired,
  when: oneOf(['user', 'group']).isRequired,
}

const mapStateToProps = state => ({
  id: state.User.user_details.id,
  group_id: state.Group.group_details.group_id,
})

export default connect(mapStateToProps)(ViewAvatarAction)
