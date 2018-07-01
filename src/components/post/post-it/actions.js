import React from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../../utils/post-utils'
import { CPP, resetPostIt } from '../../../actions/post'
import SecondaryButton from '../../others/button/secondary-btn'
import PrimaryButton from '../../others/button/primary-btn'

const PostItActions = props => {
  let {
    back,
    group_name,
    postIt: { fileChanged, showOverlay, ...rest },
    dispatch,
  } = props

  let toggleOverlay = () => dispatch(CPP('showOverlay', !showOverlay))

  let BackAndReset = async e => {
    e ? e.preventDefault() : null
    await dispatch(resetPostIt())
    back()
  }

  let postIt = async e => {
    e.preventDefault()
    toggleOverlay()

    await addPost({
      dispatch,
      ...rest,
      group_name,
    })

    toggleOverlay()
    BackAndReset()
  }

  return (
    <div className="t_p_act p_act">
      <SecondaryButton label="Cancel" onClick={BackAndReset} />

      <PrimaryButton
        label="Post"
        onClick={postIt}
        disabled={!fileChanged}
        extraClass="p_post"
      />
    </div>
  )
}

PostItActions.propTypes = {
  back: func.isRequired,
}

const mapStateToProps = state => ({
  group_name: state.Group.group_details.name,
  postIt: state.Post.postIt,
})

export default connect(mapStateToProps)(PostItActions)
export { PostItActions as PurePostItActions }
