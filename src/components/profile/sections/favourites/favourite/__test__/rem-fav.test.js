import React from 'react'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import RemoveFav, { PureRemoveFav } from '../rem-fav'
import User from '../../../../../../store/__mocks__/reducers/User'
import { shallow } from 'enzyme'

describe('RemoveFav Component', () => {
  MockDataElement()
  const props = {
    fav_id: 45,
    username: 'ghalib',
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <RemoveFav {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock remove action', () => {
    const wrapper = shallow(<PureRemoveFav {...props} id={24} />)
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {},
    })
  })

  it('should match snapshot and hide remove option', () => {
    User.user_details.id = 18
    const tree = create(
      <Provider store={mockStore}>
        <RemoveFav {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
