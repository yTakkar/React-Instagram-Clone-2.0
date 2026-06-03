import React from 'react'
import { create } from 'react-test-renderer'
import SocialInputs from '../social-inputs'

describe('Social-Inputs Component', () => {
  const props = {
    inputs: {
      instagram: 'https://www.instagram.com/_Vsocial_shaikh',
      github: 'https://github.com/Vsocial/',
      twitter: 'https://twitter.com/shvsocial',
      facebook: 'https://www.facebook.com/profile.php?id=100009110960262',
      website: '',
      phone: '',
    },
    change: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(<SocialInputs {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
