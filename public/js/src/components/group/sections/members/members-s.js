import React from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Title from '../../../others/title'
import Nothing from '../../../others/nothing'
import End from '../../../others/end'
import { humanReadable } from '../../../../utils/utils'
import { getGroupMembers } from '../../../../store/actions/group-a'
import Spinner from '../../../others/spinner'
import MembersList from './members-list'

@connect(store => (
  {
    members: store.Group.members,
    gd: store.Group.group_details
  }
))

export default class GroupMembers extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { gd: { group_id }, dispatch } = this.props
    dispatch(getGroupMembers(group_id))
  }

  componentWillReceiveProps = ({ dispatch, gd }) => {
    this.props.gd != gd ? dispatch(getGroupMembers(gd.group_id)) : null
    this.setState({ loading : false })
  }

  render() {
    let
      { loading } = this.state,
      { gd: { name }, members } = this.props,
      len = members.length,
      map_members = members.map(m =>
        <MembersList key={m.grp_member_id} {...m} />
      )

    return (
      <div>

        <Title value={`${name}'s members`} />

        <FadeIn duration='300ms'>

          { loading ? <Spinner/> : null }

          <div className={`senapati pro_senapati ${loading ? 'cLoading' : ''}`} >
            <div className={ len != 0 ? 'm_div' : 'm_no_div' } >

              {
                len != 0
                  ? <div className='m_header'><span>{ humanReadable(len, 'member') }</span></div>
                  : null
              }

              <div className='m_wrapper'>
                { len != 0 ? map_members : null }
              </div>

            </div>
          </div>

          {
            !loading && len == 0
              ? <div><Nothing mssg={`${name} group has no members!!` } /></div>
              : !loading && len != 0 ? <End/>
                : null
          }

        </FadeIn>

      </div>
    )
  }
}
