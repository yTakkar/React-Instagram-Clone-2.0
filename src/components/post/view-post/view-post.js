import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { connect } from 'react-redux'
import { getPost } from '../../../actions/post'
import { getUnreadNotifications } from '../../../actions/notification'
import { getUnreadMessages } from '../../../actions/message'
import Suggested from '../../others/suggested/suggested'
import CreateGroup from '../../group/create-group/create-group'
import IsLoading from '../../others/isLoading'
import ShowPost from './show-post'
import { cLoading } from '../../../utils/utils'

class ViewPost extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let {
      match: {
        params: { post_id },
      },
      dispatch,
    } = this.props
    post_id ? dispatch(getPost(post_id)) : null
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  render() {
    let { loading } = this.state

    return (
      <div>
        <Title value="View post" />

        <FadeIn duration="300ms">
          <div className="senapati view_senapati">
            <div className="prajkumar">
              <IsLoading loading={loading} />

              <div className={cLoading(loading)}>
                <ShowPost />
              </div>
            </div>

            <div className="srajkumar">
              <Suggested />
              <CreateGroup />
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  store,
})

export default connect(mapStateToProps)(ViewPost)
export { ViewPost as PureViewPost }
