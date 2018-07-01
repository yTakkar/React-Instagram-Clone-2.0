import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../../others/title'
import { connect } from 'react-redux'
import { bottomScroll, cLoading } from '../../../../utils/utils'
import { getUserGroups } from '../../../../actions/group'
import UserGroup from './group/group'
import MonHeader from '../../../others/m-on/mon-header'
import PropTypes from 'prop-types'
import NoUserGroups from './no-groups'
import IsLoading from '../../../others/isLoading'
import classNames from 'classnames'

class UserGroups extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { ud, dispatch } = this.props
    dispatch(getUserGroups(ud.id))
  }

  componentWillReceiveProps = ({ dispatch, ud }) => {
    this.props.ud != ud ? dispatch(getUserGroups(ud.id)) : null
    this.setState({ loading: false })
  }

  componentDidUpdate = () => bottomScroll()

  render() {
    let { loading } = this.state,
      { param: username, groups } = this.props,
      len = groups.length,
      map_groups = groups.map(g => <UserGroup key={g.group_id} {...g} />)

    return (
      <div>
        <Title value={`@${username}'s groups`} />

        <IsLoading loading={loading} />

        <FadeIn duration="300ms" className={cLoading(loading)}>
          <div className="senapati pro_senapati">
            <div
              className={classNames({
                m_div: len != 0,
                m_no_div: len == 0,
              })}
            >
              <MonHeader len={len} forWhat="group" />

              <div className="m_wrapper">{len != 0 && map_groups}</div>
            </div>
          </div>

          <NoUserGroups />
        </FadeIn>
      </div>
    )
  }
}

UserGroups.propTypes = {
  param: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  groups: store.Group.userGroups,
  ud: store.User.user_details,
})

export default connect(mapStateToProps)(UserGroups)
export { UserGroups as PureUserGroups }
