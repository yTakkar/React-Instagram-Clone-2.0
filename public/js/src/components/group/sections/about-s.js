import React from 'react'
import Title from '../../others/title'
import { FadeIn } from 'animate-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { profile_scroll, toggle } from '../../../utils/utils'
import ToolTip from 'react-tooltip'
import TimeAgo from 'handy-timeago'

@connect(store => (
  { gd: store.Group.group_details }
))

export default class AboutGroup extends React.Component {

  toggleEdit = () => {
    let element = document.querySelector('.a_edit')
    toggle(element)
  }

  componentDidMount = () => profile_scroll()

  render() {
    let { gd } = this.props

    return (
      <div>

        <Title value='About' />

        <FadeIn duration='300ms' >
          <div className='senapati pro_senapati'>
            <div className='about'>

              <div className='sabout'>

                <div className='sabout_one'>
                  <img src='/images/tree.png' alt='' />
                  <div className='sabout_one_info'>
                    <span>Update or edit group to make it look more attractive</span>
                    <Link to='/' className='sec_btn'>Update group</Link>
                    <Link to='/edit-profile' className='pri_btn'>Edit group</Link>
                  </div>
                </div>

              </div>

              <div
                className='fabout'
                onMouseOver={this.toggleEdit}
                onMouseOut={this.toggleEdit}
              >
                <div className='a_edit' style={{ display: 'none' }} data-tip='Edit profile' >
                  <Link to='/edit'><i className='material-icons'>mode_edit</i></Link>
                </div>

                <div className='a_username'>
                  <span className='a_label'>Group name</span>
                  <span className='a_info'>{ gd.name }</span>
                </div>

                <div className='a_bio'>
                  <span className='a_label'>Bio</span>
                  <span className='a_info'>{ gd.bio }</span>
                </div>

                <div className='a_email'>
                  <span className='a_label'>No of posts</span>
                  <span className='a_info'>{ gd.postsCount }</span>
                </div>

                <div className='a_grp_type'>
                  <span className='a_label'>Group type</span>
                  <span className='a_info'>{ gd.account_type }</span>
                </div>

                <div className='a_created_by'>
                  <span className='a_label'>Group created by</span>
                  <Link to={`/profile/${gd.admin_username}`} className='a_info' >{ gd.admin_username }</Link>
                </div>

                <div className='a_joined'>
                  <span className='a_label'>Group created</span>
                  <span className='a_info'>{`${TimeAgo(gd.created)}`}</span>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>

        <ToolTip/>

      </div>
    )
  }
}
