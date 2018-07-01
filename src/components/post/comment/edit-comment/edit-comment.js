import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { editComment } from '../../../../actions/post'
import { post } from 'axios'
import Notify from 'handy-notification'
import d from '../../../../utils/API/DOM'
import ModalHeader from '../../../others/modal/modal-header'
import ModalBack from '../../../others/modal/modal-back'
import AddEmojis from '../../../others/emojis/add-emojis'
import TextArea from '../../../others/input/textArea'
import PrimaryButton from '../../../others/button/primary-btn'
import Overlay from '../../../others/overlay'
import { string, func, number } from 'prop-types'

class EditComment extends Component {
  state = {
    comment: '',
    ogComment: '',
  }

  componentDidMount = () => {
    let { comment } = this.props
    this.setState({
      comment,
      ogComment: comment,
    })
  }

  descChange = ({ target: { value } }) => {
    this.setState({ comment: value })
    this.props.updateComment(value)
  }

  back = () => {
    let { back, updateComment } = this.props
    updateComment(this.state.ogComment)
    back()
  }

  updateComment = async e => {
    e.preventDefault()
    new d('.e_p_update').addClass('a_disabled')
    let { comment_id, dispatch, back } = this.props
    let { comment } = this.state
    await post('/api/edit-comment', { comment_id, comment })
    dispatch(editComment({ comment_id, comment }))
    Notify({ value: 'Comment updated!!' })
    back()
  }

  render() {
    let { comment } = this.state

    return (
      <div>
        <Overlay />

        <div className="edit_post modal">
          <FadeIn duration="300ms">
            <ModalHeader title="Edit comment" />

            <div className="e_p_middle modal_middle">
              <TextArea
                placeholder="Comment.."
                className="e_c_textarea"
                autoFocus
                value={comment}
                valueChange={this.descChange}
              />
            </div>

            <div className="e_p_bottom modal_bottom">
              <AddEmojis
                position={{
                  top: -30,
                  left: -217,
                }}
                textArea=".e_c_textarea"
                updateTextArea={value => this.setState({ comment: value })}
                recenterEmojis
              />

              <ModalBack
                back={this.back}
                btnType="secondary"
                disabled={!comment}
              />

              <PrimaryButton
                label="Update"
                onClick={this.updateComment}
                disabled={!comment}
                extraClass="e_p_update"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    )
  }
}

EditComment.propTypes = {
  comment: string.isRequired,
  comment_id: number.isRequired,
  back: func.isRequired,
  updateComment: func.isRequired,
}

export default connect()(EditComment)
export { EditComment as PureEditComment }
