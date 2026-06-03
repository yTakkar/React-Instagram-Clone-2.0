import React, { Component, Fragment } from 'react'
import SidebarOptions from './options'
import MaterialIcon from '../icons/material-icon'
import { connect } from 'react-redux'
import { setLanguage } from '../../../actions/language'

export class SidebarBottom extends Component {
  state = {
    showOptions: false,
  }

  toggleOptions = () => this.setState({ showOptions: !this.state.showOptions })

  render() {
    let { showOptions } = this.state
    let { lang, dispatch } = this.props

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
            <li style={{ paddingLeft: '10px', display: 'flex', gap: '5px', alignItems: 'center' }}>
              <span style={{ color: '#ccc' }}>|</span>
              <a href="#" style={{ fontWeight: lang === 'en' ? 'bold' : 'normal', margin: 0, padding: 0 }} onClick={e => { e.preventDefault(); dispatch(setLanguage('en')) }}>EN</a>
              <span style={{ color: '#ccc' }}>|</span>
              <a href="#" style={{ fontWeight: lang === 'vi' ? 'bold' : 'normal', margin: 0, padding: 0 }} onClick={e => { e.preventDefault(); dispatch(setLanguage('vi')) }}>VI</a>
            </li>
          </ul>
        </div>

        {showOptions ? <SidebarOptions /> : null}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  lang: state.Language.language
})

export default connect(mapStateToProps)(SidebarBottom)
