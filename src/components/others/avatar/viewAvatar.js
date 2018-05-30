import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import PropTypes from 'prop-types'
import RangeInput from '../input/range'

export default class ViewAvatar extends Component {

  state = {
    range: 200
  }

  rangeChange = e =>
    this.setState({ range: e.target.value })

  render() {
    let { range } = this.state
    let { imgSrc } = this.props

    return (
      <div className='view_avatar'>
        <FadeIn duration='300ms'>
          <div className='v_a_img'>
            <img
              src={imgSrc} alt=''
              style={{ width: `${range}px` }}
            />
          </div>

          <div className='v_a_inc'>
            <RangeInput
              min={200}
              max={500}
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

ViewAvatar.propTypes = {
  imgSrc: PropTypes.string.isRequired,
}
