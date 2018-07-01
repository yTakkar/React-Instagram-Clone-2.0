import React, { Component, Fragment } from 'react'
import Title from '../../others/title'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { getPostTags } from '../../../actions/post'
import { llr } from '../../../utils/utils'
import TagItems from './tag-list/tag-list'
import PropTypes from 'prop-types'
import ModalHeader from '../../others/modal/modal-header'
import ModalBack from '../../others/modal/modal-back'
import ModalMiddle from '../../others/modal/modal-middle'
import IsLoading from '../../others/isLoading'
import Overlay from '../../others/overlay'

class Tags extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { dispatch, post } = this.props
    dispatch(getPostTags(post))
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let { loading } = this.state
    let { tags, decrementTags, back } = this.props

    let map_tags = tags.map(t => (
      <TagItems key={t.post_tag_id} {...t} decrementTags={decrementTags} />
    ))

    return (
      <Fragment>
        <Overlay />

        <div className="tags_model modal modal_big">
          <Title value="Tags" />

          <FadeIn duration="300ms">
            <ModalHeader title="Tagged in this post" />

            <Scrollbars style={{ height: 450 }} className="modal_middle">
              <IsLoading loading={loading} />
              <ModalMiddle loading={loading} list={map_tags} />
            </Scrollbars>

            <div className="modal_bottom">
              <ModalBack back={back} />
            </div>
          </FadeIn>
        </div>
      </Fragment>
    )
  }
}

Tags.propTypes = {
  post: PropTypes.number.isRequired,
  back: PropTypes.func.isRequired,
  decrementTags: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  tags: store.Post.tags,
})

export default connect(mapStateToProps)(Tags)
export { Tags as PureTags }
