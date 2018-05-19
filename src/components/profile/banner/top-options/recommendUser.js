import React, { Component, Fragment } from 'react'
import { Me } from '../../../../utils/utils'
import { connect } from 'react-redux'
import Overlay from '../../../others/overlay'
import RecommendUsers from '../../../others/recommend/recommend-users'
import PropTypes from 'prop-types'

@connect(store => (
  { id: store.User.user_details.id }
))

export default class BannerRecommendUser extends Component {

  state = {
    recommendUser: false
  }

  toggleRecommendUser = e => {
    e ? e.preventDefault() : null
    this.setState({ recommendUser: !this.state.recommendUser })
  }

  render() {
    let { id, toggleOptions } = this.props
    let { recommendUser } = this.state

    return (
      <Fragment>
        {
          !Me(id) ?
            <li><a
              href='#'
              className='pro_recommend'
              onClick={this.toggleRecommendUser}
            >Recommend</a></li>
            : null
        }

        {
          recommendUser ?
            <Fragment>
              <Overlay/>
              <RecommendUsers
                back={() => {
                  this.toggleRecommendUser()
                  toggleOptions()
                }}
              />
            </Fragment>
            : null
        }

      </Fragment>
    )
  }
}

BannerRecommendUser.propTypes = {
  toggleOptions: PropTypes.func.isRequired
}
