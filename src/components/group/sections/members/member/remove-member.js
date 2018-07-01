import React, { Component, Fragment } from 'react'
import { isAdmin } from '../../../../../utils/admin-utils'
import Prompt from '../../../../others/prompt'
import { post } from 'axios'
import Notify from 'handy-notification'
import { removeMember } from '../../../../../actions/group'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SecondaryButton from '../../../../others/button/secondary-btn'

class RemoveMember extends Component {
  state = {
    showPrompt: false,
  }

  showPrompt = e => {
    e.preventDefault()
    this.setState({ showPrompt: true })
  }

  hidePrompt = () => this.setState({ showPrompt: false })

  removeMember = async e => {
    e.preventDefault()
    let {
      memberDetails: { grp_member_id, member, username },
      gd: { group_id },
      dispatch,
    } = this.props
    await post('/api/remove-group-member', { member, group_id })
    dispatch(removeMember(grp_member_id))
    Notify({ value: `Removed ${username}!!` })
  }

  render() {
    let { showPrompt } = this.state
    let { username } = this.props.memberDetails
    let btnLabel = `Remove ${isAdmin() ? 'as admin' : ''}`

    return (
      <Fragment>
        <SecondaryButton label={btnLabel} onClick={this.showPrompt} />

        {showPrompt && (
          <Prompt
            title={`Remove ${username}`}
            content="This member will be premanently removed. Member would have to re-join the group."
            actionText="Delete"
            action={this.removeMember}
            back={this.hidePrompt}
          />
        )}
      </Fragment>
    )
  }
}

RemoveMember.propTypes = {
  memberDetails: PropTypes.shape({
    grp_member_id: PropTypes.number.isRequired,
    member: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = store => ({
  gd: store.Group.group_details,
})

export default connect(mapStateToProps)(RemoveMember)
export { RemoveMember as PureRemoveMember }
