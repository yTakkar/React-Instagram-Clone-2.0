import React, { Component, Fragment } from 'react'
import { Me } from '../../../../utils/utils'
import { connect } from 'react-redux'
import ChangeAdmin from '../../change-admin/change-admin'

class ChangeGroupAdmin extends Component {
  state = {
    change: false,
  }

  showChangeAdmin = e => {
    e.preventDefault()
    this.setState({ change: !this.state.change })
  }

  modalBack = () => {
    this.setState({ change: false })
    this.props.toggleOptions()
  }

  render() {
    let {
      gd: { admin, group_id },
    } = this.props
    let { change } = this.state

    return (
      <Fragment>
        {Me(admin) && (
          <li>
            <a href="#" className="p_copy_link" onClick={this.showChangeAdmin}>
              Transfer admin position
            </a>
          </li>
        )}

        {change && <ChangeAdmin back={this.modalBack} group={group_id} />}
      </Fragment>
    )
  }
}

const mapStateToProps = store => ({
  gd: store.Group.group_details,
})

export default connect(mapStateToProps)(ChangeGroupAdmin)
export { ChangeGroupAdmin as PureChangeGroupAdmin }
