import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import Title from '../../../others/title'
import { Me, bottomScroll } from '../../../../utils/utils'
import Favourite from './favourite/favourite'
import PropTypes from 'prop-types'
import MonHeader from '../../../others/m-on/mon-header'
import MonEnd from '../../../others/m-on/mon-end'
import classNames from 'classnames'

class Favourites extends Component {
  componentDidUpdate = () => bottomScroll()

  render() {
    let {
        favourites,
        param: username,
        ud: { id },
      } = this.props,
      len = favourites.length,
      map_favs = favourites.map(f => <Favourite key={f.fav_id} {...f} />)

    return (
      <div>
        <Title value={`@${username}'s favourites`} />

        <FadeIn duration="300ms">
          <div className="senapati pro_senapati">
            <div
              className={classNames({
                m_div: len != 0,
                m_no_div: len == 0,
              })}
            >
              <MonHeader len={len} forWhat={'favourite'} />

              <div className="m_wrapper">{len != 0 && map_favs}</div>
            </div>
          </div>

          <MonEnd
            len={len}
            nothingMssg={
              Me(id)
                ? 'You have no favourites!!'
                : `${username} have no favourites!!`
            }
          />
        </FadeIn>
      </div>
    )
  }
}

Favourites.propTypes = {
  param: PropTypes.string.isRequired,
}

const mapStateToProps = store => ({
  ud: store.User.user_details,
  favourites: store.Follow.favourites,
})

export default connect(mapStateToProps)(Favourites)
export { Favourites as PureFavourites }
