import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { Redirect } from 'react-router-dom'
import { createGroup } from '../../../utils/group-utils'
import CreateGroupActions from './actions'
import ModalHeader from '../../others/modal/modal-header'
import AddEmojis from '../../others/emojis/add-emojis'
import TextArea from '../../others/input/textArea'
import { func } from 'prop-types'
import TextInput from '../../others/input/text'
import Overlay from '../../others/overlay'

export default class CreateGroupModal extends Component {
  state = {
    name: '',
    bio: '',
    created: false,
    groupId: null,
  }

  valueChange = (what, { target: { value } }) =>
    this.setState({ [what]: value })

  create = async e => {
    e.preventDefault()
    let { name, bio } = this.state
    let created = groupId => {
      this.setState({
        groupId,
        created: true,
      })
    }
    createGroup({ name, bio, created })
  }

  render() {
    let { bio, name, created, groupId } = this.state
    let { back } = this.props

    return (
      <div>
        <Overlay />

        <div className="create_group modal">
          <FadeIn duration="300ms">
            <ModalHeader title="Create group" />

            <div className="c_g_middle modal_middle">
              <div>
                <span>Name your group</span>
                <TextInput
                  placeholder="Name.."
                  autoFocus
                  value={name}
                  valueChange={e => this.valueChange('name', e)}
                />
              </div>

              <div>
                <span>Add bio to your group</span>
                <TextArea
                  placeholder="Bio.."
                  value={bio}
                  valueChange={e => this.valueChange('bio', e)}
                  className="c_g_textarea"
                />
              </div>
            </div>

            <div className="e_p_bottom modal_bottom">
              <AddEmojis
                position={{ top: 60, left: -217 }}
                textArea=".c_g_textarea"
                updateTextArea={value => this.setState({ bio: value })}
                recenterEmojis
              />

              <CreateGroupActions
                back={back}
                create={this.create}
                name={name}
              />
            </div>
          </FadeIn>
        </div>

        {created && <Redirect to={`/group/${groupId}`} />}
      </div>
    )
  }
}

CreateGroupModal.propTypes = {
  back: func.isRequired,
}
