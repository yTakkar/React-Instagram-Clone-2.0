import React from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Title from '../../../others/title'
import Nothing from '../../../others/nothing'
import End from '../../../others/end'
import { Me, humanReadable } from '../../../../utils/utils'
import PeopleYouKnowList from './puk-list'
import { Redirect } from 'react-router-dom'

@connect(store => (
  {
    ud: store.User.user_details,
    mutuals: store.User.mutualUsers
  }
))

export default class PeopleYouKnow extends React.Component {

  render() {
    let
      { mutuals, param: username, ud: { id } } = this.props,
      len = mutuals.length,
      map_mutuals = mutuals.map(m =>
        <PeopleYouKnowList key={m.follow_id} {...m} />
      )

    return (
      <div>

        { Me(id) ? <Redirect to={`/profile/${username}`} /> : null }

        <Title value={`@${username}'s followers you might know`} />

        <FadeIn duration='300ms'>

          <div className='senapati pro_senapati'>
            <div className={ len != 0 ? 'm_div' : 'm_no_div' } >

              {
                len != 0
                  ? <div className='m_header'>
                    <span>{humanReadable(len, 'follower')} you might know</span>
                  </div>
                  : null
              }

              <div className='m_wrapper'>
                { len != 0 ? map_mutuals : null }
              </div>

            </div>
          </div>

          {
            len == 0
              ? <Nothing mssg={ Me(id) ? 'You have no followers!!' : `${username} have no followers!!` } />
              : <End/>
          }

        </FadeIn>

      </div>
    )
  }
}
