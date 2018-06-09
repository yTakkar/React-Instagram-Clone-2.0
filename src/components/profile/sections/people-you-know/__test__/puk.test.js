import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import PeopleYouKnow, { PurePeopleYouKnow } from '../puk'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import { shallow } from 'enzyme'
import User from '../../../../../store/mockStore/mock-reducers/User'

describe('PeopleYouKnow Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <PeopleYouKnow param='takkar' />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should redirect to /profile if it is my profile page', () => {
    const wrapper = shallow(
      <PurePeopleYouKnow
        param='takkar'
        ud={User.user_details}
        mutuals={User.mutualUsers}
      />
    )
    expect(wrapper.find('Redirect').exists()).toBe(true)
  })

  it('should redirect to /profile if it is my profile page', () => {

    const wrapper = shallow(
      <PurePeopleYouKnow
        param='takkar'
        ud={{
          ...User.user_details,
          id: 7
        }}
        mutuals={User.mutualUsers}
      />
    )
    expect(wrapper.find('Redirect').exists()).toBe(false)
  })

})
