import React from 'react'
import ModalHeader from '../modal-header'
import { create } from 'react-test-renderer'

describe('ModalHeader Component', () => {
  it('should match snapshot', () => {
    const tree = create(<ModalHeader title="Post likes" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
