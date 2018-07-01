import React, { Component } from 'react'
import Title from '../../../others/title'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { Me, bottomScroll } from '../../../../utils/utils'
import { isAdmin } from '../../../../utils/admin-utils'
import EditGroupFields from './fields'
import { editGroup } from '../../../../utils/group-utils'
import AddEmojis from '../../../others/emojis/add-emojis'
import SecondaryButton from '../../../others/button/secondary-btn'
import GroupInstruction from '../../instruction'

class EditGroup extends Component {
  state = {
    name: '',
    bio: '',
    isPrivate: false,
  }

  setPropsToState = (name, bio, group_type) => {
    this.setState({
      name,
      bio,
      isPrivate: group_type == 'private' ? true : false,
    })
  }

  componentDidMount = async () => {
    let {
      gd: { name, bio, group_type },
    } = this.props
    await this.setPropsToState(name, bio, group_type)
  }

  componentWillReceiveProps = ({ gd }) => {
    let { name, bio, group_type } = gd
    this.setPropsToState(name, bio, group_type)
  }

  componentDidUpdate = () => bottomScroll()

  changeValue = (what, { target }) => {
    const value = target.type == 'checkbox' ? target.checked : target.value
    this.setState({ [what]: value })
  }

  update = e => {
    e.preventDefault()
    let {
      gd: { group_id },
      dispatch,
    } = this.props
    editGroup({
      ...this.state,
      group_id,
      dispatch,
    })
  }

  render() {
    let { name, bio, isPrivate } = this.state
    let {
      gd: { admin },
    } = this.props

    let disabled = !Me(admin) && !isAdmin()
    let btnDisabled = !name || !bio || disabled

    return (
      <div>
        <Title value="Edit group" />

        <FadeIn duration="300ms">
          <div className="senapati pro_senapati">
            <div className="srajkumar">
              <GroupInstruction showBtns={false} />
            </div>

            <div className="prajkumar">
              <div className="grp_edit">
                <EditGroupFields
                  fields={{ name, bio, isPrivate }}
                  changeValue={this.changeValue}
                />

                <div className="g_e_save">
                  <AddEmojis
                    position={{ top: 304, left: 368 }}
                    textArea=".gen_bio"
                    updateTextArea={value => this.setState({ bio: value })}
                    disabled={disabled}
                  />

                  <SecondaryButton
                    label="Update"
                    onClick={this.update}
                    extraClass="g_e_save_btn"
                    disabled={btnDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  gd: store.Group.group_details,
})

export default connect(mapStateToProps)(EditGroup)
export { EditGroup as PureEditGroup }
