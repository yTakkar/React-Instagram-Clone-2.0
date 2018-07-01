import React, { Component } from 'react'
import TimeAgo from 'handy-timeago'
import { Me } from '../../../../../utils/utils'
import { connect } from 'react-redux'
import { post } from 'axios'
import { removeRecommendation } from '../../../../../actions/follow'
import Notify from 'handy-notification'
import MonTopInfo from '../../../../others/m-on/mon-topinfo'
import PropTypes from 'prop-types'
import MonSticky from '../../../../others/m-on/mon-sticky'
import RecommendBy from './recommend-by'
import SecondaryButton from '../../../../others/button/secondary-btn'

class RecommendList extends Component {
  state = {
    showTime: false,
  }

  showTime = () => this.setState({ showTime: true })
  hideTime = () => this.setState({ showTime: false })

  remRecommendation = async e => {
    e.preventDefault()
    let { recommend_id, dispatch } = this.props
    await post('/api/remove-recommendation', { recommend_id })
    dispatch(removeRecommendation(recommend_id))
    Notify({ value: 'Removed recommendation!!' })
  }

  render() {
    let {
      recommend_of,
      recommend_of_username,
      recommend_of_firstname,
      recommend_of_surname,
      recommend_by_username,
      recommend_time,
      ud: { id },
    } = this.props
    let { showTime } = this.state

    return (
      <div
        className="m_on followers_m_on"
        onMouseOver={this.showTime}
        onMouseOut={this.hideTime}
      >
        <MonTopInfo
          info={{
            user: recommend_of,
            username: recommend_of_username,
            firstname: recommend_of_firstname,
            surname: recommend_of_surname,
          }}
        />

        <MonSticky show={showTime} text={TimeAgo(recommend_time)} />

        <div className="m_bottom">
          <RecommendBy username={recommend_by_username} />

          {Me(id) && (
            <SecondaryButton label="Remove" onClick={this.remRecommendation} />
          )}
        </div>
      </div>
    )
  }
}

RecommendList.propTypes = {
  recommend_id: PropTypes.number.isRequired,
  recommend_by: PropTypes.number.isRequired,
  recommend_by_username: PropTypes.string.isRequired,
  recommend_of: PropTypes.number.isRequired,
  recommend_of_username: PropTypes.string.isRequired,
  recommend_of_firstname: PropTypes.string.isRequired,
  recommend_of_surname: PropTypes.string.isRequired,
  recommend_to: PropTypes.number.isRequired,
  recommend_time: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
})

export default connect(mapStateToProps)(RecommendList)
export { RecommendList as PureRecommendList }
