import React, { Component } from 'react'
import { humanReadable } from '../../../../utils/utils'
import ToolTip from 'react-tooltip'
import Tags from '../../tags/tags'
import PropTypes from 'prop-types'
import MaterialIcon from '../../../others/icons/material-icon'

export default class PostTags extends Component {
  state = {
    tags_count: 0,
    showTags: false,
  }

  componentDidMount = () => this.setState({ tags_count: this.props.tags_count })

  decrementTags = () => this.setState({ tags_count: --this.state.tags_count })

  render() {
    let { tags_count, showTags } = this.state
    let { post_id } = this.props

    return (
      <div>
        {tags_count != 0 && (
          <div>
            <span
              className="p_tag_icon"
              data-tip={`${humanReadable(tags_count, 'tag')}`}
              onClick={() => this.setState({ showTags: true })}
            >
              <MaterialIcon icon="account_circle" />
            </span>
            <ToolTip />
          </div>
        )}

        {showTags && (
          <Tags
            post={post_id}
            back={() => this.setState({ showTags: false })}
            decrementTags={this.decrementTags}
          />
        )}
      </div>
    )
  }
}

PostTags.propTypes = {
  post_id: PropTypes.number.isRequired,
  tags_count: PropTypes.number.isRequired,
}
