import React from 'react' // eslint-disable-line no-unused-vars
import { c_first } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const AboutSocial = ({ account, accountValue }) => {
  let
    cap = c_first(account),
    editLink = text => <Link to='/edit-profile' >{text}</Link>

  return (
    <div className={`a_${account}`}>
      <span className='a_label'>{cap}</span>
      {
        accountValue
          ? account == 'phone'
            ? <span className='a_info'>{accountValue}</span>
            : <a className='a_info' href={accountValue} target='_blank'>{accountValue}</a>
          : editLink(`Add ${cap} account`)
      }
    </div>
  )
}

AboutSocial.propTypes = {
  account: PropTypes.string.isRequired,
  accountValue: PropTypes.string
}

export default AboutSocial
