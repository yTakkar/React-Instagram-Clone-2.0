import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { connect } from 'react-redux'
import { togglePosted } from '../../store/actions/post-a'
import { FadeIn } from 'animate-components'

@connect(store => {
  return {
    store
  }
})

export default class MessageNotify extends React.Component {

  componentDidMount = () => {
    setTimeout(() => {
      $('.home_notify').slideUp(300, () =>
        this.props.dispatch(togglePosted(false))
      )
    }, 3000)
  }

  render() {
    let { url, message, btnText } = this.props

    return (
      <div className='home_notify inst'>
        <FadeIn duration='300ms'>
          <div className='home_notify_img'>
            <img src='/images/large.jpg' />
          </div>
          <div className='home_notify_info'>
            <span>{message}</span>
            <Link to={url} className='pri_btn'>{btnText}</Link>
          </div>
        </FadeIn>
      </div>
    )
  }
}

MessageNotify.defaultProps = {
  message: 'A message to be displayed!!'
}
