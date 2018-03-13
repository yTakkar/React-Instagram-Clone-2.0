import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { Link } from 'react-router-dom'
import SearchFollowings from '../../others/search-followings'
import { connect } from 'react-redux'
import { Me } from '../../../utils/utils'
import { joinGroup } from '../../../utils/user-interact-utils'
import $ from 'jquery'

@connect(store => (
  { gd: store.Group.group_details }
))

export default class AddGroupMembers extends React.Component {

  addMember = user => {
    let
      session = $('.data').data('session'),
      { gd } = this.props
    joinGroup({
      user,
      added_by: session,
      group: gd.group_id,
      when: 'add_grp_member'
    })
  }

  render() {
    let { gd } = this.props

    return (
      <div>

        <Title value='Add members' />

        <FadeIn duration='300ms'>
          <div className='senapati pro_senapati'>

            <div className='srajkumar'>

              <div className='sabout_one'>
                <img src='/images/tree.png' alt='' />
                <div className='sabout_one_info'>
                  <span>Update or edit group to make it look more attractive</span>
                  <Link to='/' className='sec_btn'>Update group</Link>
                  <Link to='/edit-profile' className='pri_btn'>Edit group</Link>
                </div>
              </div>

            </div>

            <div className='prajkumar'>

              <div className='a_m'>
                <div className='a_m_header'>
                  <span>Add members</span>
                </div>

                <div className='a_m_main'>
                  <SearchFollowings
                    placeholder='Seach to add'
                    when='add_grp_members'
                    disabled={!Me(gd.admin)}
                    done={user =>
                      this.addMember(user)
                    }
                  />
                </div>
              </div>

            </div>

          </div>
        </FadeIn>

      </div>
    )
  }
}
