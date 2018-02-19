import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../../others/title'
import { connect } from 'react-redux'
import { Me, humanReadable } from '../../../../utils/utils'
import Spinner from '../../../others/spinner'
import Nothing from '../../../others/nothing'
import { getUserGroups } from '../../../../store/actions/group-a'
import GroupList from './group-list'
import End from '../../../others/end'
import CreateGroup from '../../../group/create-group/create-group'

@connect(store => {
  return {
    groups: store.Group.userGroups,
    ud: store.User.user_details
  }
})

export default class UserGroups extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { ud: { id }, dispatch } = this.props
    dispatch(getUserGroups(id))
  }

  componentWillReceiveProps = ({ dispatch, ud, ud: { id } }) => {
    this.props.ud != ud ? dispatch(getUserGroups(id)) : null
    this.setState({ loading: false })
  }

  render() {
    let
      { loading } = this.state,
      { param: username, groups, ud: { id } } = this.props,
      len = groups.length,
      map_groups = groups.map(g =>
        <GroupList key={g.group_id} {...g} />
      )

    return (
      <div>

        <Title value={`@${username}'s groups`} />

        <FadeIn duration='300ms'>

          { loading ? <Spinner/> : null }

          <div className={`senapati pro_senapati ${loading ? 'cLoading' : ''}`} >
            <div className={ len != 0 ? 'm_div' : 'm_no_div' } >

              {
                len != 0
                  ? <div className='m_header'><span>{ humanReadable(len, 'group') }</span></div>
                  : null
              }

              <div className='m_wrapper'>
                { len != 0 ? map_groups : null }
              </div>

            </div>
          </div>

          {
            len == 0 ?
              <div className='senapati' >
                <div className='srajkumar' style={{ marginTop: -8 }} >
                  <CreateGroup/>
                </div>
                <div className='prajkumar' >
                  <Nothing mssg={Me(id) ? 'You\'re not a member of any group!!' : `${username} is not a member of any group!!`} />
                </div>
              </div>
              : <End/>
          }

        </FadeIn>

      </div>
    )
  }
}
