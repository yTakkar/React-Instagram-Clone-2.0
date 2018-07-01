import React, { Component, Fragment } from 'react'
import { Me } from '../../../../utils/utils'
import { connect } from 'react-redux'
import RecommendUsers from '../../../others/recommend/recommend-users'
import PropTypes from 'prop-types'

class BannerRecommendUser extends Component {
  state = {
    recommendUser: false,
  }

  toggleRecommendUser = e => {
    e ? e.preventDefault() : null
    this.setState({ recommendUser: !this.state.recommendUser })
  }

  modalBack = () => {
    this.toggleRecommendUser()
    this.props.toggleOptions()
  }

  render() {
    let { id } = this.props
    let { recommendUser } = this.state

    return (
      <Fragment>
        {!Me(id) && (
          <li>
            <a
              href="#"
              className="pro_recommend"
              onClick={this.toggleRecommendUser}
            >
              Recommend
            </a>
          </li>
        )}

        {recommendUser && <RecommendUsers back={this.modalBack} />}
      </Fragment>
    )
  }
}

BannerRecommendUser.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  id: store.User.user_details.id,
})

export default connect(mapStateToProps)(BannerRecommendUser)
export { BannerRecommendUser as PureBannerRecommendUser }
