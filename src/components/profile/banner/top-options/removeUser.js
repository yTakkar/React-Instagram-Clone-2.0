import React, { Fragment } from 'react'
import Notify from 'handy-notification'
import { post } from 'axios'
import { connect } from 'react-redux'
import { isAdmin } from '../../../../utils/admin-utils'
import d from '../../../../utils/API/DOM'

const BannerRemoveUser = ({ id }) => {
  let removeUser = async e => {
    e.preventDefault()
    let o = new d('.overlay-2')
    o.show()

    let {
      data: { mssg, success },
    } = await post('/user/remove-user', { user: id })

    o.hide()
    Notify({
      value: mssg,
      done: () => (success ? (location.href = '/login') : null),
    })
  }

  return (
    <Fragment>
      {isAdmin() && (
        <li>
          <a href="#" className="rem_user" onClick={removeUser}>
            Remove as admin
          </a>
        </li>
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  id: state.User.user_details.id,
})

export default connect(mapStateToProps)(BannerRemoveUser)
export { BannerRemoveUser as PureBannerRemoveUser }
