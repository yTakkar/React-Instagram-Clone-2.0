import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Overlay from '../../others/overlay'
import ToolTip from 'react-tooltip'
import Filters from './filters/filters'
import GetLocation from './getLocation'
import PostItHeader from './header'
import AddTags from './add-tags'
import Middle from './middle'
import ToggleAddTags from './toggleAddTags'
import PostItActions from './actions'
import { func, oneOf, number } from 'prop-types'
import AddEmojis from '../../others/emojis/add-emojis'
import { CPP } from '../../../actions/post'
import { connect } from 'react-redux'

@connect(store => ({
  postIt: store.Post.postIt,
}))
export default class PostIt extends Component {
  componentDidMount = () => {
    let { type, group, dispatch } = this.props
    dispatch(CPP('type', type))
    dispatch(CPP('group', group))
  }

  render() {
    let {
      postIt: { fileChanged, showOverlay },
      dispatch,
      back,
    } = this.props

    return (
      <div>
        <Overlay />

        <div className="post" style={{ left: fileChanged ? '41%' : '50%' }}>
          <FadeIn duration="300ms">
            {fileChanged && <Filters />}

            <PostItHeader />
            <Middle />
            <AddTags />

            <div className="t_p_bottom p_bottom">
              <div
                className="t_p_tag p_tag"
                style={{ visibility: !fileChanged && 'hidden' }}
              >
                <AddEmojis
                  position={{ top: 104, left: -215 }}
                  textArea=".t_p_ta"
                  updateTextArea={value => dispatch(CPP('desc', value))}
                  addClassOnClicked
                  className="p_span_toggle"
                />

                <ToggleAddTags />
                <GetLocation />
              </div>

              <PostItActions back={back} />
            </div>
          </FadeIn>
        </div>

        {showOverlay && <Overlay type="white" />}

        <ToolTip />
      </div>
    )
  }
}

PostIt.propTypes = {
  back: func.isRequired,
  type: oneOf(['user', 'group']).isRequired,
  group: number,
}
