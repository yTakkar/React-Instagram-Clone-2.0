import React, { Component, Fragment } from 'react'
import { Me } from '../../../../utils/utils'
import { isAdmin } from '../../../../utils/admin-utils'
import Notify from 'handy-notification'
import { post } from 'axios'
import { connect } from 'react-redux'
import Overlay from '../../../others/overlay'
import Prompt from '../../../others/prompt'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

@connect(store => (
  { gd: store.Group.group_details }
))

export default class DeleteGroup extends Component {

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
      done: () => this.setState({ deleted: true })
    })
  }

  render() {
    let { gd: { admin }, toggleOptions } = this.props
    let { deleteGrp, deleted } = this.state

    return (
      <Fragment>
        { deleted ? <Redirect to='/' /> : null }

        {
          Me(admin) || isAdmin() ?
            <li>
              <a
                href='#'
                className='p_copy_link'
                onClick={this.showDeleteGroup}
              >Delete group { isAdmin() ? 'as admin' : null }</a>
            </li>
            : null
        }

        {
          deleteGrp ?
            <Fragment>
              <Overlay/>
              <Prompt
                title='Delete group'
                content="This group will be deleted. There's no undo so you won't be able to find it."
                actionText= 'Delete'
                action={this.delete}
                back={() => {
                  this.setState({ deleteGrp: false })
                  toggleOptions()
                }}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}

DeleteGroup.propTypes = {
  toggleOptions: PropTypes.func.isRequired
}
