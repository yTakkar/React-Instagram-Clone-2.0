import React from 'react'
import { create } from 'react-test-renderer'
import ModalItemInfo from '../modal-item-info'

describe('ModalItemInfo Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <ModalItemInfo
        info={{
          username: 'takkar',
          firstname: 'faiyaz',
          surname: 'shaikh',
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
