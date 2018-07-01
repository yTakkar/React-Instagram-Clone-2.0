import React from 'react'
import TimeAgo from 'handy-timeago'
import { connect } from 'react-redux'

const ConSince = ({ con_time }) => (
  <div className="sli_time">
    <span className="sli_label">Conversation since</span>
    <span className="sli_bold">{`${TimeAgo(con_time)}`}</span>
  </div>
)

const mapStateToProps = state => ({
  con_time: state.Message.conAbout.con_time,
})

export default connect(mapStateToProps)(ConSince)
