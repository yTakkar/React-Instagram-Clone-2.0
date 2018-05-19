import React from 'react'
import MaterialIcon from '../../others/icons/material-icon'
import { connect } from 'react-redux'
import { CPP } from '../../../store/actions/post-a'

const ToggleAddTags = ({ postIt, dispatch }) => {
  let { addTag } = postIt

  let toggle = () =>
    dispatch(CPP('addTag', !addTag))

  return (
    <span
      className={`tag_add ${addTag ? 'p_span_toggle' : ''}`}
      data-tip='Tag people'
      onClick={toggle}
    ><MaterialIcon icon='loyalty' />
    </span>
  )
}

const mapStateToProps = state => (
  { postIt: state.Post.postIt }
)

export default connect(mapStateToProps)(ToggleAddTags)
