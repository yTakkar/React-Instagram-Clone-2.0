import React from 'react'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import Title from '../../others/title'
import Spinner from '../../others/spinner'
import Nothing from '../../others/nothing'
import { connect } from 'react-redux'
import { getPostSharers } from '../../../store/actions/post-a'
import SharerList from './sharers-list'
import { llr } from '../../../utils/utils'

@connect(store => {
  return {
    sharers: store.Post.sharers
  }
})

export default class Sharers extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, post } = this.props
    dispatch(getPostSharers(post))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  componentDidUpdate = () => llr()

  back = e => {
    e.preventDefault()
    this.props.back()
  }

  render() {
    let
      { loading } = this.state,
      { sharers, post, decrementShares } = this.props,
      len = sharers.length,
      map_sharers = sharers.map(s =>
        <SharerList
          key={s.share_id}
          {...s}
          post={post}
          decrementShares={decrementShares}
        />
      )

    return (
      <div class='modal modal_big' >

        <Title value='Post shared by' />

        <FadeIn duration='300ms' >
          <div className='modal_header'>
            <span className='title' >Post shared by</span>
          </div>

          <Scrollbars style={{ height: 450 }} className='modal_middle' >

            { loading ? <Spinner/> : null }

            <div className={`modal_main ${loading ? 'cLoading' : ''}`}>
              { len == 0 ? <Nothing showMssg={false} /> : map_sharers }
            </div>

          </Scrollbars>

          <div className='modal_bottom'>
            <a href='#' className='pri_btn' onClick={this.back} >Back</a>
          </div>
        </FadeIn>

      </div>
    )
  }
}
