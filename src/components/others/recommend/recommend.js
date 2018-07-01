import React, { Component } from 'react'
import RecommendUsers from './recommend-users'
import PropTypes from 'prop-types'
import SecondaryButton from '../button/secondary-btn'

export default class Recommend extends Component {
  state = {
    recommend: false,
  }

  toggleRecommend = () => this.setState({ recommend: !this.state.recommend })

  recommend = e => {
    e.preventDefault()
    this.toggleRecommend()
  }

  render() {
    let { username } = this.props
    let { recommend } = this.state

    return (
      <div>
        <div className="recomm_teaser">
          <span>
            Wanna recommend {username} to others or invite someone, so they can
            get to know about {username}.
          </span>
          <SecondaryButton label="Recommend" onClick={this.recommend} />
        </div>

        {recommend ? <RecommendUsers back={this.toggleRecommend} /> : null}
      </div>
    )
  }
}

Recommend.propTypes = {
  username: PropTypes.string,
}
