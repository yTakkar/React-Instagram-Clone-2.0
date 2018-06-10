import React from 'react'
import MockDataElement from '../../utils/__test__/mock-dataElement'
import { PureApp } from '../App'
import { shallow } from 'enzyme'

describe('App Component', () => {
  MockDataElement()

  // shallow snapshot
  it('should match snapshot', () => {
    const tree = shallow(
      <PureApp
        unreadNotifications={1}
        unreadMessages={0}
        dispatch={jest.fn()}
      />
    )
    expect(tree).toMatchSnapshot()
  })

})
