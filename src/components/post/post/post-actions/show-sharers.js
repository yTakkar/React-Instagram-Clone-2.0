import React, { Component, Fragment } from 'react'
import Sharers from '../../sharers/sharers'
import { number, func } from 'prop-types'
import { connect } from 'react-redux'
import { t } from '../../../../utils/translation'

class ShowSharers extends Component {
  state = {
    showSharers: false,
  }

  toggleShares = () => this.setState({ showSharers: !this.state.showSharers })

  render() {
    let { post_id, shares_count, decrementSharers, lang } = this.props
    let { showSharers } = this.state

    return (
      <Fragment>
        <span className="p_comm" onClick={this.toggleShares}>
          {shares_count == 0 
            ? t(lang, 'post', 'noShares')
            : shares_count == 1
              ? `1 ${t(lang, 'post', 'share')}`
              : `${shares_count} ${t(lang, 'post', 'shares')}`
          }
        </span>

        {showSharers && (
          <Sharers
            post={post_id}
            back={this.toggleShares}
            decrementSharers={decrementSharers}
          />
        )}
      </Fragment>
    )
  }
}

ShowSharers.propTypes = {
  post_id: number.isRequired,
  shares_count: number.isRequired,
  decrementSharers: func.isRequired,
}

const mapStateToProps = state => ({
  lang: state.Language.language
})

export default connect(mapStateToProps)(ShowSharers)
