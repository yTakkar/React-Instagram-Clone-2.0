import React, { Component } from 'react'
import Title from '../../../others/title'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import TimeAgo from 'handy-timeago'
import GrpAboutSection from './section'
import GroupInstruction from '../../instruction'
import d from '../../../../utils/API/DOM'
import EditPen from '../../../others/edit-pen'
import { bottomScroll } from '../../../../utils/utils'

class AboutGroup extends Component {
  togglePen = () => new d('.a_edit').toggle()

  componentDidMount = () => bottomScroll()

  render() {
    let { gd } = this.props

    return (
      <div>
        <Title value="About" />

        <FadeIn duration="300ms">
          <div className="senapati pro_senapati">
            <div className="about">
              <div className="sabout">
                <GroupInstruction />
              </div>

              <div
                className="fabout"
                onMouseOver={this.togglePen}
                onMouseOut={this.togglePen}
              >
                <EditPen to={`/group/${gd.group_id}/edit`} when="group" />

                <GrpAboutSection label="Group name" value={`${gd.name}`} />
                <GrpAboutSection label="Bio" value={`${gd.bio}`} />
                <GrpAboutSection
                  label="No of posts"
                  value={`${gd.postsCount}`}
                />
                <GrpAboutSection
                  label="Group type"
                  value={`${gd.group_type}`}
                />

                <GrpAboutSection
                  label="Group created by"
                  value={`${gd.admin_username}`}
                  type="link"
                  url={`/profile/${gd.admin_username}`}
                />

                <GrpAboutSection
                  label="Group created"
                  value={`${TimeAgo(gd.created)}`}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  gd: store.Group.group_details,
})

export default connect(mapStateToProps)(AboutGroup)
export { AboutGroup as PureAboutGroup }
