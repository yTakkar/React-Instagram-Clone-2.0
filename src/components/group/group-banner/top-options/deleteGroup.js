import React, { Component, Fragment } from 'react'
import { Me } from '../../../../utils/utils'
import { isAdmin } from '../../../../utils/admin-utils'
import Notify from 'handy-notification'
import { post } from 'axios'
import { connect } from 'react-redux'
import Prompt from '../../../others/prompt'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

class DeleteGroup extends Component {
  state = {
    deleteGrp: false,
    deleted: false,
  }

  showDeleteGroup = e => {
    e.preventDefault()
    this.setState({ deleteGrp: !this.state.deleteGrp })
  }

  delete = async e => {
    e.preventDefault()
    let { group_id } = this.props.gd
    await post('/api/delete-group', { group: group_id })
    Notify({
      value: 'Group deleted!!',
      done: () => this.setState({ deleted: true }),
    })
  }

  modalBack = () => {
    this.setState({ deleteGrp: false })
    this.props.toggleOptions()
  }

  render() {
    let {
      gd: { admin },
    } = this.props
    let { deleteGrp, deleted } = this.state

    return (
      <Fragment>
        {deleted && <Redirect to="/" />}

        {(Me(admin) || isAdmin()) && (
          <li>
            <a href="#" className="p_copy_link" onClick={this.showDeleteGroup}>
              Delete group {isAdmin() && 'as admin'}
            </a>
          </li>
        )}

        {deleteGrp && (
          <Prompt
            title="Delete group"
            content="This group will be deleted. There's no undo so you won't be able to find it."
            actionText="Delete"
            action={this.delete}
            back={this.modalBack}
          />
        )}
      </Fragment>
    )
  }
}

DeleteGroup.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
  gd: store.Group.group_details,
})

export default connect(mapStateToProps)(DeleteGroup)
export { DeleteGroup as PureDeleteGroup }
