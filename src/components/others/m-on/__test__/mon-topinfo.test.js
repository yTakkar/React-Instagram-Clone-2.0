import React from 'react'
import MonTopInfo from '../mon-topinfo'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Mon-TopInfo Component', () => {
  const info = {
    user: 24,
    username: 'takkar',
    firstname: 'iam',
    surname: '_takkar'
  }

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <MonTopInfo
          info={info}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with basedOnMutuals prop', () => {
    const tree = create(
      <Router>
        <MonTopInfo
          info={{
            ...info,
            mutuals: 3
          }}
          basedOnMutuals
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
