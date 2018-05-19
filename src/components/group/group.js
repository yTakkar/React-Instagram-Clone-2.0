import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../others/title'
import { connect } from 'react-redux'
import { getUnreadNotifications } from '../../store/actions/notification-a'
import { getUnreadMessages } from '../../store/actions/message-a'
import { forGroup, Me, cLoading } from '../../utils/utils'
import { isAdmin } from '../../utils/admin-utils'
import GroupBanner from './group-banner/banner'
import GroupNav from './group-nav'
import Nothing from '../others/nothing'
import GroupRoutes from './group-routes'
import IsLoading from '../others/isLoading'

@connect(store => (
  {
    gd: store.Group.group_details,
    joined: store.Group.joined
  }
))

export default class Group extends Component {

  state = {
    loading: true
  }

  inv_grp = () =>
    this.props.history.push('/error/group')

  componentDidMount = () => {
    let {
      dispatch,
      match: { params: { grp_id } }
    } = this.props
    forGroup({
      grp_id,
      dispatch,
      invalidGroup: this.inv_grp
    })
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  componentWillReceiveProps = ({ dispatch, match }) => {
    if (this.props.match.url != match.url) {
      forGroup({
        grp_id: match.params.grp_id,
        dispatch,
        invalidGroup: this.inv_grp
      })
    }
    this.setState({ loading: false })
  }

  render() {
    let { loading } = this.state
    let {
      gd: { name, admin, group_type },
      joined,
      match: { url, params: { grp_id } }
    } = this.props

    return (
      <div>

        <Title
          value={name}
          desc={`View ${name}'s posts, members and much more..`}
        />

        <div
          className='group_details'
          data-group-id={grp_id}
          data-group-name={name}
        ></div>

        <IsLoading loading={loading} when='page' />

        <FadeIn duration='300ms' className={cLoading(loading)} >
          <GroupBanner/>
          {
            Me(admin) || group_type == 'public' || joined || isAdmin() ?
              <div>
                <GroupNav url={url} admin={admin} />
                <GroupRoutes url={url} grp_id={grp_id} />
              </div>
              :
              <div style={{ marginTop: 85 }}>
                <Nothing mssg={`${name} group is private. Join to connect!!`} />
              </div>
          }
        </FadeIn>

      </div>
    )
  }
}
