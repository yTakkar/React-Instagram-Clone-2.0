import React from 'react'
import MaterialIcon from '../../others/icons/material-icon'
import { connect } from 'react-redux'
import { CPP } from '../../../actions/post'
import classNames from 'classnames'

const ToggleAddTags = ({ addTag, dispatch }) => {
  let toggle = () => dispatch(CPP('addTag', !addTag))

  return (
    <span
      className={classNames('tag_add', { p_span_toggle: addTag })}
      data-tip="Tag people"
      onClick={toggle}
    >
      <MaterialIcon icon="loyalty" />
    </span>
  )
}

const mapStateToProps = state => ({
  addTag: state.Post.postIt.addTag,
})

export default connect(mapStateToProps)(ToggleAddTags)
export { ToggleAddTags as PureToggleAddTags }
