import React from 'react'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import BannerStats from '../stats'
import { BrowserRouter as Router } from 'react-router-dom'
import User from '../../../../../store/mockStore/mock-reducers/User';

describe('BannerStats Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <Router>
        <BannerStats/>
      </Router>
    </Provider>
  )

  it('should match snapshot with recommendation stat', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with favourites stat', () => {
    User.user_details.id = 7
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
