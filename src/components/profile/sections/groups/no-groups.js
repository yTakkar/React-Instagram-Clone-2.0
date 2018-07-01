import React, { Fragment } from 'react'
import CreateGroup from '../../../group/create-group/create-group'
import { Me } from '../../../../utils/utils'
import Nothing from '../../../others/nothing'
import { connect } from 'react-redux'
import End from '../../../others/end'

const NoUserGroups = ({ len, ud }) => {
  let { id, username } = ud

  return (
    <Fragment>
      {len == 0 ? (
        <div className="senapati">
          <div className="srajkumar" style={{ marginTop: -8 }}>
            <CreateGroup />
          </div>
          <div className="prajkumar">
            <Nothing
              mssg={
                Me(id)
                  ? "You're not a member of any group!!"
                  : `${username} is not a member of any group!!`
              }
            />
          </div>
        </div>
      ) : (
        <End />
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  len: state.Group.userGroups.length,
  ud: state.User.user_details,
})

export default connect(mapStateToProps)(NoUserGroups)
