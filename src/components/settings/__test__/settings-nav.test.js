import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import SettingsNav from '../settings-nav'

describe('SettingsNav Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      
      <SettingsNav
        url='/settings'
      />
      
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
