import React from 'react'
import { create } from 'react-test-renderer'
import SettingsNav from '../settings-nav'

describe('SettingsNav Component', () => {
  it('should match snapshot', () => {
    const tree = create(<SettingsNav url="/settings" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
