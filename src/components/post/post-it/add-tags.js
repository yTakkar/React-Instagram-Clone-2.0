import React, { Component, Fragment } from 'react'
import SearchFollowings from '../../others/search-followings/search-followings'
import { connect } from 'react-redux'
import { CPP } from '../../../actions/post'

class AddTags extends Component {
  updateTags = tags => this.props.dispatch(CPP('tags', tags))

  deleteTag = tag => {
    let {
      postIt: { tags },
    } = this.props
    let remainder = tags.filter(t => t.username != tag)
    this.updateTags(remainder)
  }

  render() {
    let {
      postIt: { tags, addTag },
    } = this.props

    let map_tags = tags.map(t => (
      <span
        key={t.username}
        className="p_taggings"
        onClick={() => this.deleteTag(t.username)}
      >
        {t.username}
      </span>
    ))

    return (
      <Fragment>
        <div className="p_tagging">{map_tags}</div>

        {addTag && (
          <SearchFollowings
            when="tag"
            placeholder="Search to tag"
            done={data => this.updateTags(data)}
          />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = store => ({
  postIt: store.Post.postIt,
})

export default connect(mapStateToProps)(AddTags)
export { AddTags as PureAddTags }
