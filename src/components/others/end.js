import React from 'react'
import PropTypes from 'prop-types'
import d from '../../utils/API/DOM'

const End = ({ mssg }) => {
  let toTop = () => {
    new d('.data').scrollTop()
  }

  return (
    <div className="page_end" onClick={toTop}>
      <span>{mssg}</span>
    </div>
  )
}

End.defaultProps = {
  mssg: "Looks like you've reached the end",
}

End.propTypes = {
  mssg: PropTypes.string,
}

export default End
