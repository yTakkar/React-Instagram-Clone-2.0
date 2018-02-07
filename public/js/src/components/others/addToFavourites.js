import React from 'react'
import { addToFavourites } from '../../utils/utils'
import $ from 'jquery'

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
