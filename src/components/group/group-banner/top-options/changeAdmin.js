import React, { Component, Fragment } from 'react'
import { Me } from '../../../../utils/utils'
import { connect } from 'react-redux'
import Overlay from '../../../others/overlay'
import ChangeAdmin from '../../change-admin/change-admin'

@connect(store => (
  { gd: store.Group.group_details }
))

export default class ChangeGroupAdmin extends Component {

  state = {
    change: false,
  }

  showChangeAdmin = e => {
    e.preventDefault()
    this.setState({ change: !this.state.change })
  }

  render() {
    let {
      gd: {admin, group_id },
      toggleOptions
    } = this.props
    let { change } = this.state

    return (
      <Fragment>
        {
          Me(admin) ?
            <li><a
              href='#'
              className='p_copy_link'
              onClick={this.showChangeAdmin}
            >Transfer admin position</a></li>
            : null
        }

        {
          change ?
            <Fragment>
              <Overlay/>
              <ChangeAdmin
                back={() => {
                  this.setState({ change: false })
                  toggleOptions()
                }}
                group={group_id}
              />
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
}
