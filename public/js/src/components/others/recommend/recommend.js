import React from 'react'
import RecommendUsers from './recommend-users'
import Overlay from '../overlay'

export default class Recommend extends React.Component {

  state = {
    recommend: false
  }

  toggleRecommend = () =>
    this.setState({ recommend: !this.state.recommend })

  recommend = e => {
    e.preventDefault()
    this.toggleRecommend()
  }

  render() {
    let
      { username } = this.props,
      { recommend } = this.state

    return (
      <div>

        <div className='recomm_teaser'>
          <span>Wanna recommend {username} to others or invite someone, so they can get to know about {username}.</span>
          <a href='#' className='sec_btn' onClick={this.recommend} >Recommend</a>
        </div>

        {
          recommend ?
            <div>
              <Overlay/>
              <RecommendUsers
                back={this.toggleRecommend}
              />
            </div>
            : null
        }

      </div>
    )
  }
}
