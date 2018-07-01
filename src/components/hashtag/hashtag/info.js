import React from 'react'
import { humanReadable } from '../../../utils/utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const HashtagInfo = ({ hashtag, len }) => (
  <div className="hashtag_info">
    <span>#{hashtag}</span>
    <span className="no_of_tag_peop">{humanReadable(len, 'post')}</span>
  </div>
)

HashtagInfo.propTypes = {
  hashtag: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  len: state.Hashtag.hashtagPosts.length,
})

export default connect(mapStateToProps)(HashtagInfo)
