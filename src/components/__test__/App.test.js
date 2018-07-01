import React from 'react'
import MockDataElement from '../../utils/__mocks__/mock-dataElement'
import { PureApp } from '../App'
import { shallow } from 'enzyme'

jest.unmock('react-router-dom')

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
