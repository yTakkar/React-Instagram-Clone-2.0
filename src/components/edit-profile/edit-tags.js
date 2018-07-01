import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { deleteTag } from '../../actions/user'
import * as Edit from '../../utils/edit-profile-utils'
import PropTypes from 'prop-types'
import d from '../../utils/API/DOM'
import SecondaryButton from '../others/button/secondary-btn'
import TextInput from '../others/input/text'

@connect(store => ({
  ud: store.User.user_details,
}))
export default class EditTags extends Component {
  addTag = e => {
    e.preventDefault()
    new d('.add_tag_text').focus()
    let {
      newTag: value,
      ud: { id: user },
      dispatch,
      emptyTagsInput,
    } = this.props
    Edit.addUserTags({ value, user, dispatch })
    emptyTagsInput()
  }

  deleteTag = tag => this.props.dispatch(deleteTag(tag))

  mapTags = t => (
    <span
      key={t.tag}
      onClick={() => this.deleteTag(t.tag)}
      className="tir_btn t_a_tag"
    >
      {t.tag}
    </span>
  )

  render() {
    let { newTag, change, tags } = this.props
    let map_tags = tags.map(this.mapTags)

    return (
      <Fragment>
        <div className="edit_tags_info">
          <span>Edit tags (click tags to remove)</span>
        </div>
        <div className="add_tag">
          <TextInput
            placeholder="Add a tag"
            value={newTag}
            valueChange={e => change('addTag', e)}
            className="add_tag_text"
          />
          <SecondaryButton label="Add" onClick={this.addTag} />
        </div>
        <div className="tags_all">{map_tags}</div>
      </Fragment>
    )
  }
}

EditTags.propTypes = {
  newTag: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string.isRequired,
      user: PropTypes.number.isRequired,
    })
  ),
  emptyTagsInput: PropTypes.func.isRequired,
}
