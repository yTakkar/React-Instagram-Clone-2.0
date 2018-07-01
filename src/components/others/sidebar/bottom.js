import React, { Component, Fragment } from 'react'
import SidebarOptions from './options'
import MaterialIcon from '../icons/material-icon'

export default class SidebarBottom extends Component {
  state = {
    showOptions: false,
  }

  toggleOptions = () => this.setState({ showOptions: !this.state.showOptions })

  render() {
    let { showOptions } = this.state

    return (
      <Fragment>
        <div className="m_n_bottom">
          <ul>
            <li>
              <a href="/logout">Logout</a>
            </li>
            <li>
              <a href="/help">Help</a>
            </li>
            <li>
              <a
                href="#"
                className="toggle-sb-options"
                onClick={this.toggleOptions}
              >
                <MaterialIcon icon="more_horiz" />
              </a>
            </li>
          </ul>
        </div>

        {showOptions ? <SidebarOptions /> : null}
      </Fragment>
    )
  }
}
