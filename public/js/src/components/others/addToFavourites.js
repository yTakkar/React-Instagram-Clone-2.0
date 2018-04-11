import React from 'react'
import { addToFavourites } from '../../utils/user-interact-utils'
import $ from 'jquery'
import PropTypes from 'prop-types'

export default class AddToFavourites extends React.Component {

  add = e => {
    e.preventDefault()
    addToFavourites(this.props.user)
    $('.af_btn').blur()
  }

  render() {
    let { username } = this.props

    return (
      <div>

        <div className='recomm_teaser'>
          <span>Wanna add {username} to your favourites list.</span>
          <a href='#' className='sec_btn af_btn' onClick={this.add} >Add</a>
        </div>

      </div>
    )
  }
}

AddToFavourites.propTypes = {
  user: PropTypes.number,
  username: PropTypes.string
}
