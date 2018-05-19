import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { connect } from 'react-redux'
import { getUsersToExplore } from '../../../store/actions/explore-a'
import ExploreUsersList from './exp-users-list'
import Nothing from '../../others/nothing'
import IsLoading from '../../others/isLoading'
import { cLoading } from '../../../utils/utils'

@connect(store => (
  { users: store.Explore.users }
))

export default class ExpUsers extends Component {

  state = {
    loading: true
  }

  componentDidMount = () =>
    this.props.dispatch(getUsersToExplore())

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  render() {
    let
      { users } = this.props,
      { loading } = this.state,
      len = users.length,
      map_users = users.map(u =>
        <ExploreUsersList key={u.id} {...u} />
      )

    return (
      <div>
        <Title value='Explore users' />

        <FadeIn duration='300ms'>

          <IsLoading loading={loading} />

          <div
            className={`m_div ${cLoading(loading)}`}
            style={{ marginTop: 0 }}
          >
            <div
              className='m_wrapper'
              style={{ width: len == 0 ? 500 : null }}
            >
              {
                len == 0 ?
                  <div style={{ width: '100%' }} >
                    <Nothing mssg='Sorry, no users to explore!!' />
                  </div>
                  : map_users
              }
            </div>
          </div>

        </FadeIn>

      </div>
    )
  }
}
