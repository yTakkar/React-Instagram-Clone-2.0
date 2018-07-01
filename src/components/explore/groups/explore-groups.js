import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { connect } from 'react-redux'
import { getGroupsToExplore } from '../../../actions/explore'
import Nothing from '../../others/nothing'
import ExploreGroupsList from './explore-groups-list'
import IsLoading from '../../others/isLoading'
import { cLoading } from '../../../utils/utils'
import classNames from 'classnames'

class ExploreGroups extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => this.props.dispatch(getGroupsToExplore())

  componentWillReceiveProps = () => this.setState({ loading: false })

  render() {
    let { groups } = this.props,
      { loading } = this.state,
      len = groups.length,
      map_groups = groups.map(g => (
        <ExploreGroupsList key={g.group_id} {...g} />
      ))

    return (
      <div>
        <Title value="Explore groups" />

        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <div
            className={classNames('m_div', cLoading(loading))}
            style={{ marginTop: 0 }}
          >
            <div className="m_wrapper" style={{ width: len == 0 ? 500 : null }}>
              {len == 0 ? (
                <div style={{ width: '100%' }}>
                  <Nothing mssg="Sorry, no groups to explore!!" />
                </div>
              ) : (
                map_groups
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  groups: store.Explore.groups,
})

export default connect(mapStateToProps)(ExploreGroups)
export { ExploreGroups as PureExploreGroups }
