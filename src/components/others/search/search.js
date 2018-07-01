import React, { Component } from 'react'
import { post } from 'axios'
import MapSearch from './map-search/map-search'
import FAIcon from '../icons/font-awesome-icon'
import TextInput from '../input/text'

export default class Search extends Component {
  state = {
    value: '',
    search: {
      users: [],
      groups: [],
      hashtags: [],
    },
  }

  hide = () => {
    this.setState({
      search: {
        users: [],
        groups: [],
        hashtags: [],
      },
    })
  }

  search = async ({ target: { value } }) => {
    this.setState({ value })
    if (value.trim() != '') {
      let { data } = await post('/api/search-instagram', { value })
      this.setState({ search: data })
    } else {
      this.hide()
    }
  }

  clicked = () => {
    this.setState({ value: '' })
    this.hide()
  }

  render() {
    let {
      value,
      search: { users, groups, hashtags },
    } = this.state

    return (
      <div>
        <div className="search_box">
          <TextInput
            placeholder="Search Instagram"
            autoFocus
            value={value}
            valueChange={this.search}
            className="search"
          />
          <span className="search_icon">
            <FAIcon icon="search" />
          </span>
        </div>

        {users.length > 0 || groups.length > 0 || hashtags.length > 0 ? (
          <MapSearch
            users={users}
            groups={groups}
            hashtags={hashtags}
            clicked={this.clicked}
          />
        ) : null}
      </div>
    )
  }
}
