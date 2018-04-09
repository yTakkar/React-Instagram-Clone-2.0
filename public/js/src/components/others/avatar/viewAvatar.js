import React from 'react'
import { FadeIn } from 'animate-components'

export default class ViewAvatar extends React.Component {

  state = {
    range: 200
  }

  rangeChange = e =>
    this.setState({ range: e.target.value })

  render() {
    let
      { range } = this.state,
      { imgSrc } = this.props

    return (
      <div class='view_avatar'>
        <FadeIn duration='300ms'>
          <div class='v_a_img'>
            <img
              src={imgSrc} alt=''
              style={{ width: `${range}px` }}
            />
          </div>

          <div class='v_a_inc'>
            <input
              type='range'
              value='200'
              min='200'
              max='500'
              value={range}
              onChange={this.rangeChange}
            />
          </div>
        </FadeIn>
      </div>
    )
  }
}

ViewAvatar.defaultProps = {
  imgSrc: '/images/spacecraft.jpg'
}
