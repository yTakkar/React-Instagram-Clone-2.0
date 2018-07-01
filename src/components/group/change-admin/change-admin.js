import React, { Component, Fragment } from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { llr } from '../../../utils/utils'
import InviteList from './ca-list'
import { getUsersToMakeAdmin } from '../../../actions/group'
import ModalHeader from '../../others/modal/modal-header'
import ModalBack from '../../others/modal/modal-back'
import ModalMiddle from '../../others/modal/modal-middle'
import IsLoading from '../../others/isLoading'
import Overlay from '../../others/overlay'
import { func, number } from 'prop-types'

class ChangeAdmin extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    let { dispatch, group } = this.props
    dispatch(getUsersToMakeAdmin(group))
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  componentDidUpdate = () => llr()

  render() {
    let { loading } = this.state,
      { members, group, back } = this.props,
      map_users = members.map(u => (
        <InviteList key={u.grp_member_id} {...u} group={group} />
      ))

    return (
      <Fragment>
        <Overlay />

        <div className="likes modal modal_big">
          <FadeIn duration="300ms">
            <ModalHeader title="Transfer admin position" />

            <Scrollbars style={{ height: 450 }} className="modal_middle">
              <IsLoading loading={loading} />
              <ModalMiddle loading={loading} list={map_users} />
            </Scrollbars>

            <div className="modal_bottom">
              <ModalBack back={back} />
            </div>
          </FadeIn>
        </div>
      </Fragment>
    )
  }
}

ChangeAdmin.propTypes = {
  group: number,
  back: func.isRequired,
}

const mapStateToProps = store => ({
  members: store.Group.usersToMakeAdmin,
})

export default connect(mapStateToProps)(ChangeAdmin)
export { ChangeAdmin as PureChangeAdmin }
