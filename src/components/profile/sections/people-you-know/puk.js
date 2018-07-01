import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Title from '../../../others/title'
import { Me } from '../../../../utils/utils'
import PeopleYouKnowList from './puk-list'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import MonHeader from '../../../others/m-on/mon-header'
import MonEnd from '../../../others/m-on/mon-end'
import classNames from 'classnames'

class PeopleYouKnow extends Component {
  render() {
    let {
        mutuals,
        param: username,
        ud: { id },
      } = this.props,
      len = mutuals.length,
      map_mutuals = mutuals.map(m => (
        <PeopleYouKnowList key={m.follow_id} {...m} />
      ))

    return (
      <div>
        {Me(id) ? <Redirect to={`/profile/${username}`} /> : null}

        <Title value={`@${username}'s followers you might know`} />

        <FadeIn duration="300ms">
          <div className="senapati pro_senapati">
            <div
              className={classNames({
                m_div: len != 0,
                m_no_div: len == 0,
              })}
            >
              <MonHeader len={len} forWhat={'puk'} />

              <div className="m_wrapper">{len != 0 && map_mutuals}</div>
            </div>
          </div>

          <MonEnd
            len={len}
            nothingMssg={
              Me(id)
                ? 'You have no followers!!'
                : `${username} have no followers!!`
            }
          />
        </FadeIn>
      </div>
    )
  }
}

PeopleYouKnow.propTypes = {
  param: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  mutuals: store.User.mutualUsers,
})

export default connect(mapStateToProps)(PeopleYouKnow)
export { PeopleYouKnow as PurePeopleYouKnow }
