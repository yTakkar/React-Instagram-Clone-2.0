import React from 'react'
import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
import { getSuggestedUsers } from '../../../store/actions/explore-a'
import { Link } from 'react-router-dom'
import Spinner from '../spinner'
import SuggestedList from './suggested-list'

@connect(store => (
  { suggested: store.Explore.suggested }
))

export default class Suggested extends React.Component {

  state = {
    loading: true
  }

  componentDidMount = () =>
    this.props.dispatch(getSuggestedUsers())

  updateUsers = e => {
    e.preventDefault()
    this.props.dispatch(getSuggestedUsers())
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
              <i className='fa fa-refresh' aria-hidden='true'></i>
            </a>
            <Link to='/explore' className='recomm_all' data-tip='view all' >
              <i className='fa fa-chevron-right' aria-hidden='true'></i>
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
