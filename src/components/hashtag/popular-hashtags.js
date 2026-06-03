import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPopularHashtags } from '../../actions/hashtag'
import MapHashtags from './hashtag-utils/map-hashtags'
import HashtagHeader from './hashtag-utils/hashtag-header'
import { t } from '../../utils/translation'

@connect(store => ({
  hashtags: store.Hashtag.popularHashtags,
  lang: store.Language.language
}))
export default class PopularHashtags extends Component {
  componentDidMount = async () => {
    let { dispatch } = this.props
    dispatch(getPopularHashtags())
  }

  render() {
    let { hashtags, lang } = this.props
    let len = hashtags.length

    return (
      <div>
        {len != 0 && (
          <div className="recomm user-hashtags">
            <HashtagHeader text={t(lang, 'home', 'popularTrends')} />
            <MapHashtags hashtags={hashtags} />
          </div>
        )}
      </div>
    )
  }
}
