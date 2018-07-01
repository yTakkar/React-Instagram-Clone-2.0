import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import d from '../../../utils/API/DOM'
import ModalHeader from '../../others/modal/modal-header'
import ModalBack from '../../others/modal/modal-back'
import { editPost } from '../../../utils/post-utils'
import AddEmojis from '../../others/emojis/add-emojis'
import PrimaryButton from '../../others/button/primary-btn'
import TextArea from '../../others/input/textArea'
import Overlay from '../../others/overlay'

class EditPost extends Component {
  state = {
    description: '',
    ogDescription: '',
  }

  componentDidMount = () => {
    let { description } = this.props
    this.setState({
      description,
      ogDescription: description,
    })
  }

  back = () => {
    let { back } = this.props
    this.returnOgDescription()
    back()
  }

  descChange = ({ target: { value } }) => {
    this.setState({ description: value })
    this.props.changeDesc(value)
  }

  returnOgDescription = () => {
    let { ogDescription } = this.state
    this.props.changeDesc(ogDescription)
  }

  updatePost = async e => {
    e.preventDefault()
    new d('.e_p_update').addClass('a_disabled')
    let { description } = this.state
    let { dispatch, post, back } = this.props
    editPost({
      post_id: post,
      description,
      dispatch,
      done: () => back(),
      failed: this.returnOgDescription(),
    })
  }

  render() {
    let { description } = this.state

    return (
      <div>
        <Overlay />

        <div className="edit_post modal">
          <FadeIn duration="300ms">
            <ModalHeader title="Edit post" />

            <div className="e_p_middle modal_middle">
              <TextArea
                placeholder="Description.."
                className="e_p_textarea"
                autoFocus
                value={description}
                valueChange={this.descChange}
              />
            </div>

            <div className="e_p_bottom modal_bottom" style={{ marginTop: 0 }}>
              <AddEmojis
                position={{ top: -32, left: -217 }}
                textArea=".e_p_textarea"
                updateTextArea={value => this.setState({ description: value })}
                recenterEmojis
              />

              <ModalBack back={this.back} btnType="secondary" />

              <PrimaryButton
                label="Update post"
                onClick={this.updatePost}
                extraClass="e_p_update"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    )
  }
}

EditPost.propTypes = {
  post: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  back: PropTypes.func.isRequired,
  changeDesc: PropTypes.func.isRequired,
}

export default connect()(EditPost)
export { EditPost as PureEditPost }
