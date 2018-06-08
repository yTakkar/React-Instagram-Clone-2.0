import React from 'react'
import MaterialIcon from '../../others/icons/material-icon'
import { connect } from 'react-redux'
import { CPP } from '../../../actions/post'

const ToggleAddTags = ({ addTag, dispatch }) => {

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
  { postIt: state.Post.postIt.addTag }
)

export default connect(mapStateToProps)(ToggleAddTags)
export { ToggleAddTags as PureToggleAddTags }
