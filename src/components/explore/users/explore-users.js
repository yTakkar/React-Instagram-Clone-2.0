import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { connect } from 'react-redux'
import { getUsersToExplore } from '../../../actions/explore'
import ExploreUsersList from './explore-users-list'
import Nothing from '../../others/nothing'
import IsLoading from '../../others/isLoading'
import { cLoading } from '../../../utils/utils'
import classNames from 'classnames'
import { t } from '../../../utils/translation'

class ExploreUsers extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => this.props.dispatch(getUsersToExplore())

  componentWillReceiveProps = () => this.setState({ loading: false })

  render() {
    let { users, lang } = this.props,
      { loading } = this.state,
      len = users.length,
      map_users = users.map(u => <ExploreUsersList key={u.id} {...u} />)

    return (
      <div>
        <Title value={t(lang, 'explore', 'exploreUsers')} />

        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <div
            className={classNames('m_div', cLoading(loading))}
            style={{ marginTop: 0 }}
          >
            <div className="m_wrapper" style={{ width: len == 0 ? 500 : null }}>
              {len == 0 ? (
                <div style={{ width: '100%' }}>
                  <Nothing mssg={t(lang, 'explore', 'noUsers')} />
                </div>
              ) : (
                map_users
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  users: store.Explore.users,
  lang: store.Language.language
})

export default connect(mapStateToProps)(ExploreUsers)
export { ExploreUsers as PureExploreUsers }
