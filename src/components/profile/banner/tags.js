import React, { Component, Fragment } from 'react'
import { Me } from '../../../utils/utils'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FadeIn } from 'animate-components'
import MaterialIcon from '../../others/icons/material-icon'

class BannerTags extends Component {

  state = {
    showTags: false
  }

  toggleTags = () =>
    this.setState({ showTags: !this.state.showTags })

  render() {
    let { showTags } = this.state
    let {
      ud: { id, username },
      tags,
    } = this.props
    let tags_len = tags.length

    let map_tags = tags.map(t =>
      <NavLink to='/' key={t.tag} className='tags'>
        {t.tag}
      </NavLink>
    )

    return (
      <Fragment>
        <div className='pro_exp_more' onClick={this.toggleTags} >
          <span data-tip='Tags' >
            <MaterialIcon icon='expand_more' />
          </span>
        </div>

        {
          showTags ?
            <FadeIn duration='300ms'>
              <div className='pro_tags' >
                {
                  tags_len != 0
                    ? map_tags
                    : `${Me(id) ? 'You' : username} have no tags!!`
                }
                {
                  tags_len == 0 && Me(id)
                    ? <NavLink to='/edit-profile' className='add_tags'>add</NavLink>
                    : null
                }
              </div>
            </FadeIn>
            : null
        }
      </Fragment>
    )
  }
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  tags: store.User.tags
})

export default connect(mapStateToProps)(BannerTags)
export { BannerTags as PureBannerTags }
