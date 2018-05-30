import React from 'react'
import { create } from 'react-test-renderer'
import ModalItemInfo from '../modal-item-info'
import { BrowserRouter as Router } from 'react-router-dom'

describe('ModalItemInfo Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <ModalItemInfo
          info={{
            username: 'takkar',
            firstname: 'faiyaz',
            surname: 'shaikh'
          }}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
