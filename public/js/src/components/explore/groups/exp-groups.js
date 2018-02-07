import React from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import Spinner from '../../others/spinner'
import { connect } from 'react-redux'
import { getGroupsToExplore } from '../../../store/actions/explore-a'
import Nothing from '../../others/nothing'
import ExploreGroupsList from './exp-groups-list'

@connect(store => {
  return {
    groups: store.Explore.groups
  }
})

export default class ExpGroups extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () =>
    this.props.dispatch(getGroupsToExplore())

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  render() {
    let
      { groups } = this.props,
      { loading } = this.state,
      len = groups.length,
      map_groups = groups.map(g =>
        <ExploreGroupsList key={g.group_id} {...g} />
      )

    return (
      <div>

        <Title value='Explore groups' />

        <FadeIn duration='300ms'>

          { loading ? <Spinner/> : null }

          <div
            className={`m_div ${loading ? 'cLoading' : ''}`}
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
                  : map_groups
              }
            </div>
          </div>

        </FadeIn>

      </div>
    )
  }
}
