import React from 'react'
import ModalMiddle from '../modal-middle'
import { create } from 'react-test-renderer'

describe('Modal-Middle Component', () => {
  const list = ['first', 'second']

  const map = list => list.map(l => <span key={l}>{l}</span>)

  it('should match snapshot and display nothing component', () => {
    const tree = create(<ModalMiddle list={map([])} loading />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with the list', () => {
    const tree = create(
      <ModalMiddle list={map(list)} loading={false} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
