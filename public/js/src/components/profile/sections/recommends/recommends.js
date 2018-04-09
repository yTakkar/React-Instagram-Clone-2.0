import React from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Title from '../../../others/title'
import Nothing from '../../../others/nothing'
import End from '../../../others/end'
import { Me, humanReadable } from '../../../../utils/utils'
import RecommendList from './recommend-list'

@connect(store => (
  {
    ud: store.User.user_details,
    recommends: store.Follow.recommendations
  }
))

export default class Recommendations extends React.Component {

  render() {
    let
      { recommends, param: username, ud: { id } } = this.props,
      len = recommends.length,
      map_recommends = recommends.map(r =>
        <RecommendList key={r.recommend_id} {...r} />
      )

    return (
      <div>

        <Title value={`@${username}'s recommendations`} />

        <FadeIn duration='300ms'>

          <div className='senapati pro_senapati'>
            <div className={ len != 0 ? 'm_div' : 'm_no_div' } >

              {
                len != 0
                  ? <div className='m_header'><span>{ humanReadable(len, 'recommendation') }</span></div>
                  : null
              }

              <div className='m_wrapper'>
                { len != 0 ? map_recommends : null }
              </div>

            </div>
          </div>

          {
            len == 0
              ? <Nothing
                mssg={ Me(id) ? 'You have no recommendations!!' : `${username} have no recommendations!!` }
              />
              : <End/>
          }

        </FadeIn>

      </div>
    )
  }
}
