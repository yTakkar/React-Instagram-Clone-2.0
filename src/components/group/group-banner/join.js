import React, { Fragment } from 'react'
import { Me } from '../../../utils/utils'
import { connect } from 'react-redux'
import { toggleJoinGroup } from '../../../actions/group'
import Join from '../join-group/join'
import Leave from '../join-group/leave'
import AppLink from '../../others/link/link'

const notNull = id => (id ? id : 0)

const JoinGroup = ({ gd, joined, session, dispatch }) => {
  let { admin, group_id: grp } = gd
  let { id } = session

  let user = notNull(id)
  let group_id = notNull(grp)

  let toggle = what => dispatch(toggleJoinGroup(what))

  return (
    <Fragment>
      <div className="pro_ff">
        {Me(admin) ? (
          <AppLink
            url="/edit-group"
            label="Edit group"
            className="pri_btn ff"
          />
        ) : joined ? (
          <Leave
            leaveDetails={{ user, group_id }}
            leaved={() => toggle(false)}
          />
        ) : (
          <Join
            joinDetails={{
              user,
              addedBy: user,
              group_id,
            }}
            joined={() => toggle(true)}
          />
        )}
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  gd: state.Group.group_details,
  joined: state.Group.joined,
  session: state.User.session,
})

export default connect(mapStateToProps)(JoinGroup)
export { JoinGroup as PureJoinGroup }
