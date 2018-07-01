import React from 'react'
import { humanReadable } from '../../../../utils/utils'
import { connect } from 'react-redux'

const MessagesCount = ({ mssgsCount }) => (
  <div className="sli_mssg_count">
    <span className="sli_label">No. of messages</span>
    <span className="sli_bold">{humanReadable(mssgsCount, 'message')}</span>
  </div>
)

const mapStateToProps = state => ({
  mssgsCount: state.Message.conAbout.mssgsCount,
})

export default connect(mapStateToProps)(MessagesCount)
