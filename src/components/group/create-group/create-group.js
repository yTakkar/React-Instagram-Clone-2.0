import React, { Component } from 'react'
import CreateGroupModal from './cg-modal'
import SecondaryButton from '../../others/button/secondary-btn'
import { connect } from 'react-redux'
import { t } from '../../../utils/translation'

class CreateGroup extends Component {
  state = {
    createGroup: false,
  }

  toggleCreateGroup = e => {
    e.preventDefault()
    this.setState({ createGroup: !this.state.createGroup })
  }

  render() {
    let { createGroup } = this.state
    let { lang } = this.props

    return (
      <div>
        <div className="recomm_teaser">
          <span>
            {t(lang, 'home', 'createGroupText')}
          </span>

          <SecondaryButton
            label={t(lang, 'home', 'createGroupBtn')}
            onClick={this.toggleCreateGroup}
          />
        </div>

        {createGroup && <CreateGroupModal back={this.toggleCreateGroup} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lang: state.Language.language
})

export default connect(mapStateToProps)(CreateGroup)
