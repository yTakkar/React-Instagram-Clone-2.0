import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Title from '../../../others/title'
import { bottomScroll, cLoading } from '../../../../utils/utils'
import { getGroupMembers } from '../../../../actions/group'
import Member from './member/member'
import MonHeader from '../../../others/m-on/mon-header'
import MembersEnd from './Members-end'
import IsLoading from '../../../others/isLoading'
import classNames from 'classnames'

class GroupMembers extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { gd, dispatch } = this.props
    dispatch(getGroupMembers(gd.group_id))
  }

  componentWillReceiveProps = ({ dispatch, gd }) => {
    this.props.gd != gd ? dispatch(getGroupMembers(gd.group_id)) : null
    this.setState({ loading: false })
  }

  componentDidUpdate = () => bottomScroll()

  render() {
    let { loading } = this.state,
      {
        gd: { name },
        members,
      } = this.props,
      len = members.length,
      map_members = members.map(m => <Member key={m.grp_member_id} {...m} />)

    return (
      <div>
        <Title value={`${name}'s members`} />

        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <div
            className={classNames(
              'senapati',
              'pro_senapati',
              cLoading(loading)
            )}
          >
            <div
              className={classNames({
                m_div: len != 0,
                m_no_div: len == 0,
              })}
            >
              <MonHeader len={len} forWhat="member" />

              <div className="m_wrapper">{len != 0 ? map_members : null}</div>
            </div>
          </div>

          <MembersEnd loading={loading} />
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  members: store.Group.members,
  gd: store.Group.group_details,
})

export default connect(mapStateToProps)(GroupMembers)
export { GroupMembers as PureGroupMembers }
