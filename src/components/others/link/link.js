import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { string, oneOfType, func } from 'prop-types'

class AppLink extends Component {
  render() {
    let { label, url, children, ...props } = this.props

    return (
      <Fragment>
        <Link
          to={url}
          {...props}
        >
          { children ? children : label }
        </Link>
      </Fragment>
    )
  }
}

AppLink.defaultProps = {
  label: '',
  url: ''
}

AppLink.propTypes = {
  label: oneOfType([
    string,
    func
  ]).isRequired,
  url: string.isRequired,
}

export default AppLink
