import React from 'react'
import { create } from 'react-test-renderer'
import SocialIcons from '../social-icons'
import { Provider } from 'react-redux';
import mockStore from '../../../../../store/mockStore/mockStore'
import User from '../../../../../store/mockStore/mock-reducers/User'

describe('SocialIcons Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <SocialIcons/>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null', () => {
    User.user_details.instagram = ''
    User.user_details.github = ''
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
