import React from 'react'
import Title from '../../others/title'
import { FadeIn } from 'animate-components'
import Nothing from '../../others/nothing'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux'
import { getPostTags } from '../../../store/actions/post-a'
import Spinner from '../../others/spinner'
import { llr } from '../../../utils/utils'
import TagItems from './tag-list'

@connect(store => (
  { Tags: store.Post }
))

export default class Tags extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    let { dispatch, post } = this.props
    dispatch(getPostTags(post))
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
      { Tags: { tags }, decrementTags } = this.props,
      len = tags.length,
      map_tags = tags.map(t =>
        <TagItems key={t.post_tag_id} {...t} decrementTags={decrementTags} />
      )

    return (
      <div class='tags_model modal modal_big' >

        <Title value='Tags' />

        <FadeIn duration='300ms' >
          <div className='modal_header'>
            <span className='title' >Tagged in this post</span>
          </div>

          <Scrollbars style={{ height: 450 }} className='modal_middle' >

            { loading ? <Spinner/> : null }

            <div className={`modal_main ${loading ? 'cLoading' : ''}`}>
              { len == 0 ? <Nothing showMssg={false} /> : map_tags }
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
