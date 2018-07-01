import React from 'react'
import MockDataElement from '../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import Profile, { PureProfile } from '../profile'
import { shallow } from 'enzyme'
import User from '../../../store/__mocks__/reducers/User'
import { MemoryRouter } from 'react-router-dom'

jest.unmock('react-router-dom')

describe('Profile Component', () => {
  MockDataElement()

  const props = {
    match: {
      params: { username: 'takkar' },
      url: '/profile/takkar',
    },
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Profile {...props} />
        </MemoryRouter>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureProfile {...props} ud={User.user_details} dispatch={jest.fn()} />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })
})
