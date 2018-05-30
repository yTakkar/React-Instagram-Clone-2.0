import React from 'react'
import { create } from 'react-test-renderer'
import MapSearch from '../map-search'
import searchData from '../../__test__/search-mockArray'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Map-Search Component', () => {

  it('should match snapshot with different search data', () => {
    const tree = create(
      <Router>
        <MapSearch
          users={searchData.users.slice(1)}
          groups={searchData.groups}
          hashtags={[]}
          clicked={() => {}}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
