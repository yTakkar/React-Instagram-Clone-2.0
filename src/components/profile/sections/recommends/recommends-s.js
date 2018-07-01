import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Title from '../../../others/title'
import { Me, bottomScroll } from '../../../../utils/utils'
import Recommend from './recommend/recommend'
import PropTypes from 'prop-types'
import MonHeader from '../../../others/m-on/mon-header'
import MonEnd from '../../../others/m-on/mon-end'
import classNames from 'classnames'

class Recommendations extends Component {
  componentDidUpdate = () => bottomScroll()

  render() {
    let {
        recommends,
        param: username,
        ud: { id },
      } = this.props,
      len = recommends.length,
      map_recommends = recommends.map(r => (
        <Recommend key={r.recommend_id} {...r} />
      ))

    return (
      <div>
        <Title value={`@${username}'s recommendations`} />

        <FadeIn duration="300ms">
          <div className="senapati pro_senapati">
            <div
              className={classNames({
                m_div: len != 0,
                m_no_div: len == 0,
              })}
            >
              <MonHeader len={len} forWhat="recommendation" />

              <div className="m_wrapper">{len != 0 && map_recommends}</div>
            </div>
          </div>

          <MonEnd
            len={len}
            nothingMssg={
              Me(id)
                ? 'You have no recommendations!!'
                : `${username} have no recommendations!!`
            }
          />
        </FadeIn>
      </div>
    )
  }
}

Recommendations.propTypes = {
  param: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  recommends: store.Follow.recommendations,
})

export default connect(mapStateToProps)(Recommendations)
export { Recommendations as PureRecommendations }
