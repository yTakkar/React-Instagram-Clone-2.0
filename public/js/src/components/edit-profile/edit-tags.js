import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { deleteTag } from '../../store/actions/user-a'
import $ from 'jquery'
import * as Edit from '../../utils/edit-profile-utils'
import PropTypes from 'prop-types'

@connect(store => (
  { ud: store.User.user_details }
))

export default class EditTags extends React.Component {

  addTag = e => {
    e.preventDefault()
    $('.add_tag_text').focus()
    let {
      newTag: value,
      ud: { id: user },
      dispatch,
      updateState
    } = this.props
    Edit.addUserTags({ value, user, dispatch })
    updateState()
  }

  deleteTag = tag =>
    this.props.dispatch(deleteTag(tag))

  render() {
    let
      { newTag, change, tags } = this.props,
      map_tags = tags.map(t =>
        <span
          key={t.tag}
          onClick={() => this.deleteTag(t.tag)}
          className='tir_btn t_a_tag'
        >{t.tag}</span>
      )

    return (
      <Fragment>
        <div className='edit_tags_info'>
          <span>Edit tags (click tags to remove)</span>
        </div>
        <div className='add_tag'>
          <input
            type='text'
            name='add_tag_text'
            className='add_tag_text'
            placeholder='Add a tag'
            maxLength='250'
            spellCheck='false'
            value={newTag}
            onChange={e => change('addTag', e)}
          />
          <a href='#' className='sec_btn add_tag_add' onClick={this.addTag} >Add</a>
        </div>
        <div className='tags_all'>
          {map_tags}
        </div>
      </Fragment>
    )
  }
}

Edit.propTypes = {
  newTag: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string.isRequired,
      user: PropTypes.number.isRequired,
    })
  ),
  updateState: PropTypes.func.isRequired,
}
