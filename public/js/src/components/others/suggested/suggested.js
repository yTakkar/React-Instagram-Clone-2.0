import React from 'react'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import { getSuggestedUsers } from '../../../store/actions/explore-a'
import { Link } from 'react-router-dom'
import Spinner from '../spinner'
import SuggestedList from './suggested-list'
import PropTypes from 'prop-types'

@connect(store => (
  { suggested: store.Explore.suggested }
))

export default class Suggested extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () => {
    // params: if user is on a profile of eg. noddy, then noddy won't appear on suggestions
    let { dispatch, params } = this.props
    dispatch(getSuggestedUsers(params))
  }

  updateUsers = e => {
    e.preventDefault()
    let { dispatch, params } = this.props
    dispatch(getSuggestedUsers(params))
  }

  componentWillReceiveProps = () =>
    this.setState({ loading: false })

  render() {
    let
      { loading } = this.state,
      { suggested, when } = this.props,
      len = suggested.length,
      map_suggested = suggested.map(s =>
        <SuggestedList key={s.id} {...s} when={when} />
      )

    return (
      <div>

        <div className='recomm'>
          <div className='recomm_top'>
            <span>Suggested</span>
            <a href='#' className='recomm_refresh' data-tip='refresh' onClick={this.updateUsers} >
              <i className='fas fa-sync-alt'></i>
            </a>
            <Link to='/explore' className='recomm_all' data-tip='view all' >
              <i className='fas fa-chevron-right'></i>
            </Link>
          </div>

          <div className='recomm_main' style={{ height: loading ? 100 : 'inherit' }} >

            { loading ? <Spinner/> : null }

            <div className={`${loading ? 'cLoading' : ''}`} >
              { len != 0 ? map_suggested : null }
            </div>
          </div>

        </div>

        <ToolTip/>

      </div>
    )
  }
}

Suggested.propTypes = {
  params: PropTypes.string
}
